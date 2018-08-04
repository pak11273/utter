module.exports = {
  apps: [
    {
      name: 'utterzone',
      script: './server/dist/index.js',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    }
  ]
}
