export default {
  env: {
    DB_HOST: "mongodb://localhost:27017/test",
    JWT: process.env.JWT
  },
  host: "http://192.168.68.8:3010",
  logging: true,
  seed: true
}
