/* eslint no-unused-vars: 0 */
import React, {Component} from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {graphql, Mutation, Query} from "react-apollo"
import gql from "graphql-tag"
import {withFormik} from "formik"

import schema from "../../../core/schema.js"
import {Hero, LoaderCircle} from "../../../components"

// actions
import {loadData} from "../../../api/actions.js"
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

const getLevels = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        level
        title
      }
    }
  }
`

const levelCreate = gql`
  mutation levelCreate($input: LevelCreateInput!) {
    levelCreate(input: $input) {
      courseId
      level
      title
    }
  }
`

const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  addButton: {
    alignItems: "center",
    height: "100%"
  },
  button: {
    marginBottom: theme.spacing.unit * 4
    /* right: theme.spacing.unit * 2 */
  },
  editHeader: {
    alignItems: "center",
    display: "flex",
    fontSize: theme.spacing.unit * 2,
    fontWeight: 400,
    height: "100%",
    justifyContent: "center",
    minHeight: "40px",
    width: "100%"
  },
  level: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  title: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    paddingLeft: "10px",
    width: "100%"
  },
  header: {
    fontSize: theme.spacing.unit * 3,
    fontWeight: 400,
    height: "100%",
    minHeight: "40px",
    width: "100%"
  },
  inputHeader: {
    background: "white",
    minHeight: "40px",
    width: "100%"
  },
  root: {
    maxWidth: 900,
    margin: "0 auto"
  },
  text: {
    color: "white"
  }
})

class Levels extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newTitle: ""
      /* columnDefs: [ */
      /*   { */
      /*     rowDrag: true, */
      /*     headerName: "" */
      /*   }, */
      /*   {headerName: "Level", field: "level"}, */
      /*   {headerName: "Title", field: "title"}, */
      /*   {headerName: "Action", field: ""} */
      /* ], */
      /* rowData: [ */
      /*   {level: "1", model: "Celica", price: 35000}, */
      /*   {level: "2", model: "Mondeo", price: 32000}, */
      /*   {level: "3", model: "Boxter", price: 72000} */
      /* ] */
    }
  }

  componentDidMount() {
    this.props.toggleFooter(false)
    /* .then(result => result.json()) */
    /* .then(rowData => this.setState({rowData})) */
  }

  addLevel = levelCreate => e => {
    levelCreate({
      variables: {
        input: {
          id: this.props.course.id,
          courseId: this.props.level.courseId,
          level: 2,
          title: this.state.newTitle
        }
      }
    })
    // add level to db
    // after add query list again
  }

  onChange = e => {
    this.setState({
      newTitle: e.target.value
    })
  }

  /* onButtonClick = () => { */
  /*   const selectedNodes = this.gridApi.getSelectedNodes() */
  /*   const selectedData = selectedNodes.map(node => node.data) */
  /*   const selectedDataStringPresentation = selectedData */
  /*     .map(node => node.make + " " + node.model) */
  /*     .join(", ") */
  /*   alert(`Selected nodes: ${selectedDataStringPresentation}`) */
  /* } */

  render() {
    const {classes, course, level} = this.props
    const columns = [
      {
        Header: () => (
          <Typography className={classes.editHeader}>
            {this.props.level.level + 2}
          </Typography>
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Level</Typography>
            ),
            accessor: "level",
            Cell: row => (
              <Typography className={classes.level}>{row.value}</Typography>
            ),
            minWidth: 20
          }
        ]
      },
      {
        Header: () => (
          <TextField
            id="outlined-bare"
            className={classes.inputHeader}
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Title</Typography>
            ),
            accessor: "title",
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            )
          }
        ]
      },
      {
        Header: row => (
          <div>
            <Mutation
              mutation={levelCreate}
              update={(cache, {data: {levelCreate}}) => {
                console.log("DATA: ", levelCreate)
                try {
                  var gotLevels = cache.readQuery({
                    query: getLevels,
                    variables: {courseId: this.props.level.courseId}
                  })
                  var {levels} = gotLevels.getLevels
                  console.log("levels: ", levels)
                  cache.writeQuery({
                    query: getLevels,
                    variables: {courseId: this.props.level.courseId},
                    /* data.getLevels.levels[0] */
                    data: {
                      getLevels: {
                        levels: levels.concat([levelCreate])
                      }
                    }
                  })
                } catch (err) {
                  console.log("err: ", err)
                }
              }}>
              {(levelCreate, {data}) => (
                <div>
                  <Button
                    className={classes.addButton}
                    onClick={this.addLevel(levelCreate)}>
                    Add Level
                  </Button>
                </div>
              )}
            </Mutation>
          </div>
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Edit</Typography>
            ),
            id: "123",
            accessor: props => (
              <span className={classes.actions}>
                <IconButton
                  status="danger"
                  onClick={() => console.log("Pending Modal!")}>
                  <DeleteIcon />
                </IconButton>
              </span>
            ),
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            ),
            minWidth: 20
          }
        ],
        minWidth: 30
      }
    ]
    return (
      <Query
        query={getLevels}
        variables={{
          courseId: course.id
        }}>
        {({loading, error, data}) => {
          if (loading) {
            return <LoaderCircle />
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

          if (data.getLevels.levels[0]) {
            const level = data.getLevels.levels[0]
            this.props.loadData({level})
          }

          return (
            <Grid container direction="column">
              <Hero title="Levels" />
              <Grid item>
                <ReactTable
                  className="-striped -highlight"
                  data={data.getLevels.levels}
                  columns={columns}
                  pageSize={10}
                />
              </Grid>
              <Grid item style={{display: "flex", justifyContent: "center"}}>
                {/*  <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  onClick={this.onButtonClick}
                  size="large">
                  Save
                </Button> */}
              </Grid>
            </Grid>
          )
        }}
      </Query>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User, Course, Level} = session
  const userObj = User.all().toRefArray()
  const courseObj = Course.all().toRefArray()
  const levelObj = Level.all().toRefArray()
  var user = userObj[0]
  var course = courseObj[0]
  var level = levelObj[0]

  return {
    user,
    course,
    level
  }
}

export default connect(
  mapStateToProps,
  {toggleFooter, loadData}
)(withFormik({})(withStyles(styles)(Levels)))
