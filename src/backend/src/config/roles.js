/* eslint-disable prettier/prettier */
const allRoles = {
  user: [
    'createQuestionnaire',
    'getQuestionnaires',
  ],
  receptionist: [
    'createQuestionnaire',
    'getQuestionnaires',
    'getAllQuestionnaires',
    'getUsers',
    'manageUsers',
  ],
  doctor: [
    'createQuestionnaire',
    'getQuestionnaires',
    'getAllQuestionnaires',
    'getUsers',
    'manageUsers',
  ],
  admin: [
    'getQuestionnaires',
    'getAllQuestionnaires',
    'createQuestionnaire',
    'getUsers',
    'manageUsers',
    'manageSpecialRoles',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
