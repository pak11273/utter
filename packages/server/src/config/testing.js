export default {
  env: {
    /* DB_HOST: `mongodb+srv://${process.env.MONGO_USER}:${ */
    /*   process.env.MONGO_PASSWORD */
    /* }@utter-dev-zsuxf.mongodb.net/test?retryWrites=true`, */

    DB_HOST:
      "mongodb+srv://pak11273:N5vrTCrEH3n35oYD@utter-dev-zsuxf.mongodb.net/test?retryWrites=true",
    JWT: process.env.JWT
  },
  host: "http://192.168.68.8:3010",
  logging: true,
  seed: true
}
