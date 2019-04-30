const drawerWidth = 240

export const styles = theme => ({
  appBar: {
    position: "relative"
  },
  billingHeroUnit: {
    backgroundColor: "#2bae3a"
  },
  billingHeroContent: {
    maxWidth: 960,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px ${theme
      .spacing.unit * 6}px`
  },
  masthead: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  billingRoot: {
    maxWidth: 960,
    margin: "0 auto"
  },
  heading: {
    color: "black"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: "30px"
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  list: {
    margin: "0 auto"
  },
  settingsContent: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto",
    width: "100%"
  },
  subHeading: {
    color: "black",
    marginTop: "40px",
    position: "relative"
  },
  root: {
    display: "flex"
  }
})
