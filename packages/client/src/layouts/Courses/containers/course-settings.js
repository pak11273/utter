import React, {Component} from "react"
import {connect} from "react-redux"
import Helmet from "react-helmet"
import {Can} from "../../../components"
import schema from "../../../app/schema"
import ModalMgr from "../../../containers/modals/modal-mgr.js"
/* import {history} from "@utterzone/connector" */
import {Container, Header, Form, Segment} from "semantic-ui-react"
import {Masthead} from "../../../containers"
/* import {getEntitiesSession} from "../../../api/entities/selectors.js" */

// actions
import {toggleFooter} from "../../../app/actions/toggle-footer-action.js"
import {openModal} from "../../../containers/modals/actions.js"

class CourseSettings extends Component {
  state = {name: "", email: "", submittedName: "", submittedEmail: ""}

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleSubmit = () => {
    const {name, email} = this.state

    this.setState({submittedName: name, submittedEmail: email})
  }

  openModalClicked = e => {
    e.preventDefault()
    this.props.openModal("courseModal", null)
  }

  render() {
    /* const {name, email, submittedName, submittedEmail} = this.state */
    const {user, course} = this.props
    return (
      <div>
        <Can
          roles={user.roles}
          perform="course:read-settings"
          id={user.username}
          matchingID={course.owner.username}
          yes={() => (
            <Container>
              <Container>
                <Masthead padding="60px 20px 40px  20px">
                  <Header as="h1">Course Settings</Header>
                </Masthead>
                <Helmet>
                  <meta charset="utf-8" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                  />
                  <meta
                    name="description"
                    content="Affordable language learning"
                  />
                  <meta name="author" content="Isaac Pak" />
                  <title>Utterzone | Settings</title>
                  <link rel="canonical" href="https://utter.zone/settings" />
                </Helmet>
              </Container>
              <Form onSubmit={this.handleSubmit} style={{position: "relative"}}>
                <ModalMgr />
                <Container style={{paddingBottom: "5em"}} text>
                  <Header as="h2">General Settings</Header>
                  <Header as="h4" attached="top" block />
                  <Segment attached>General</Segment>
                  <Header as="h4" attached="bottom" block />
                </Container>
                <Container style={{paddingBottom: "5em"}} text>
                  <Header as="h2">Danger Zone</Header>
                  <Header as="h4" attached="top" block />
                  <Segment clearing attached>
                    <Form.Button
                      floated="right"
                      color="red"
                      onClick={this.openModalClicked}
                      content="Delete Course"
                    />
                  </Segment>
                  <Header as="h4" attached="bottom" block />
                </Container>
                <Container
                  style={{position: "relative", paddingBottom: "5em"}}
                  text>
                  <Form.Button
                    floated="right"
                    onClick={this.onButtonClick}
                    content="Save Changes"
                    color="yellow"
                    fontSize="1.5rem"
                    style={{position: "absolute", right: "15px"}}
                  />
                </Container>
              </Form>
            </Container>
          )}
          no={() => <h1>wtf</h1>}
        />
      </div>
    )
  }
}

