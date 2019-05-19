import styled from "styled-components"
import {Span} from "../../components"

const drawerWidth = 172
const leftdrawerWidth = 172
const rightdrawerWidth = 172

export const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  card2: {
    height: "370px",
    maxWidth: "300px",
    minWidth: "200px",
    display: "flex",
    flexDirection: "column"
  },
  card: {
    backgroundColor: "red",
    minHeight: "240px",
    maxHeight: "240px",
    display: "flex",
    flexDirection: "column"
  },
  cardDescription: {
    height: "70px",
    lineHeight: "1em",
    overflow: "auto",
    wordBreak: "break-all"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
    width: "100% !important"
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardContent: {
    flexGrow: 1
  },
  cardTitle: {
    height: "54px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  cardTitle2: {
    height: "52px",
    lineHeight: "1.2em",
    overflow: "hidden",
    wordBreak: "break-word"
  },
  cardUsername: {
    whiteSpace: "nowrap",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  closeArrow: {
    display: "flex",
    margin: "0 auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerLeftOpen: {
    width: leftdrawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerLeftClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 7 + 1
    }
  },
  drawerRightOpen: {
    width: rightdrawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerRightClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 7 + 1
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  heading: {
    color: "white"
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroUnitZoneCreate: {
    backgroundColor: "#502bae"
  },
  heroContentZoneCreate: {
    maxWidth: 960,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px ${theme
      .spacing.unit * 6}px`
  },
  heroContent: {
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
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
  rightDrawerText: {
    paddingTop: "10px"
  },
  root: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexGrow: 1,
    width: "100%"
  },
  rootZoneCreate: {
    maxWidth: 960,
    margin: "0 auto"
  },
  saveButton: {
    margin: "50px"
  },
  select: {
    width: "80% !important",
    margin: "10px auto !important"
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
    transform: "translateX(-50%)",
    whiteSpace: "nowrap"
  },
  subHeading: {
    color: "black",
    marginTop: "40px",
    position: "relative"
  }
})

export const DisplayCount = styled.div`
  font-size: 0.8rem;
  position: absolute;
  right: 2%;
  top: 6px;

  @media (min-width: 330px) {
    right: 10%;
  }

  @media (min-width: 640px) {
    right: 2%;
  }

  @media (min-width: 740px) {
    right: 10%;
  }
`

export const StyledSpan = styled(Span)`
  display: none;
  font-size: 0.6rem;
  padding: 0 0 0 10px;

  @media (min-width: 640px) {
    display: ${props => props.display640};
  }
`
