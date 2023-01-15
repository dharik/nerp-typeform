const db = require("./db");

// TODO: Ensure format of questionData
// TODO: Ensure unique ids in each questionData item
// {status: "success", id, ownerToken, publicToken }
// {status: "failure"}
async function createSurvey(questionData) {
  try {
    const survey = await db.one(
      "INSERT INTO surveys(questions) values($1:json) returning id",
      [questionData]
    );
    const ownerToken = await db.one(
      "INSERT INTO survey_tokens(survey_id, name, is_owner) values ($1, $2, true) returning token",
      [survey.id, "Owner"]
    );
    const publicToken = await db.one(
      "INSERT INTO survey_tokens(survey_id, name) values ($1, $2) returning token",
      [survey.id, "Public Link"]
    );
    return {
      status: "success",
      id: survey.id,
      ownerToken: ownerToken.token,
      publicToken: publicToken.token,
    };
  } catch (e) {
    console.error(e);
    return { status: "failure", e };
  }
}

async function createToken(ownerToken, name) {
  try {
    const survey = await db.one(
      "SELECT survey_id as id from survey_tokens WHERE token = $1 and is_owner = true",
      [ownerToken]
    );
    const token = await db.one(
      "INSERT INTO survey_tokens(survey_id, name) values ($1, $2) returning token, name",
      [survey.id, name]
    );
    return {
      status: "success",
      id: token.id,
      token: token.token,
      name: token.name,
    };
  } catch (e) {
    return { status: "failure" };
  }
}

// {"status": "no_matching_survey"} - Couldn't find which survey this response is for
// {"status": "success", responses: []}
// {"status": "failure"}
async function listResponses(ownerToken) {
  const survey = await db.oneOrNone(
    "SELECT survey_id as id, is_owner from survey_tokens where token = $1",
    [ownerToken]
  );
  if (!survey) {
    return {
      status: "no_matching_survey",
    };
  }

  if (!survey.is_owner) {
    return {
      status: "no_permission",
    };
  }

  try {
    const result = await db.manyOrNone(
      `
      SELECT 
        survey_responses.id, survey_responses.inserted_at, survey_responses.response_data, survey_tokens.name
      FROM survey_responses
      INNER JOIN 
        survey_tokens ON (survey_tokens.id = survey_responses.source_token) 
      WHERE survey_responses.survey_id = $<surveyId>
      `,
      { surveyId: survey.id }
    );
    return {
      status: "success",
      responses: result.map((r) => {
        return {
          id: r.id,
          createdAt: r.inserted_at,
          data: r.response_data,
          source: r.name,
        };
      }),
    };
  } catch (e) {
    return { status: "failure", result: e };
  }
}

async function listTokens(ownerToken) {
  const survey = await db.oneOrNone(
    "SELECT survey_id as id, is_owner from survey_tokens where token = $1",
    [ownerToken]
  );
  if (!survey) {
    return {
      status: "no_matching_survey",
    };
  }

  if (!survey.is_owner) {
    return {
      status: "no_permission",
    };
  }

  try {
    const result = await db.manyOrNone(
      "SELECT id, token, name, is_owner, inserted_at, " +
        " (SELECT count(1) from survey_responses WHERE source_token = survey_tokens.id) as response_count" +
        " FROM survey_tokens where survey_id = $2",
      [ownerToken, survey.id]
    );
    return { status: "success", tokens: result };
  } catch (e) {
    return { status: "failure" };
  }
}

async function getSurvey(inputToken) {
  const token = await db.oneOrNone(
    "SELECT id, is_owner, survey_id from survey_tokens where token = $1",
    [inputToken]
  );
  if (!token) {
    return {
      status: "invalid_token",
    };
  }

  const survey = await db.oneOrNone(
    "SELECT id, questions FROM surveys WHERE id = $1",
    [token.survey_id]
  );
  if (!survey) {
    return {
      status: "no_matching_survey",
    };
  }

  return {
    status: "success",
    id: survey.id,
    questions: survey.questions,
    isOwner: token.is_owner,
  };
}

// {"status": "invalid_token"} - Couldn't find token
// {"status": "no_matching_survey"} - Couldn't find which survey this response is for
// {"status": "success"}
// {"status": "failure"}
async function createResponse(inputToken, responseData) {
  const token = await db.oneOrNone(
    "SELECT id, survey_id from survey_tokens where token = $1",
    [inputToken]
  );
  if (!token) {
    return {
      status: "invalid_token",
    };
  }

  const survey = await db.oneOrNone(
    "SELECT id, questions FROM surveys WHERE id = $1",
    [token.survey_id]
  );
  if (!survey) {
    return {
      status: "no_matching_survey",
    };
  }

  // TODO: Make sure responseData matches survey.questionData format
  // return {"status": "invalid_format"} - The response data doesn't fit the survey

  try {
    const result = await db.one(
      "INSERT INTO survey_responses(survey_id, response_data, source_token) values($1, $2:json, $3) returning id",
      [survey.id, responseData, token.id]
    );
    return { status: "success", responseId: result.id };
  } catch (e) {
    console.error(e);
    return { status: "failure" };
  }
}

module.exports = {
  createSurvey,
  createToken,
  listTokens,
  getSurvey,
  listResponses,
  createResponse,
};
