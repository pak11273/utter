/* eslint no-unused-vars: 0 */
import React, {Component} from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import DeleteIcon from "@material-ui/icons/Delete"
import FormControl from "@material-ui/core/FormControl"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {session} from "brownies"
import {Query} from "react-apollo"
import gql from "graphql-tag"

import {Hero} from "../../../components"

import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

const getCourse = gql`
  query getCourse($courseId: String!) {
    getCourse(courseId: $courseId) {
      courseName
      levels {
        id
        title
      }
    }
  }
`

const styles = theme => ({
  actions: {
    flex: 50
  },
  root: {
    maxWidth: 900,
    margin: "0 auto"
  },
  button: {
    /* marginBottom: theme.spacing.unit * 4 */
    marginLeft: theme.spacing.unit * 2
  },
  text: {
    color: "white"
  }
})

class Grammar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      labelWidth: 0,
      value: "level",
      columnDefs: [
        {
          rowDrag: true,
          headerName: ""
        },
        {headerName: "Rule", field: "rule"},
        {headerName: "Translation", field: "translation"},
        {headerName: "Action", field: ""}
      ],
      rowData: [
        {level: "1", model: "Celica", price: 35000},
        {level: "2", model: "Mondeo", price: 32000},
        {level: "3", model: "Boxter", price: 72000}
      ]
    }
  }

  componentDidMount() {
    this.props.toggleFooter(true)
    fetch("https://api.myjson.com/bins/15psn9")
      .then(result => result.json())
      .then(rowData => this.setState({rowData}))
  }

  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData
      .map(node => node.make + " " + node.model)
      .join(", ")
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }

  handleChg = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const {course} = session
    const {classes, level} = this.props
    const data = [
      {
        level: 1,
        rule: "subject-object-verb sentence order."
      },
      {
        level: 1,
        rule:
          "respect levels: Yo for strangers, most common.  imnida for older."
      }
    ]

    const columns = [
      {
        Header: "Rule",
        accessor: "rule",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      /* reference only */
      /* { */
      /*   id: "friendName", // Required because our accessor is not a string */
      /*   Header: "Friend Name", */
      /*   accessor: d => d.friend.name // Custom value accessors! */
      /* }, */
      {
        Header: props => <span>Action</span>, // Custom header components!
        id: "123",
        accessor: props => (
          <span className={classes.actions}>
            <IconButton
              status="danger"
              onClick={() => console.log("Pending Modal!")}>
              <DeleteIcon />
            </IconButton>
          </span>
        )
      }
    ]
    return (
      <Query
        query={getCourse}
        variables={{
          courseId: course.id
        }}>
        {({loading, error}) => {
          if (loading) {
            return <div>Loading...</div>
          }
          if (error)
            return (
              <Grid>
                <pre>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "1em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </pre>
              </Grid>
            )
          return (
            <Grid container direction="column">
              <Hero title="Grammar">
                <Grid container alignItems="center" justify="center">
                  <Typography variant="h6" style={{paddingRight: "20px"}}>
                    Choose a level
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}>
                    <Select
                      value={this.state.value}
                      onChange={this.handleChg("selectionBox")}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="info"
                          id="outlined-filter-simple"
                        />
                      }>
                      <MenuItem value="level">1</MenuItem>
                      <MenuItem value="level">2</MenuItem>
                      <MenuItem value="level">3</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    onClick={this.handleSubmit}
                    size="small">
                    Submit
                  </Button>
                </Grid>
              </Hero>
              <Grid item>
                {/* {data.getCourse.levels.map(level => { 
              return ( */}
                <ReactTable data={data} columns={columns} />
              </Grid>
              <Grid item style={{display: "flex", justifyContent: "center"}}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  onClick={this.onButtonClick}
                  size="large">
                  Save
                </Button>
              </Grid>
            </Grid>
          )
        }}
      </Query>
    )
  }
}

const mapStateToProps = state => {
  const ormSession = schema.session(state.apiReducer)
  const {User, Level} = ormSession
  const userObj = User.all().toRefArray()
  const levelObj = Level.all().toRefArray()
  var user = userObj[0]
  var level = levelObj[0]

  return {
    user,
    level
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFooter: () => dispatch(toggleFooter())
  }
}

export default withStyles(styles)(Grammar)
