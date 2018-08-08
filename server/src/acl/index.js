import node_acl from 'acl'
import mongoose from 'mongoose'
import roles from './roles.js'
import User from '../api/user/userModel.js'
// ACL config
// mongoose.connection.on('connected', function(err) {
//   if (err) throw error
var acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db))

module.exports = {
  init: function() {
    acl.addRoleParents('user', 'guest')
    acl.addRoleParents('admin', 'user')

    acl.allow(roles)
    // Inherit roles
    //  Every user is allowed to do what guests do
    //  Every admin is allowed to do what users do

    var user = User.findOne({username: 'brad'}, (err, user) => {
      acl.addUserRoles(user.id, 'admin')
    })
    // console.log('blah: ', acl.allowedPermissions)
    // })
  },
  getAcl: function() {
    return acl
  }
}
