const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id'
const CLOUDINARY_UPLOAD_URL = 'http://res.cloudinary.com/z28ks5gg/upload'
import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Input,
  Image,
  Segment,
  TextArea
} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import FormEditWrapper from '../../../components/FormEditWrapper'
import {getEntitiesSession} from '../../../api/entities/selectors.js'
import {updateEntity} from '../../../api/entities/actions.js'
import {getValueFromEvent} from '../../../utils/clientUtils.js'
import ModalMgr from '../../../containers/Modals/ModalMgr.js'
import orm from '../../../app/schema.js'

// actions
import {openModal} from '../../../containers/Modals/actions.js'
import updateSettings from '../../../api/course/actions/courseActions.js'

const USING_LANG = [
  {value: 'English', text: 'English'},
  {value: 'Korean', text: 'Korean'}
]

const TEACHING_LANG = [
  {value: 'English', text: 'English'},
  {value: 'Korean', text: 'Korean'}
]

const initialState = {
  uploadedFile: {},
  uploadFileCloudinaryUrl: ''
}

class CourseSettings extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    const newState = update(this.state, {
      secure_url: {$set: this.props.course.image}
    })

    this.setState(newState)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateSettings(this.props.course)
  }

  inputChange = (e, result) => {
    const newValues = getValueFromEvent(e)
    const {id} = this.props.course
    this.props.updateEntity('Course', id, newValues)
  }

  dropdownChange = (e, result) => {
    const {name, value} = result
    const newValues = {[name]: value}
    const {id} = this.props.course
    this.props.updateEntity('Course', id, newValues)
  }

  openModalClicked = () => {
    this.props.openModal('ModalContainer', {counter: 1})
  }

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files)
  }

  handleImageDelete() {
    const timestamp = (Date.now() / 1000) | 0
    console.log('signature: ', this.props.course.cdn.signature)
    console.log('timestamp: ', timestamp)
    axios({
      method: 'post',
      url: 'https://api.cloudinary.com/v1_1/q2vo0abd/image/destroy/',
      data: {
        api_key: '225688292439754',
        file: this.props.course.cdn.file,
        public_id: this.props.course.cdn.public_id,
        resource_type: 'image',
        signature: this.props.course.cdn.signature,
        timestamp
        // upload_preset: 'z28ks5gg',
        // folder: 'course-thumbnails',
      }
    })
      .then(res => {
        return res
      })
      .catch(err => {
        throw err.response.data.error
      })
  }

  handleImageUpload(files) {
    // this.handleImageDelete() // TODO
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tags', `course-name`)
      formData.append('upload_preset', 'z28ks5gg') // Replace the preset name with your own
      formData.append('folder', 'course-thumbnails') // Folder to place image in
      formData.append('api_key', '225688292439754') // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0)

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/dgvw5b6pf/image/upload/',
          formData
        )
        .then(res => {
          const data = res.data

          return data
        })
        .catch(err => {
          console.log('upload error: ', err)
        })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(values => {
      console.log('values: ', values)
      const id = this.props.course.id
      const newCdn = {cdn: values[0]}
      const courseImage = {courseImage: values[0].secure_url}
      this.props.updateEntity('Course', id, newCdn)
      this.props.updateEntity('Course', id, courseImage)

      // update Course on server
      this.props.updateSettings(this.props.course)
    })
  }

  render() {
    let course = this.props.course
    const {courseDescription, courseName} = course
    const reminder = this.state.uploadedFile.name ? (
      <p style={{color: 'red'}}>Click save for permanent changes</p>
    ) : null
    return (
      <Form size="large" onSubmit={this.handleSubmit}>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Affordable language learning" />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Settings</title>
          <link rel="canonical" href="https://utter.zone/settings" />
        </Helmet>
        <ModalMgr />
        <Segment>
          <Grid>
            <Grid.Column width={8}>
              <Segment>
                <div>
                  {this.state.secure_url === '' ? null : (
                    <Form.Field
                      label="Course Thumbnail Preview"
                      name="image"
                      control={Image}
                      src={this.props.course.courseImage}
                      size="small"
                    />
                  )}
                </div>
                <p>{this.state.uploadedFile.name}</p>
                <div>{reminder}</div>
                <Dropzone
                  style={{
                    padding: '3px',
                    position: 'relative',
                    width: '100px',
                    height: '50px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'dashed',
                    borderRadius: '5px'
                  }}
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onImageDrop}>
                  <p>Drop an image or click to select a file to upload.</p>
                </Dropzone>
              </Segment>
              <FormEditWrapper
                singleValue={true}
                value={{courseName}}
                onChange={this.inputChange}>
                <Form.Field
                  label="Course Name"
                  name="courseName"
                  control={Input}
                  placeholder="Name"
                />
              </FormEditWrapper>
              <FormEditWrapper
                singleValue={true}
                value={{courseDescription}}
                onChange={this.inputChange}>
                <Form.Field
                  label="Course Description"
                  name="courseDescription"
                  control={TextArea}
                  placeholder="This section will describe this course."
                />
              </FormEditWrapper>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Form.Field
                  label="Using Language"
                  name="usingLang"
                  control={Dropdown}
                  selection
                  options={USING_LANG}
                  value={course.usingLang}
                  onChange={this.dropdownChange}
                />
                <Form.Field
                  label="Teaching Language"
                  name="teachingLang"
                  control={Dropdown}
                  selection
                  options={TEACHING_LANG}
                  value={course.teachingLang}
                  onChange={this.dropdownChange}
                />
              </Segment>
              <Button style={{background: '#F6D155'}}>Save</Button>
              <Button color="red" onClick={this.openModalClicked}>
                Delete Course
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = getEntitiesSession(state)

  // Retrieve the model class that we need.  Each Session
  // specifically "binds" model classes to itself, so that
  // updates to model instances are applied to that session.
  // These "bound classes" are available as fields in the sesssion.
  const {Course} = session

  // Query the session for all Course instances.
  // The QuerySet that is returned from all() can be used to
  // retrieve instances of the Course class, or retrieve the
  // plain JS objects that are actually in the store.
  // The toRefArray() method will give us an array of the
  // plain JS objects for each item in the QuerySet.

  let course = Course.first().ref

  return {course}
}

const actions = {
  openModal,
  updateEntity,
  updateSettings: updateSettings.update
}

export default connect(
  mapStateToProps,
  actions
)(CourseSettings)
