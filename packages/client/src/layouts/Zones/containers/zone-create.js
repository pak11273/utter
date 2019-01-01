import "../styles.css"
import {Button, Container, Form, Grid, Header} from "semantic-ui-react"
import {Field, withFormik} from "formik"
import {bindActionCreators} from "redux"
/* import update from "immutability-helper" */
import {connect} from "react-redux"
import React, {Component} from "react"
import cloneDeep from "lodash/cloneDeep"
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
import {addFlashMessage} from "../../../app/actions/flashMessages"
import {main} from "../../../themes/config"
import {toggleFooter} from "../../../app/actions/toggleFooterAction"

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
  cdn: {},
  charCount: 0,
  zoneId: cuid(),
  zoneImage: "",
  zoneRef: "",
  disabled: false,
  displayName: "",
  errors: {},
  game: "Total Recall",
  levels: [{level: 1, cuid: cuid()}],
  loading: false,
  public_id: "",
  secure_url: "",
  signature: "",
  tags: [],
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

  onBlur = () => {
    this.props.actions.fetchZoneName(this.state.zoneName)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addGame = value => {
    this.setState({
      game: value
    })
  }

  addRef = value => {
    this.setState({
      zoneRef: value
    })
  }

  addTags = value => {
    this.setState({
      tags: value
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
                    <StyledFlex gridarea="ref" margin1080="40px 0 0 0">
                      <Flex
                        gridarea="games"
                        overflow="initial"
                        position="relative">
                        <Header>Subscribed Zones</Header>
                        <Field
                          name="game"
                          component={Games}
                          addGame={this.addGame}
                          options={gameData}
                        />
                      </Flex>
                    </StyledFlex>
                    <StyledFlex gridarea="tags" margin1080="40px 0 0 0">
                      <Flex
                        gridarea="games"
                        overflow="initial"
                        position="relative">
                        <Header>Set Levels</Header>
                        <p>Show the level a user should be at in the zone.</p>
                        <Field
                          name="game"
                          component={Games}
                          addGame={this.addGame}
                          options={gameData}
                        />
                      </Flex>
                    </StyledFlex>
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
  null,
  mapDispatchToProps
)(
  withFormik({
    validationSchema: zoneCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      zoneName: "",
      zoneImage:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk",
      zoneDescription: "",
      game: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      console.log("values; ", values)
      const result = await props.submit(values)
      const onComplete = result => {
        // TODO: push zoneId to redux
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
          text: "Start building your zone."
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
