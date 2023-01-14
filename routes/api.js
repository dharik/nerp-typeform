var express = require('express');
const { createSurvey, getSurvey, listResponses, createResponse } = require('../surveys');
var router = express.Router();

router.get('/surveys/:publicId', async function (req, res, next) {
  let result = await getSurvey(req.params.publicId);
  console.log(result);
  if(result.status == 'success') {
    res.send('got the survey')
  } else {
    res.send('could not get teh survey ')
  }
})

router.post('/surveys', async function (req, res, next) {
  let result = await createSurvey({ createdFromApi: true });
  console.log(result);
  if (result.status == "success") {
    res.send('create the survey');
  } else {
    res.send('fail')
  }
});



router.get('/survey_responses/:privateId', async function (req, res, next) {
  let result = await listResponses(req.params.privateId)
  console.log(result);
  if(result.status == 'success') {
    res.send('got the responses')
  } else {
    res.send('could not get teh survey ')
  }
})

router.post('/survey_responses/:publicId', async function (req, res, next) {
  const result = await createResponse(req.params.publicId, req.body);
  console.log(result);
  res.send('created survey response')
})


module.exports = router;
