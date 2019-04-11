/* eslint react-hooks/exhaustive-deps:0 */
import React, {useEffect, useState} from "react"
/* import {useQuery} from "react-apollo-hooks" */
import {withApollo} from "react-apollo"
import {session} from "brownies"

import Add from "@material-ui/icons/Add"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import FirstPage from "@material-ui/icons/FirstPage"
import Grid from "@material-ui/core/Grid"
import LastPage from "@material-ui/icons/LastPage"
import Paper from "@material-ui/core/Paper"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import MaterialTable from "material-table"
import {GET_LEVELS, LEVEL_CREATE, LEVEL_DELETE, LEVEL_UPDATE} from "../xhr.js"
import {styles} from "../styles.js"

const LevelsUpdate = props => {
  const [state, changeState] = useState({
    data: []
  })
  const {classes} = props

  var {course, levels, user} = session

  if (user.username === course.owner.username) {
    var can = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("reject: ", reject)
            const {data} = state
            data.push(newData)
            changeState({...state, data})
            resolve(newData)
          }, 1000)
        })
          .then(res => {
            props.client.mutate({
              mutation: LEVEL_CREATE,
              variables: {
                courseId: course._id,
                level: +res.level,
                title: res.title
              }
            })
            levels.push(res)
            session.levels = levels
          })
          .catch(err => console.log("err: ", err)),
      onRowUpdate: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("reject: ", reject)
            var {data} = state

            const index = data.findIndex(x => x._id === newData._id)
            data[index] = newData
            changeState({...state, data})
            resolve(newData)
          }, 1000)
        })
          .then(res => {
            props.client.mutate({
              mutation: LEVEL_UPDATE,
              variables: {
                _id: res._id,
                level: +res.level,
                title: res.title
              }
            })
          })
          .catch(err => console.log("err: ", err)),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          console.log("reject: ", reject)
          const {data} = state
          const index = data.indexOf(oldData)
          data.splice(index, 1)
          changeState({...state, data})
          resolve(oldData)
        })
          .then(res => {
            props.client.mutate({
              mutation: LEVEL_DELETE,
              variables: {
                _id: res._id
              }
            })
            console.log("old Data: ", oldData)
            const index = levels.findIndex(x => x._id === oldData._id)
            levels[index] = oldData
            levels.splice(index, 1)
            changeState({...state, levels})
          })
          .catch(err => console.log("err: ", err))
    }
  } else {
    can = {}
  }

  const handleSubmit = () => {}

  /* const {data, error, loading} = useQuery(GET_LEVELS, { */
  /*   variables: { */
  /*     courseId: course._id */
  /*   } */
  /* }) */

  useEffect(() => {
    props.client
      .query({
        query: GET_LEVELS,
        variables: {
          courseId: course._id
        }
      })
      .then(res => {
        session.levels = res.data.getLevels.levels
        changeState({
          ...state,
          data: res.data.getLevels.levels
        })
      })
      .catch(err => console.log("err: ", err))
  }, [])
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid
        className={classes.hero}
        container
        justify="center"
        direction="column">
        <Paper className={classes.header} elevation={1}>
          <Typography
            className={classes.headerBody}
            variant="h4"
            align="center"
            gutterBottom>
            Course Levels
          </Typography>
        </Paper>
      </Grid>
      <main className={classes.content}>
        <Grid container spacing={24}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          />
          <Grid item xs={12} align="center">
            <div style={{maxWidth: "100%"}}>
              <MaterialTable
                /* components={{ */
                /*   Actions: props => { */
                /*     const arr = [] */
                /*     if (props.data) { */
                /*       arr.push(props.data) */
                /*     } */
                /*     return <div>{console.log("props: ", arr)}</div> */
                /*   } */
                /* }} */
                icons={{
                  Add: () => <Add />,
                  Check: () => <Check />,
                  Clear: () => <Clear />,
                  ResetSearch: () => <Clear />,
                  Delete: () => <Delete />,
                  Edit: () => <Edit />,
                  FirstPage: () => <FirstPage />,
                  LastPage: () => <LastPage />,
                  NextPage: () => <ChevronRight />,
                  PreviousPage: () => <ChevronLeft />,
                  Search: () => <Search />
                }}
                columns={[
                  {
                    title: "level",
                    readonly: true,
                    render: rowData => rowData && rowData.tableData.id + 1
                  },
                  {
                    title: "id",
                    render: rowData => rowData && rowData._id
                  },
                  {title: "title", field: "title"}
                ]}
                data={state.data}
                options={{
                  actionsColumnIndex: -1,
                  pageSize: 10,
                  showTitle: false,
                  sorting: false,
                  rowStyle: x => {
                    if (x.tableData.id % 2) {
                      return {backgroundColor: "#f2f2f2"}
                    }
                  }
                }}
                editable={can}
              />
              {console.log("this: ")}
            </div>
          </Grid>
        </Grid>
      </main>
    </form>
  )
}

export default withApollo(withStyles(styles)(LevelsUpdate))
