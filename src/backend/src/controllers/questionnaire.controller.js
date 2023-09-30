const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { questionnaireService } = require('../services');
const { permissionCheck } = require('../utils/permission');

const getQuestionnaires = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['patientId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  if (!permissionCheck(req, 'getAllQuestionnaires')) {
    filter.patientId = req.user.id;
  }

  const result = await questionnaireService.queryQuestionnaires(filter, options);
  res.send(result);
});

const createQuestionnaire = catchAsync(async (req, res) => {
  req.body.patientId = req.user.id;
  const questionnaire = await questionnaireService.createQuestionnaire(req.body);
  res.status(httpStatus.CREATED).send(questionnaire);
});

module.exports = {
  getQuestionnaires,
  createQuestionnaire,
};
