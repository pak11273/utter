import "../../styles.css"
import React, {Component} from "react"
import {Button, Container, Form, Grid, Header} from "semantic-ui-react"
import {Field, withFormik} from "formik"
import {bindActionCreators} from "redux"
/* import update from "immutability-helper" */
import {connect} from "react-redux"
import schema from "../../../core/schema.js"
import {cloneDeep} from "lodash"
import cuid from "cuid"
import styled, {ThemeProvider} from "styled-components"
import {zoneCreateSchema} from "@utterzone/common"
import Games from "./games"
import gameData from "../../../data/gameData.js"
import {history} from "@utterzone/connector"
import {
  Box,
  Flex,
  FormikInput,
  FormikTextArea,
  /* Input, */
  MastheadTitle,
  MastheadSubtitle,
  /* Searching, */
  Span
} from "../../../components"
import {Masthead} from "../../../containers"
import {addFlashMessage} from "../../../core/actions/flashMessages"
import {main} from "../../../themes/config"
import {toggleFooter} from "../../../core/actions/toggle-footer-action"

const DisplayCount = styled.div`
  font-size: 0.8rem;
  position: absolute;
  right: 2%;
  top: 6px;

  @media (min-width: 330px) {
    right: 10%;
  }

  @media (min-width: 640px) {
    right: 2%;
  }

  @media (min-width: 740px) {
    right: 10%;
  }
`
const StyledForm = styled(Form)`
  height: 1000px;
  margin: 0 auto;
  min-width: 250px;
  width: 70%;
`
const StyledFlex = styled(Flex)`
  grid-area: ${props => props.gridarea};
  margin: ${props => props.margin};
  overflow: initial;
  position: relative;

  @media (min-width: 1080px) {
    margin: ${props => props.margin1080};
  }
`
StyledFlex.defaultProps = {
  margin: "80px 0 0 0"
}

const StyledSpan = styled(Span)`
  display: none;
  font-size: 0.6rem;
  padding: 0 0 0 10px;

  @media (min-width: 640px) {
    display: ${props => props.display640};
  }
`
const initialState = {
  ageGroup: "Any age",
  cdn: {},
  charCount: 0,
  course: "",
  zoneId: cuid(),
  zoneImage: "",
  zoneRef: "",
  disabled: false,
  displayName: "",
  errors: {},
  game: "Total Recall",
  levels: [{level: 1, cuid: cuid()}],
  level: "",
  loading: false,
  owner: "",
  public_id: "",
  secure_url: "",
  signature: "",
  terms: [{word: "Change me", translation: "Change me", audio: "audio.mp3"}],
  url: ""
}

