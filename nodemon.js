var nodemon = require('nodemon')
var npm = require('npm')

nodemon({script: './server/dist/index.js'}).on('start', function() {
  console.log('nodemon started')
})
// .on('restart', function() {
//   console.log('hi')
// process.once('SIGUSR2', function() {
//   gracefulShutdown(function() {
//     process.kill(process.pid, 'SIGUSR2')
//   })
// })
// npm.load({}, function(err) {
//   if (err) {
//     return
//   }
//   npm.commands.run(['prebuild'])
//   //   npm.commands.run(['bserver'])
// })
// })
