const db = require("./db");

// TODO: Ensure format of questionData
// TODO: Ensure unique ids in each questionData item
// {status: "success", publicId, privateId, id}
// {status: "failure"}
async function createSurvey(questionData) {
  try {
    const result = await db.one('INSERT INTO surveys(questions) values($1) returning id, private_id, public_id', [questionData])
    return {
      status: "success",
      id: result.id,
      privateId: result.private_id,
      publicId: result.public_id
    }
  } catch(e) {
    return { status: "failure" }
  }
}

// {"status": "no_matching_survey"} - Couldn't find which survey this response is for
// {"status": "success", responses: []}
// {"status": "failure"}
async function listResponses(privateId) {
  const survey = await db.oneOrNone('SELECT id FROM surveys WHERE private_id = $1', [privateId])
  if(!survey) {
    return {
      status: 'no_matching_survey'
    }
  }

  try {
    const result = await db.manyOrNone('SELECT id, inserted_at, response_data FROM survey_responses WHERE survey_id = $1', [survey.id])
    return { status: "success", responses: result }
  } catch(e) {
    return { status: "failure" }
  }

  return result;
}

async function getSurvey(publicId) {
  const survey = await db.oneOrNone('SELECT id, questions FROM surveys WHERE public_id = $1', [publicId])
  if(!survey) {
    return {
      status: 'no_matching_survey'
    }
  }
  return {
    status: 'success',
    id: survey.id,
    questions: survey.questions
  }
}


// {"status": "no_matching_survey"} - Couldn't find which survey this response is for
// {"status": "success"}
// {"status": "failure"}
async function createResponse(publicId, responseData) {
  const survey = await db.oneOrNone('SELECT id, questions FROM surveys WHERE public_id = $1', [publicId])
  if(!survey) {
    return {
      status: 'no_matching_survey'
    }
  }

  // TODO: Make sure responseData matches survey.questionData format
  // Look for respondantName
  // return {"status": "invalid_format"} - The response data doesn't fit the survey

  try {
    const result = await db.one('INSERT INTO survey_responses(survey_id, response_data) values($1, $2) returning id', [survey.id, responseData])
    return { status: "success", responseId: result.id }
  } catch(e) {
    console.error(e);
    return { status: "failure" }
  }
}

module.exports = {
  createSurvey,
  getSurvey,
  listResponses,
  createResponse
};