class ZoneCreate extends Component {
  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)

    // clear state
    this.setState(initialState)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  addAge = value => {
    this.setState({
      ageGroup: value
    })
  }

  onBlur = () => {
    this.props.actions.fetchZoneName(this.state.zoneName)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addCourse = value => {
    this.setState({
      course: value
    })
  }

  addGame = value => {
    this.setState({
      game: value
    })
  }

  addLevel = value => {
    this.setState({
      level: value
    })
  }

  addRef = value => {
    this.setState({
      zoneRef: value
    })
  }

  render() {
    const {handleSubmit} = this.props
    const {zoneName, zoneDescription} = this.props.values
    return (
      <ThemeProvider theme={main}>
        <Grid>
          <Grid.Row centered>
            <Masthead background="#000 url(https://betterthannarnia.files.wordpress.com/2014/02/wardrobe.jpg) no-repeat left top">
              <MastheadTitle color="#F6D155">Host a Zone</MastheadTitle>
              <MastheadSubtitle color="#F6D155">
                Zones are places where you and other users can get together and
                practice speaking.
              </MastheadSubtitle>
            </Masthead>
          </Grid.Row>
          <Grid.Row centered>
            <Container>
              <Grid.Column textAlign="center">
                <StyledForm error onSubmit={handleSubmit}>
                  <div>
                    <Field
                      name="owner"
                      component={FormikInput}
                      value={this.props.user.id}
                      style={{display: "none"}}
                    />
                  </div>
                  <Box margin="40px 0 0 0" position="relative">
                    <Header>
                      Zone Name
                      <StyledSpan display640="inline-block">
                        {" "}
                        (10-100 chars.)
                      </StyledSpan>
                    </Header>
                    <DisplayCount>{zoneName.length}</DisplayCount>
                    <Field
                      name="zoneName"
                      placeholder="Provide a unique name for your zone."
                      component={FormikInput}
                      style={{width: "300px"}}
                    />
                  </Box>
                  <Box margin="40px 0 0 0" position="relative">
                    <Header>
                      Zone Description
                      <StyledSpan display640="inline-block">
                        {" "}
                        (10-100 chars.)
                      </StyledSpan>
                    </Header>
                    <DisplayCount>{zoneDescription.length}</DisplayCount>
                    <Field
                      name="zoneDescription"
                      placeholder="Provide a brief description of your zone."
                      component={FormikTextArea}
                      style={{width: "500px"}}
                    />
                  </Box>
                  <Grid>
                    <Flex
                      gridarea="games"
                      margin="40px 0 0 0"
                      overflow="initial"
                      position="relative">
                      <Header>Games</Header>
                      <Field
                        name="game"
                        component={Games}
                        addGame={this.addGame}
                        options={gameData}
                      />
                    </Flex>
                    <StyledFlex gridarea="ref" margin1080="40px 0 0 0">
                      <Flex
                        gridarea="courses"
                        overflow="initial"
                        position="relative">
                        <Header>Subscribed Courses</Header>
                        <Field
                          name="course"
                          component="select"
                          onClick={this.addCourse}>
                          <option>first</option>
                          <option>second</option>
                          <option>third</option>
                        </Field>
                      </Flex>
                    </StyledFlex>
                    <StyledFlex gridarea="levels" margin1080="40px 0 0 0">
                      <Flex overflow="initial" position="relative">
                        <Header>Set Levels</Header>
                        <p>
                          The minimum level a user has to be to enter this zone.
                        </p>
                        <Field
                          name="level"
                          component="select"
                          onClick={this.addLevel}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Field>
                      </Flex>
                    </StyledFlex>
                    <StyledFlex gridarea="ageGroup" margin1080="40px 0 0 0">
                      <Flex overflow="initial" position="relative">
                        <Header>Age Restrictions</Header>
                        <p>
                          Pick an appropriate age setting or a specific age
                          demographic. Conversations are still not to involve
                          any sexual misconduct or vulgar behaviour.
                        </p>
                        <Field
                          name="ageGroup"
                          component="select"
                          onClick={this.addAge}>
                          <option>Any age</option>
                          <option>Safe for ages 0-2</option>
                          <option>Safe for ages 3+</option>
                          <option>Safe for ages 7+</option>
                          <option>Safe for ages 12+</option>
                          <option>Safe for ages 16+</option>
                          <option>Safe for ages 18+</option>
                          <option>Kindergarten</option>
                          <option>Elementary</option>
                          <option>Middle School</option>
                          <option>High School</option>
                          <option>College</option>
                          <option>Only 18+</option>
                          <option>Only 30+</option>
                          <option>Only 40+</option>
                          <option>Only 50+</option>
                          <option>Only 60+</option>
                        </Field>
                      </Flex>
                    </StyledFlex>
                    <StyledFlex margin1080="40px 0">
                      <Button
                        type="submit"
                        color="yellow"
                        loading={this.state.loading}
                        disabled={this.state.disabled}>
                        Create Zone
                      </Button>
                    </StyledFlex>
                  </Grid>
                </StyledForm>
              </Grid.Column>
            </Container>
          </Grid.Row>
        </Grid>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User} = session
  const userObj = User.all().toRefArray()
  var user = userObj[0]
  return {
    user
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addFlashMessage,
      toggleFooter
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema: zoneCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: props => ({
      owner: props.user.id,
      zoneName: "",
      zoneImage:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk",
      zoneDescription: "",
      course: "",
      level: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      console.log("values; ", values)
      const result = await props.submit(values)
      const onComplete = result => {
        history.push({
          pathname: "/zone/zone-settings",
          state: {zoneId: result.zoneCreate.id}
        })
      }

      // if create is legit
      if (result) {
        onComplete(result)
        props.actions.addFlashMessage({
          type: "success",
          text: "Zone successfully created!"
        })
      } else {
        setErrors(result.zoneCreate.errors)
        props.actions.addFlashMessage({
          type: "error",
          text: "Something went wrong. Could not create a zone."
        })
      }
    }
  })(ZoneCreate)
)
