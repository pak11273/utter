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
    margin: "30px auto 0",
    marginBottom: 30,
    maxWidth: 600
  },
  cardActions: {
    display: "flex",
    justifyContent: "center"
  },
  cardMedia: {
    /* paddingTop: "56.25%", // 16:9 */
    paddingTop: "46.25%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardContent: {
    flexGrow: 1
  },
  cardTitle: {
    height: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  root: {
    backgroundColor: "#3e3e3e"
  }
})
