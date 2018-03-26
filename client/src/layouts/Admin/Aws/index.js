import React, {Component} from 'react'
import {Container} from '../../../containers'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {Helmet} from 'react-helmet'

import {
  Box,
  Button,
  Column,
  Form,
  Grid,
  Input,
  Label,
  Line,
  Section,
  Select,
  Text,
  Title
} from '../../../components'

import actionCreators from './actions.js'

class Aws extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    document
      .getElementById('upload_widget_opener')
      .addEventListener('click', function() {
        cloudinary.openUploadWidget(
          {
            cloud_name: 'dgvw5b6pf',
            upload_preset: 'z28ks5gg',
            api_key: '225688292439754',
            cropping: 'server',
            upload_signature: this.generateSignature
          },
          function(error, result) {
            console.log(error, result)
          }
        )
      })
  }

  onChange = e => {
    if (e.target.value != '') {
      var output = document.getElementById('output')

      var data = new FormData()
      data.append('upload', document.getElementById('upload_input').files[0])
      axios
        .post('/admin/uploadFile', data)
        .then(function(res) {
          var uploadBtn = document.getElementById('upload_btn')
          var country = document.getElementById('country')
          var club = document.getElementById('club')
          output.className = 'good'
          console.log('res: ', res)
          output.innerHTML = res.data
          club.value = ''
          country.value = ''
          uploadBtn.innerText = 'Upload File'
        })
        .catch(function(err) {
          output.className = 'bad text-danger'
          output.innerHTML = err.message
        })
    }
  };

  upload = e => {
    e.target.innerText = 'Uploading...'
    document.getElementById('upload_input').click()
  };

  render() {
    return (
      <Container gridtemplatecolumns="1fr">
        <Section>
          <Title>Cloudinary</Title>
          <a href="#" id="upload_widget_opener">
            Upload Images
          </a>
          <Title>
            Server Upload to /client/assets/uploads (under construction)
          </Title>
          <Line color="black" width="100%" />
          <Form>
            <Box>
              <Input
                width="80%"
                type="text"
                name="club"
                id="club"
                placeholder="Club name"
              />
              <Input
                width="80%"
                type="text"
                name="country"
                id="country"
                placeholder="Country"
              />
              <Input
                width="80%"
                onChange={this.onChange}
                type="file"
                name="upload"
                id="upload_input"
                hidden
              />
              <div id="output" className="container" />
              <Button
                type="button"
                onClick={this.upload}
                id="upload_btn"
                width="200px">
                Upload File
              </Button>
              <Button onClick={this.upload} id="upload_btn" width="200px">
                Add Group
              </Button>
            </Box>
          </Form>
        </Section>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    vocabReducer: state.vocabReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aws)
