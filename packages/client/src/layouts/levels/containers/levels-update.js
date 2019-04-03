import React, {useState} from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"

import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
/* import ListItem from "@material-ui/core/ListItem" */
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* components */
import {LevelDeleteModal} from "../components"
import {Can, Hero, LoaderCircle} from "../../../components"

import {session} from "brownies"
import {Mutation, Query} from "react-apollo"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"

import {levelSchema} from "@utterzone/common"
import {styles} from "../styles.js"

import {getLevels, levelCreate} from "../xhr.js"

const Levels = props => {
  const [state, handleChange] = useState({
    courseId: "",
    formErrors: {
      errors: []
    },
    modalLevel: "",
    modalTitle: "",
    openDeleteModal: false,
    title: "",
    level: ""
  })

  const {course, user} = session

  /* handleChange({ */
  /*   ...state, */
  /*   courseId: course._id */
  /* }) */

  const addLevel = levelCreate => async e => {
    e.preventDefault()

    // reset errors
    /* const resetErrors = handleChange({ */
    /*   ...state, */
    /*   formErrors: { */
    /*     errors: {$set: []} */
    /*   } */
    /* }) */

    await levelSchema.validate(state).catch(() => {
      if (e) {
        handleChange({
          ...state,
          formErrors: {$set: e}
        })
      }
    })

    // mutate if no errors
    if (isEmpty(state.formErrors.errors)) {
      levelCreate({
        variables: {
          input: {
            level: state.level,
            title: state.title
          }
        }
      })
    }

    // reset state
    /* const labelState = handleChange({ */
    /*   ...state, */
    /*   openDeleteModal: {$set: false}, */
    /*   title: {$set: ""}, */
    /*   level: {$set: ""} */
    /* }) */
  }

  const onChange = e => {
    if (e.target.name === "level") {
      handleChange({
        ...state,
        [e.target.name]: Number(e.target.value)
      })
    } else {
      handleChange({
        ...state,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleDelete = row => () => {
    handleChange({
      ...state,
      openDeleteModal: true,
      modalLevel: row.original.level,
      modalTitle: row.original.title
    })
  }

  const closeDeleteModal = () => {
    handleChange({
      ...state,
      openDeleteModal: false
    })
  }

  /* const deleteLevel = DELETE_LEVEL => e => { */
  /*   e.preventDefault() */

  /*   if (isEmpty(state.formErrors.errors)) { */
  /*     DELETE_LEVEL({ */
  /*       variables: { */
  /*         input: { */
  /*           level: state.level */
  /*         } */
  /*       } */
  /*     }) */
  /*   } */

  // reset state
  /* const labelState = update(state, { */
  /*   title: {$set: ""}, */
  /*   level: {$set: ""} */
  /* }) */
  /* setState(labelState) */
  /* } */

  const {classes} = props
  const levelError = classNames({
    errorClass:
      state.formErrors.path === "level" && !isEmpty(state.formErrors.errors)
  })

  const titleError = classNames({
    errorClass:
      state.formErrors.path === "title" && !isEmpty(state.formErrors.errors)
  })

  /* const formErrors = state.formErrors.errors.map((error, i) => { */
  /*   return ( */
  /*     <ListItem key={i}> */
  /*       <Typography className={classes.errors}>{error}</Typography> */
  /*     </ListItem> */
  /*   ) */
  /* }) */

  const columns = [
    {
      Header: () => (
        <Can
          roles={user.roles}
          perform="course:update-levels"
          id={user.username}
          matchingID={course.owner.username}
          yes={() => (
            <TextField
              align="center"
              className={`${classes[levelError]} ${classes.inputHeader}`}
              fullWidth
              id="outlined-bare"
              margin="normal"
              name="level"
              onChange={onChange}
              placeholder="Add a level number here."
              value={state.level}
              variant="outlined"
            />
          )}
          no={() => null}
        />
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
          minWidth: 60,
          maxWidth: 80
        }
      ]
    },
    {
      Header: () => (
        <Can
          roles={user.roles}
          perform="course:update-levels"
          id={user.username}
          matchingID={course.owner.username}
          yes={() => (
            <TextField
              className={`${classes[titleError]} ${classes.inputHeader}`}
              fullWidth
              id="outlined-bare"
              margin="normal"
              name="title"
              onChange={onChange}
              placeholder="And it's title here."
              value={state.title}
              variant="outlined"
            />
          )}
          no={() => null}
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
      Header: () => (
        <div className={classes.addButton}>
          <Mutation
            mutation={levelCreate}
            update={(cache, {data: {levelCreate}}) => {
              try {
                var gotLevels = cache.readQuery({
                  query: getLevels,
                  variables: {courseId: course._id}
                })
                var {levels} = gotLevels.getLevels
                cache.writeQuery({
                  query: getLevels,
                  variables: {
                    courseId: course._id
                  },
                  data: {
                    getLevels: {
                      levels: levels.concat([levelCreate.level])
                    }
                  }
                })
              } catch (err) {
                console.log("err: ", err)
              }
            }}>
            {(levelCreate, {loading}) => {
              return loading ? (
                <CircularProgress />
              ) : (
                <Can
                  roles={user.roles}
                  perform="course:update-levels"
                  id={user.username}
                  matchingID={course.owner.username}
                  yes={() => (
                    <Button type="submit" onClick={addLevel(levelCreate)}>
                      Add Level
                    </Button>
                  )}
                  no={() => null}
                />
              )
            }}
          </Mutation>
        </div>
      ),
      columns: [
        {
          Header: () => (
            <Can
              roles={user.roles}
              perform="course:update-levels"
              id={user.username}
              matchingID={course.owner.username}
              yes={() => (
                <Typography className={classes.header}>Edit</Typography>
              )}
              no={() => null}
            />
          ),
          Cell: row => (
            <Can
              roles={user.roles}
              perform="course:update-levels"
              id={user.username}
              matchingID={course.owner.username}
              yes={() => (
                <LevelDeleteModal
                  row={row}
                  {...state}
                  closeDeleteModal={closeDeleteModal}
                  handleDelete={handleDelete}
                />
              )}
              no={() => null}
            />
          ),
          minWidth: 90,
          maxWidth: 100
        }
      ],
      minWidth: 30
    }
  ]

  return (
    <Query
      errorPolicy="all"
      query={getLevels}
      variables={{
        courseId: course._id
      }}>
      {({loading, error, data, formErrors}) => {
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

        if (!isEmpty(data.getLevels.levels)) {
          console.log("data: ", data.getLevels.levels)
        }

        return (
          <Grid container direction="column">
            <Hero title="Levels" />
            <List>{formErrors}</List>
            <Grid item>
              <ReactTable
                getTheadThProps={() => {
                  return {style: {outline: 0, textAlign: "left"}}
                }}
                getTheadGroupThProps={() => {
                  return {
                    style: {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      margin: "30px auto",
                      outline: 0,
                      whiteSpace: "inherit"
                    }
                  }
                }}
                className="-striped -highlight"
                data={data.getLevels.levels}
                columns={columns}
                defaultPageSize={10}
              />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Levels)
