const drawerWidth = 240

export const styles = theme => ({
  card: {
    minHeight: "240px",
    display: "flex",
    flexDirection: "column"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardUsername: {
    whiteSpace: "nowrap",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: "100%"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  editButton: {
    color: "white",
    backgroundColor: "#ff7f7e",
    "&:hover": {
      backgroundColor: "#c56564"
    }
  },
  errorClass: {
    boxShadow: `0px 0px 2px 1px ${theme.palette.error.main}`,
    backgroundColor: "white"
  },
  errors: {
    color: theme.palette.error.main
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  gridActions: {
    display: "flex",
    justifyContent: "space-between"
  },
  gridTitle: {
    height: "40px",
    lineHeight: "1em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word"
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
    padding: "0 24px "
  },
  heroUnit: {
    /* backgroundColor: theme.palette.background.paper */
  },
  heroContent: {
    margin: "0 auto",
    padding: `${theme.spacing.unit * 16}px 0 0 0`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  inputHeader: {
    background: "white",
    minHeight: "40px"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1240 + theme.spacing.unit * 3 * 2)]: {
      width: 1240,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  root: {
    alignItems: "flex-start",
    flexDirection: "row",
    display: "flex",
    flexGrow: 1,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  searchField: {
    marginTop: "7px"
  },
  showMore: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    webkitTransform: "translateX(-50%)",
    transform: "translateX(-50%)"
  }
})
