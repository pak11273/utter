export const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  addButton: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center"
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
  errorClass: {
    boxShadow: `0px 0px 2px 1px ${theme.palette.error.main}`,
    backgroundColor: "white"
  },
  errors: {
    color: theme.palette.error.main
  },
  formControl: {
    fontSize: 30
  },
  genderHeader: {
    justifyContent: "center"
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
    minHeight: "40px"
  },
  root: {
    maxWidth: 900,
    margin: "0 auto"
  },
  text: {
    color: "white"
  }
})
