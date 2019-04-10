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
/* import Remove from "@material-ui/icons/Remove" */
/* import SaveAlt from "@material-ui/icons/SaveAlt" */
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
/* import ViewColumn from "@material-ui/icons/ViewColumn" */
import {withStyles} from "@material-ui/core/styles"

import MaterialTable from "material-table"
import {GET_LEVELS, LEVEL_CREATE, LEVEL_DELETE, LEVEL_UPDATE} from "../xhr.js"
import {styles} from "../styles.js"

const LevelsUpdate = props => {
  const [state, changeState] = useState({
    data: []
  })

  const {course} = session
  const {classes} = props

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
                icons={{
                  Add: () => <Add />,
                  Check: () => <Check />,
                  Clear: () => <Clear />,
                  ResetSearch: () => <Clear />,
                  Delete: () => <Delete />,
                  Edit: () => <Edit />,
                  /* Export: () => <SaveAlt />, */
                  FirstPage: () => <FirstPage />,
                  LastPage: () => <LastPage />,
                  NextPage: () => <ChevronRight />,
                  PreviousPage: () => <ChevronLeft />,
                  Search: () => <Search />
                  /* ThirdStateCheck: () => <Remove /> */
                  /* ViewColumn: () => <ViewColumn />, */
                  /* DetailPanel: () => <ChevronRight /> */
                }}
                columns={[
                  {
                    title: "level",
                    readonly: true,
                    render: rowData => rowData.tableData.id + 1
                  },
                  /* {title: "level", field: "level", readonly: true}, */
                  {title: "title", field: "title"}
                ]}
                data={state.data}
                actions={
                  [
                    /* { */
                    /*   icon: () => <Check />, */
                    /*   tooltip: "Edit Level" */
                    /*   onClick: (event, rowData) => { */
                    /*     alert("Accept level: " + rowData.level) */
                    /*   } */
                    /* } */
                    /* rowData => ({ */
                    /*   icon: () => <Delete />, */
                    /*   tooltip: "Delete Level", */
                    /*   disabled: rowData.birthYear >= 2000, */
                    /*   onClick: (event, rowData) => { */
                    /*     alert("Delete level: " + rowData.level) */
                    /*   } */
                    /* }) */
                  ]
                }
                options={{
                  actionsColumnIndex: -1,
                  pageSize: 10,
                  showTitle: false,
                  sorting: false
                  /* rowStyle: x => { */
                  /*   if (x.level % 2) { */
                  /*     return {backgroundColor: "#f2f2f2"} */
                  /*   } */
                  /* } */
                }}
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        console.log("resolve: ", resolve)
                        console.log("reject: ", reject)
                        const {data} = state
                        data.push(newData)
                        changeState({...state, data})
                        resolve(newData)
                      }, 1000)
                    })
                      .then(res => {
                        console.log("res: ", res)
                        props.client.mutate({
                          mutation: LEVEL_CREATE,
                          variables: {
                            courseId: course._id,
                            level: +res.level,
                            title: res.title
                          }
                        })
                      })
                      .catch(err => console.log("err: ", err)),
                  onRowUpdate: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        console.log("reject: ", reject)
                        console.log("newData: ", newData)
                        var {data} = state

                        const index = data.findIndex(x => x._id === newData._id)
                        data[index] = newData
                        console.log("data: ", data)
                        changeState({...state, data})
                        /* data.push(newData) */
                        /* changeState({...state, data}) */
                        resolve(newData)
                      }, 1000)
                    })
                      .then(res => {
                        console.log("res: ", res)
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
                      setTimeout(() => {
                        console.log("reject: ", reject)
                        const {data} = state
                        const index = data.indexOf(oldData)
                        data.splice(index, 1)
                        changeState({...state, data})
                        resolve(oldData)
                      }, 1000)
                    })
                      .then(res => {
                        props.client.mutate({
                          mutation: LEVEL_DELETE,
                          variables: {
                            _id: res._id
                          }
                        })
                      })
                      .catch(err => console.log("err: ", err))
                }}
              />
            </div>
          </Grid>
        </Grid>
      </main>
    </form>
  )
}

export default withApollo(withStyles(styles)(LevelsUpdate))
