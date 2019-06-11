/* eslint react-hooks/exhaustive-deps:0, no-plusplus:0, no-new:0, prefer-promise-reject-errors: 0 */
import React, {PureComponent} from "react"
import {withApollo} from "react-apollo"
/* import {session} from "brownies" */

import Add from "@material-ui/icons/Add"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import {CircularProgress} from "@material-ui/core"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
/* import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown" */
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
import makeTrashable from "trashable"
import {FormikMTInput} from "../../../components"

import {GET_USERS} from "../../../graphql/queries/user-queries.js"
import {USER_UPDATE} from "../../../graphql/mutations/user-mutations.js"

/* const KeyboardArrowDownIcon = () => <KeyboardArrowDown /> */

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
      /* validationSchema={betaTestersSchema} */
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

class Users extends PureComponent {
  state = {
    users: []
  }

  componentDidMount() {
    this._isMounted = true
    this.props.client
      .query({
        query: GET_USERS,
        fetchPolicy: "no-cache",
        variables: {
          page: 1
        }
      })
      .then(res => {
        console.log("res; ", res)
        if (this._isMounted) {
          this.setState({
            users: res.data.getUsers.users
          })
        }
      })
      .catch(err => console.log("err: ", err))

    this.can = {
      onRowUpdate: (newData, oldData) => {
        const update = new Promise(async resolve => {
          const {users} = this.state
          const index = users.indexOf(oldData)
          users[index] = newData
          setTimeout(() => {
            this.setState({users})
            resolve()
          }, 1000)
          const data = await this.props.client.mutate({
            mutation: USER_UPDATE,
            variables: {
              _id: newData._id,
              country: newData.country,
              email: newData.email,
              firstName: newData.firstName,
              gender: newData.gender,
              lastName: newData.lastName,
              linkedIn: newData.linkedIn,
              nativeLang: newData.nativeLang
            }
          })
          this.setState({
            users: data.userUpdate
          })
        })

        this._updateTrash = makeTrashable(update)
        return update
      }
    }
  }

  componentWillUnmount = () => {
    this._updateTrash && this._updateTrash.trash()
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
              Users
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
                    {
                      title: "_id",
                      field: "_id",
                      readonly: true
                    },
                    {title: "username", field: "username"},
                    {title: "email", field: "email"},
                    {title: "avatar", field: "avatar"},
                    {
                      title: "blocked",
                      field: "blocked",
                      lookup: {
                        true: "true",
                        false: "false"
                      }
                    },
                    {title: "confirmed", field: "confirmed"},
                    {
                      title: "forgotPasswordLocked",
                      field: "forgotPasswordLocked"
                    },
                    {title: "gender", field: "gender"},
                    {title: "firstName", field: "firstName"},
                    {title: "isCanceled", field: "isCanceled"},
                    {title: "roles", field: "roles"},
                    {title: "stripeId", field: "stripeId"},
                    {title: "rights", field: "rights"},
                    {
                      title: "createdAt",
                      field: "createdAt",
                      readonly: true
                    },
                    {
                      title: "updatedAt",
                      field: "updatedAt",
                      readonly: true
                    }
                  ]}
                  /* detailPanel={[ */
                  /*   { */
                  /*     icon: KeyboardArrowDownIcon, */
                  /*     openIcon: KeyboardArrowDownIcon, */
                  /*     tooltip: "Bio Description", */
                  /*     render: rowData => { */
                  /*       return ( */
                  /*         <div */
                  /*           style={{ */
                  /*             fontSize: 40, */
                  /*             padding: 20, */
                  /*             textAlign: "left" */
                  /*           }}> */
                  /*           {rowData.bio} */
                  /*         </div> */
                  /*       ) */
                  /*     } */
                  /*   } */
                  /* ]} */
                  components={{
                    EditRow: MuiTableEditRow,
                    EditField: FormikMTInput,
                    OverlayLoading: OverlayOverride
                  }}
                  data={this.state && this.state.users}
                  options={{
                    actionsColumnIndex: -1,
                    pageSize: 20,
                    showTitle: false,
                    sorting: true,
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

export default withStyles(styles)(withApollo(Users))
