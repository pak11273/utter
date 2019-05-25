import red from "@material-ui/core/colors/red"

export const styles = theme => ({
  appTitle: {
    color: "white",
    padding: "15px 15px 0 0"
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px auto 30px",
    maxWidth: 412,
    minHeight: 370
  },
  cardActions: {
    display: "flex",
    justifyContent: "center"
  },
  cardContent: {
    flexGrow: 1
  },
  cardMedia: {
    /* paddingTop: "56.25%", // 16:9 */
    paddingTop: "46.25%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardTitle: {
    height: "100%"
  },
  loadingCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px",
    maxWidth: 532,
    minHeight: 370
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  randomCard: {
    alignItems: "center",
    justifyContent: "center",
    margin: "30px auto 30px",
    maxWidth: 412,
    minHeight: 370
  },
  root: {
    backgroundColor: "#3e3e3e",
    minHeight: 509,
    minWidth: 320
  }
})
