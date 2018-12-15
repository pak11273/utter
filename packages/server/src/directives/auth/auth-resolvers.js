export const auth = (next, source, args, ctx) => {
  const token = ctx.headers.authorization
  if (!token) {
    throw new AuthorizationError({
      message: "You must supply a JWT for authorization!"
    })
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    )
    ctx.user = decoded
    return next()
  } catch (err) {
    throw new AuthorizationError({
      message: "You are not authorized."
    })
  }
}
