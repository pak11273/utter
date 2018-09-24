import node_acl from 'acl'
import mongoose from 'mongoose'
import roles from './roles.js'
import User from '../api/user/userModel.js'
// ACL config
var acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db))

export default {
  init: function() {
    acl.allow(roles)
    acl.addRoleParents('admin', 'registeredUser')

    // var user = User.findOne({username: 'brad'}, (err, user) => {
    //   if (!user) {
    //     null
    //   } else {
    //     acl.addUserRoles(user.id, 'admin')
    //   }
    // })
  },
  getAcl: function() {
    return acl
  }
}
