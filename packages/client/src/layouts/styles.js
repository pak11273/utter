import homeMastheadImg from "../assets/images/home_header4.jpg"
import homeMastheadImgXs from "../assets/images/home_header4_xs.jpg"

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
  another: {
    color: "white",
    [theme.breakpoints.down("xs")]: {
      fontSize: "40px"
    }
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
  image: {
    width: 128,
    height: 128
  },
  level: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  "popup-content": {
    position: "fixed",
    background: "#f83d23",
    width: "100px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 6px #000",
    color: "#fff"
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
  masthead: {
    background: `url(${homeMastheadImg}) center/cover`,
    [theme.breakpoints.down("xs")]: {
      background: `url(${homeMastheadImgXs}) center/cover`,
      backgroundPositionX: "44%"
    }
  },
  mastSubText: {
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      color: "white"
    }
  },
  mastText: {
    [theme.breakpoints.up("md")]: {
      /* marginRight: "100px" */
    },
    [theme.breakpoints.up("lg")]: {
      /* marginRight: "200px" */
    }
  },
  root: {
    position: "relative",
    margin: "0 auto",
    width: "100%"
  },
  section_odd: {
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    margin: "10px auto 50px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column-reverse",
      height: "480px"
    }
  },
  section_odd_home: {
    flexDirection: "row",
    height: "450px",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    margin: "10px auto 50px",
    maxWidth: 1330,
    [`@media (max-width:770px)`]: {
      flexDirection: "column-reverse",
      height: "680px"
    }
  },
  section: {
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    margin: "10px auto 50px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column",
      height: "480px"
    }
  },
  section_home: {
    flexDirection: "row",
    height: "450px",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    margin: "10px auto 50px",
    maxWidth: 1330,
    [`@media (max-width:770px)`]: {
      flexDirection: "column",
      height: "680px"
    }
  },
  stay_informed: {
    flexDirection: "row",
    height: "450px",
    padding: theme.spacing.unit * 2,
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 900,
    marginTop: "120px",
    [`@media (max-width:770px)`]: {
      flexDirection: "column",
      height: "630px"
    }
  },
  social_section: {
    flexDirection: "row",
    height: "450px",
    /* justifyContent: "center", */
    padding: theme.spacing.unit * 2,
    /* margin: "10px auto 50px", */
    maxWidth: 1330,
    [`@media (max-width:770px)`]: {
      flexDirection: "column",
      height: "900px"
    }
  },
  section_text: {
    fontSize: "1.5em"
  },
  speak: {
    color: "rgb(206, 0, 0)",
    [theme.breakpoints.down("xs")]: {
      fontSize: "40px",
      fontWeight: 600
    }
  },
  text: {
    color: "black"
  }
})
