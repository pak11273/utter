export const forgotPasswordLockAccount = async (userId, redis) => {
  // deny login
  User.findByIdAndUpdate(
    userId,
    {$set: {forgotPasswordLocked: true}},
    (err, doc) => {}
  )
}
