const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { questionnaireService, userService } = require('../services');
const { permissionCheck } = require('../utils/permission');
const { sendQuestionnaireCreatedEmail } = require('../services/email.service');

const getQuestionnaires = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['patientId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  if (!permissionCheck(req, 'getAllQuestionnaires')) {
    filter.patientId = req.user.id;
  }

  const result = await questionnaireService.queryQuestionnaires(filter, options);
  result.results = await Promise.all(
    result.results.map(async (record) => {
      const user = await userService.getUserById(record.patientId);
      const userData = record.toJSON();
      // eslint-disable-next-line no-param-reassign
      userData.patientName = user.name;
      userData.doctorId = user.doctorId;

      const doctor = userData.doctorId ? await userService.getUserById(userData.doctorId) : null;
      userData.doctorName = doctor ? doctor.name : null;

      return userData;
    })
  );
  res.send(result);
});

const createQuestionnaire = catchAsync(async (req, res) => {
  req.body.patientId = req.user.id;
  const questionnaire = await questionnaireService.createQuestionnaire(req.body);
  res.status(httpStatus.CREATED).send(questionnaire);

  const doctor = req.user.doctorId ? await userService.getUserById(req.user.doctorId) : null;
  if (doctor) {
    await sendQuestionnaireCreatedEmail(doctor.email, req.user);
  }
});

module.exports = {
  getQuestionnaires,
  createQuestionnaire,
};
