const roles = {
  user: 'user',
  admin: 'admin'
};

const sysRoles = {
  sysadmin: 'sysadmin'
};

function getRoles() {
  const ret = [];
  Object.keys(roles).forEach(role => ret.push(roles[role]));
  return ret;
}

module.exports = {
  roles,
  sysRoles,
  getRoles
};