/* <Form.Group> */
/*   <Segment> */
/*     <Grid> */
/*       <Grid.Column width={8}> */
/*         <Segment> */
/*           <div> */
/*             {this.state.secure_url === "" ? null : ( */
/*               <Form.Field */
/*                 label="Course Thumbnail Preview" */
/*                 name="image" */
/*                 control={Image} */
/*                 src={this.props.course.courseImage} */
/*                 size="small" */
/*               /> */
/*             )} */
/*           </div> */
/*           <p>{this.state.uploadedFile.name}</p> */
/*           <Dropzone */
/*             style={{ */
/*               padding: "3px", */
/*               position: "relative", */
/*               width: "100px", */
/*               height: "50px", */
/*               borderWidth: "2px", */
/*               borderColor: "rgb(102, 102, 102)", */
/*               borderStyle: "dashed", */
/*               borderRadius: "5px" */
/*             }} */
/*             multiple={false} */
/*             accept="image/*" */
/*             onDrop={this.onImageDrop}> */
/*             <p> */
/*               Drop an image or click to select a file to upload. */
/*             </p> */
/*           </Dropzone> */
/*         </Segment> */
/*         <FormEditWrapper */
/*           singleValue */
/*           value={{courseName}} */
/*           onChange={this.inputChange}> */
/*           <Form.Field */
/*             label="Course Name" */
/*             name="courseName" */
/*             control={Input} */
/*             placeholder="Name" */
/*           /> */
/*         </FormEditWrapper> */
/*         <FormEditWrapper */
/*           singleValue */
/*           value={{courseDescription}} */
/*           onChange={this.inputChange}> */
/*           <Form.Field */
/*             label="Course Description" */
/*             name="courseDescription" */
/*             control={TextArea} */
/*             placeholder="This section will describe this course." */
/*           /> */
/*         </FormEditWrapper> */
/*       </Grid.Column> */
/*       <Grid.Column width={8}> */
/*         <Segment> */
/*           <Label>Course Reference</Label> */
/*           <Select.Creatable */
/*             id="courseRef" */
/*             wrapperStyle={{ */
/*               margin: "20px 0 0 0", */
/*               width: "100%" */
/*             }} */
/*             style={{ */
/*               width: "100%" */
/*             }} */
/*             menuContainerStyle={{ */
/*               width: "100%" */
/*             }} */
/*             menuStyle={{ */
/*               width: "100%" */
/*             }} */
/*             multi={multi} */
/*             options={options} */
/*             onChange={this.updateValue} */
/*             value={multi ? multiValue : value} */
/*           /> */
/*           <Label>Using Language</Label> */
/*           <Select */
/*             id="usingLang" */
/*             ref={ref => { this.select = ref }} */

/*             onBlurResetsInput={false} */
/*             onSelectResetsInput={false} */
/*             options={languageData} */
/*             simpleValue */
/*             clearable={this.state.clearable} */
/*             wrapperStyle={{ */
/*               margin: "20px 0 0 0", */
/*               width: "100%" */
/*             }} */
/*             style={{ */
/*               width: "100%" */
/*             }} */
/*             menuContainerStyle={{ */
/*               width: "100%" */
/*             }} */
/*             menuStyle={{ */
/*               width: "100%" */
/*             }} */
/*             name="usingLang" */
/*             disabled={this.state.disabled} */
/*             value={course.usingLang} */
/*             onChange={this.usingDropdownChange} */
/*             rtl={this.state.rtl} */
/*             searchable={this.state.searchable} */
/*           /> */
/*           <Label>Teaching Language</Label> */
/*           <Select */
/*             id="teachingLang" */
/*              ref={ref => { this.select = ref }} */

/*             onBlurResetsInput={false} */
/*             onSelectResetsInput={false} */
/*             options={languageData} */
/*             simpleValue */
/*             clearable={this.state.clearable} */
/*             wrapperStyle={{ */
/*               margin: "20px 0 0 0", */
/*               width: "100%" */
/*             }} */
/*             style={{ */
/*               width: "100%" */
/*             }} */
/*             menuContainerStyle={{ */
/*               width: "100%" */
/*             }} */
/*             menuStyle={{ */
/*               width: "100%" */
/*             }} */
/*             name="teachingLang" */
/*             disabled={this.state.disabled} */
/*             value={course.teachingLang} */
/*             onChange={this.teachingDropdownChange} */
/*             rtl={this.state.rtl} */
/*             searchable={this.state.searchable} */
/*           /> */
/*         </Segment> */
/*         <Button */
/*           style={{background: "#F6D155"}} */
/*           loading={this.props.courseMeta.loading}> */
/*           Save */
/*         </Button> */
/*       </Grid.Column> */
/*     </Grid> */
/*   </Segment> */
/* </Form.Group> */

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User, Course} = session
  const course = Course.first().ref
  const userObj = User.all().toRefArray()
  var user = userObj[0]
  return {
    user,
    course
  }
}

const actions = {
  openModal,
  toggleFooter
}

export default connect(
  mapStateToProps,
  actions
)(CourseSettings)
