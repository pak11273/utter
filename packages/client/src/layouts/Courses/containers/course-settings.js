import React, {Component} from "react"
import {connect} from "react-redux"
import Helmet from "react-helmet"
import {Can} from "../../../components"
import schema from "../../../core/schema"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import ModalMgr from "../../../containers/modals/modal-mgr.js" */

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"
import {openModal} from "../../../containers/modals/actions.js"

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  root: {
    maxWidth: 900,
    margin: "0 auto"
  }
})

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
    const {classes, user, course} = this.props
    return (
      <Can
        roles={user.roles}
        perform="course:read-settings"
        id={user.username}
        matchingID={course.owner.username}
        yes={() => (
          <form className={classes.root} onSubmit={this.handleSubmit}>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Grid container justify="center" direction="column">
                  <Typography
                    variant="h4"
                    align="center"
                    className={classes.text}
                    gutterBottom>
                    Settings
                  </Typography>
                </Grid>
              </div>
            </div>
            {/* End hero unit */}
            <main className={classes.content}>
              <Grid container spacing={24}>
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
                {/*  <ModalMgr /> */}
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    align="left"
                    className={classes.text}
                    gutterBottom>
                    General Information
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{backgroundColor: "black"}}>
                  <Typography
                    variant="h4"
                    align="left"
                    color="primary"
                    className={classes.text}
                    gutterBottom>
                    Danger Zone
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      margin: "12px"
                    }}>
                    Delete Course
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      margin: "50px 0"
                    }}>
                    <Button
                      type="submit"
                      onClick={this.onButtonClick}
                      variant="outlined">
                      Save Changes
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </main>
          </form>
        )}
        no={() => <h1>wtf</h1>}
      />
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
)(withStyles(styles)(CourseSettings))
