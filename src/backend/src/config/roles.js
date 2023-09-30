const allRoles = {
  user: ['createQuestionnaire', 'getQuestionnaires'],
  admin: ['getUsers', 'manageUsers', 'getQuestionnaires', 'getAllQuestionnaires', 'createQuestionnaire'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
