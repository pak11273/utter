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
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import Grid from "@material-ui/core/Grid"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import ViewColumn from "@material-ui/icons/ViewColumn"
import {withStyles} from "@material-ui/core/styles"

import MaterialTable from "material-table"
import {GET_LEVELS} from "../xhr.js"
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
        changeState({
          ...state,
          data: res.data.getLevels.levels
        })
      })
      .catch(err => console.log("err: ", err))
  }, [])

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Grid container justify="center" direction="column">
            <Typography variant="h4" align="center" gutterBottom>
              Course Levels
            </Typography>
          </Grid>
        </div>
      </div>
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
                  Export: () => <SaveAlt />,
                  Filter: () => <FilterList />,
                  FirstPage: () => <FirstPage />,
                  LastPage: () => <LastPage />,
                  NextPage: () => <ChevronRight />,
                  PreviousPage: () => <ChevronLeft />,
                  Search: () => <Search />,
                  ThirdStateCheck: () => <Remove />,
                  ViewColumn: () => <ViewColumn />,
                  DetailPanel: () => <ChevronRight />
                }}
                columns={[
                  {title: "level", field: "level"},
                  {title: "title", field: "title"}
                ]}
                data={state.data}
                actions={[
                  {
                    icon: () => <Check />,
                    tooltip: "Edit Level",
                    onClick: (event, rowData) => {
                      alert("Accept level: " + rowData.level)
                    }
                  },
                  rowData => ({
                    icon: () => <Delete />,
                    tooltip: "Delete Level",
                    disabled: rowData.birthYear >= 2000,
                    onClick: (event, rowData) => {
                      alert("Delete level: " + rowData.level)
                    }
                  })
                ]}
                options={{
                  actionsColumnIndex: -1,
                  pageSize: 10,
                  showTitle: false
                }}
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        console.log("reject: ", reject)
                        const {data} = state
                        data.push(newData)
                        changeState({...state, data})
                        resolve(state.data)
                      }, 1000)
                    })
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
