const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionnaireSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    submittedDate: {
      type: mongoose.SchemaTypes.Date,
      required: true,
      default: Date.now,
    },
    score: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      default: 0,
    },
    answers: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    wasDisplayedByDoctor: {
      type: mongoose.SchemaTypes.Boolean,
      required: true,
      default: false,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionnaireSchema.plugin(toJSON);
questionnaireSchema.plugin(paginate);

/**
 * @typedef Questionnaire
 */
const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
