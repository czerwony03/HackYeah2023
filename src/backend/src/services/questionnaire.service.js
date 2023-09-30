const { Questionnaire } = require('../models');

const queryQuestionnaires = async (filter, options) => {
  return Questionnaire.paginate(filter, options);
};

const createQuestionnaire = async (body) => {
  return Questionnaire.create(body);
};

module.exports = {
  createQuestionnaire,
  queryQuestionnaires,
};
