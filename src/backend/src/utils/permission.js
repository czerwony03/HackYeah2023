const { roleRights } = require('../config/roles');

const permissionCheck = (req, permission) => {
  const userRights = roleRights.get(req.user.role);

  return userRights.includes(permission);
};

module.exports = {
  permissionCheck,
};
