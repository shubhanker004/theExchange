const AccessControl = require('accesscontrol');

const allRights = {
  'create:any': ['*'],
  'read:any': ['*'],
  'update:any': ['*'],
  'delete:any': ['*'],
}

let grantsObject = {
  admin: {
    profile: allRights,
    brand: allRights,
    product: allRights,
    site: allRights,
    customer: allRights
  },
  user: {
    profile: {
      'read:own': ['*', '!password', '!_id'],
      'update:own': ['*', '!password', '!_id']
    },
    brand: { 'read:any': ['*']},
    products: {'read:any': ['*']}
  }
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };