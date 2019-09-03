const roles = {
  user: 'user',
  admin: 'admin'
};

const sysRoles = {
  sysadmin: 'sysadmin'
};

function getRoles() {
  const ret = [];
  for (const role in roles) ret.push(role);
  return ret;
}

module.exports = {
  roles,
  sysRoles,
  getRoles
};
