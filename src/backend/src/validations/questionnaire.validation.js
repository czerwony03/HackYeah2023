const Joi = require('joi');

const getQuestionnaires = {
  query: Joi.object().keys({
    userId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createQuestionnaire = {
  body: Joi.object().keys({
    answers: Joi.string().required(),
    type: Joi.string().required(),
  }),
};

module.exports = {
  createQuestionnaire,
  getQuestionnaires,
};
