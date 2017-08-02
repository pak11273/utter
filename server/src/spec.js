import app from './server.js'
import request from 'supertest'
import {expect} from 'chai'

describe('[LIONS]', function() {
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should creat ONE lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'mustafa',
        age: 13,
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should get ONE lion', function(done) {
    request(app)
      .get('/lions/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should update ONE lion', function(done) {
    request(app)
      .put('/lions/1')
      .send({
        name: 'cheetaman'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        let body = res.body
        expect(body.name).to.eql('cheetaman')
        done()
      })
  })

  it('should delete ONE lion', function(done) {
    request(app)
      .delete('/lions/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('object')
        done()
      })
  })
})

// run bcompile after making changes
