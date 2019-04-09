const drawerWidth = 240

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
  content: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing.unit * 3
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
    fontSize: "30px",
    textAlign: "center"
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
  headerBody: {
    padding: "40px"
  },
  hero: {
    padding: " 0 24px "
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  inputHeader: {
    background: "white",
    minHeight: "40px"
  },
  list: {
    margin: "0 auto"
  },
  root: {
    margin: "0 auto",
    width: "100%"
  },
  text: {
    color: "white"
  }
})
