const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionnaireValidation = require('../../validations/questionnaire.validation');
const questionnaireController = require('../../controllers/questionnaire.controller');

const router = express.Router();

router
  .route('/')
  .get(
    auth('getQuestionnaires'),
    validate(questionnaireValidation.getQuestionnaires),
    questionnaireController.getQuestionnaires
  )
  .post(
    auth('createQuestionnaire'),
    validate(questionnaireValidation.createQuestionnaire),
    questionnaireController.createQuestionnaire
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Questionnaires
 *   description: Questionnaires replies module
 */

/**
 * @swagger
 * /questionnaires:
 *   post:
 *     summary: Create a questionnaire
 *     tags: [Questionnaires]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *               - type
 *             properties:
 *               answers:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               answers: '{"key":"TestTestTest"}'
 *               type: basic
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Questionnaire'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all questionnaires
 *     tags: [Questionnaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *         description: Patient id
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of questionnaires
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Questionnaire'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
