var express = require("express");
const { token } = require("morgan");
const {
  createSurvey,
  getSurvey,
  listResponses,
  createResponse,
  createToken,
  listTokens,
} = require("../surveys");
var router = express.Router();

router.get("/surveys/:token", async function (req, res, next) {
  let result = await getSurvey(req.params.token);
  if (result.status == "success") {
    res.send({
      questions: result.questions,
      canManage: result.isOwner,
    });
  } else {
    res.status(404).send({});
  }
});

router.post("/surveys", async function (req, res, next) {
  let result = await createSurvey(req.body);
  if (result.status == "success") {
    res.send({
      ownerToken: result.ownerToken,
      publicToken: result.publicToken,
    });
  } else {
    res.send({});
  }
});

router.post("/survey_tokens", async function (req, res) {
  const result = await createToken(req.query.token, req.body.name);

  if (result.status == "success") {
    res.send({
      token: result.token,
      name: token.name,
    });
  } else {
    res.send({});
  }
});

router.get("/survey_tokens", async function (req, res) {
  const result = await listTokens(req.query.token);
  if (result.status == "success") {
    res.send(result.tokens);
  } else {
    res.send([]);
  }
});

router.get("/survey_responses", async function (req, res, next) {
  let result = await listResponses(req.query.token);
  if (result.status == "success") {
    res.send(result.responses);
  } else {
    res.send([]);
  }
});

router.post("/survey_responses", async function (req, res, next) {
  const result = await createResponse(req.body.token, req.body.response);
  if (result.status == "success") {
    res.send({});
  } else {
    res.send({});
  }
});

module.exports = router;
