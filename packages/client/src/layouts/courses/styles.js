export const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  errorClass: {
    boxShadow: `0px 0px 2px 1px ${theme.palette.error.main}`,
    backgroundColor: "white"
  },
  errors: {
    color: theme.palette.error.main
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  inputHeader: {
    background: "white",
    minHeight: "40px"
  },
  root: {
    maxWidth: 900,
    margin: "0 auto"
  }
})
