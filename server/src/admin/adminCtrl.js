import path from 'path'
import fs from 'fs'
import formidable from 'formidable'
import Language from './adminModel.js'

export default {
  uploadFile: (req, res) => {
    const form = new formidable.IncomingForm()

    form.uploadDir = path.join(__dirname, '../../../client/src/assets/uploads')

    form.on('file', (field, file) => {
      fs.rename(file.path, path.join(form.uploadDir, file.name), err => {
        if (err) throw err
        console.log('file renamed successfully')
      })
    })

    form.on('error', err => {
      console.log(err)
    })

    form.on('end', () => {
      console.log('file upload is successful')
      res.writeHead(200)
      res.end()
    })

    form.parse(req)
  },

  newLanguage: (req, res) => {
    const newLang = new Language()
    newLang.name = req.body.club
    newLang.country = req.body.country
    newLang.image = req.body.upload
    newLang.save(err => {
      res.send('success')
    })
  }
}
