/* eslint react-hooks/exhaustive-deps:0, no-plusplus:0, no-new:0, prefer-promise-reject-errors: 0 */
import React, {PureComponent} from "react"
import {withApollo} from "react-apollo"
import {session} from "brownies"

import Add from "@material-ui/icons/Add"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import {CircularProgress} from "@material-ui/core"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import {Formik} from "formik"
import {fade} from "@material-ui/core/styles/colorManipulator"
import FirstPage from "@material-ui/icons/FirstPage"
import Grid from "@material-ui/core/Grid"
import LastPage from "@material-ui/icons/LastPage"
import Paper from "@material-ui/core/Paper"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import MaterialTable, {MTableEditRow} from "material-table"
import {FormikMTInput} from "../../../components"

import {GET_BETA_TESTERS} from "../../../graphql/queries/user-queries.js"

const FavoriteIcon = () => <FavoriteBorder />

const OverlayOverride = props => {
  return (
    <div
      style={{
        display: "table",
        width: "100%",
        height: "100%",
        backgroundColor: fade(props.theme.palette.background.paper, 0.7)
      }}>
      <div
        style={{
          display: "table-cell",
          width: "100%",
          height: "100%",
          verticalAlign: "middle",
          textAlign: "center"
        }}>
        <CircularProgress />
      </div>
    </div>
  )
}

const MuiTableEditRow = ({onEditingApproved, ...props}) => {
  return (
    <Formik
      /* validationSchema={courseLevelSchema} */
      initialValues={props.data}
      onSubmit={values => {
        if (props.mode === "update") {
          delete values.tableData
        }
        if (props.mode === "add") {
          if (!props.data) {
            props.data = {}
          }
        }

        onEditingApproved(props.mode, values, props.data)
      }}
      render={({submitForm}) => (
        <MTableEditRow {...props} onEditingApproved={submitForm} />
      )}
    />
  )
}

import {styles} from "../styles.js"

class AdminBetaTesters extends PureComponent {
  state = {
    testers: []
  }

  componentDidMount() {
    this._isMounted = true
    this.props.client
      .query({
        query: GET_BETA_TESTERS,
        fetchPolicy: "no-cache"
      })
      .then(res => {
        console.log("res; ", res)
        session.betaTesters = res.data.getBetaTesters
        if (this._isMounted) {
          this.setState({
            testers: res.data.getBetaTesters
          })
        }
      })
      .catch(err => console.log("err: ", err))
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
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
                  ref={this.tableRef}
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
                    {title: "_id", field: "_id"},
                    {title: "ageGroup", field: "ageGroup"},
                    {title: "chosen", field: "chosen"},
                    {title: "country", field: "country"},
                    {title: "currentlyLearning", field: "currentlyLearning"},
                    {title: "dayLearningHrs", field: "dayLearningHrs"},
                    {title: "email", field: "email"},
                    {title: "firstName", field: "firstName"},
                    {title: "gender", field: "gender"},
                    {title: "howLongLearning", field: "howLongLearning"},
                    {title: "lastName", field: "lastName"},
                    {title: "languagesFluent", field: "languagesFluent"},
                    {title: "linkedIn", field: "linkedIn"},
                    {title: "nativeLang", field: "nativeLang"},
                    {title: "createdAt", field: "createdAt"},
                    {title: "updatedAt", field: "updatedAt"}
                  ]}
                  detailPanel={[
                    {
                      icon: FavoriteIcon,
                      openIcon: FavoriteIcon,
                      tooltip: "Show Description",
                      render: rowData => {
                        return (
                          <div
                            style={{
                              fontSize: 40,
                              padding: 20,
                              textAlign: "left"
                            }}>
                            {rowData.whyLearning}
                          </div>
                        )
                      }
                    }
                  ]}
                  components={{
                    EditRow: MuiTableEditRow,
                    EditField: FormikMTInput,
                    OverlayLoading: OverlayOverride
                  }}
                  data={this.state && this.state.testers}
                  options={{
                    actionsColumnIndex: -1,
                    pageSize: 5,
                    showTitle: false,
                    sorting: false,
                    rowStyle: x => {
                      if (x.tableData.id % 2) {
                        return {backgroundColor: "#f2f2f2"}
                      }
                    }
                  }}
                  editable={this.can}
                />
              </div>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(withApollo(AdminBetaTesters))
