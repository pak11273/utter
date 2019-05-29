import React, {Component} from "react"
/* import {NavLink} from "react-router-dom" */
import Link from "@material-ui/core/Link"
import {Link as RouterLink} from "react-router-dom"
import classNames from "classnames"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import styled from "styled-components"

/* import {togglefooter} from "../../../core/actions/toggle-footer-action.js" */

const StyledFooter = styled.section`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  border: ${props => props.border};
  border-radius: ${props => props.borderradius};
  box-sizing: ${props => props.borderbox};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  flex-wrap: ${props => props.flexwrap};
  font-size: ${props => props.fontsize};
  grid-area: ${props => props.gridarea};
  grid-column: ${props => props.gridcolumn};
  grid-row: ${props => props.gridrow};
  grid-template-areas: ${props => props.gridtemplateareas};
  grid-template-columns: ${props => props.gridtemplatecolumns};
  height: ${props => props.height};
  li {
    font-size: ${props => props.lifontsize};
  }
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  max-height: ${props => props.maxheight};
  min-height: ${props => props.minheight};
  max-width: ${props => props.maxwidth};
  min-width: ${props => props.minwidth};
  opacity: ${props => props.opacity};
  overflow: ${props => props.overflow};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
  padding: ${props => props.padding};
  position: ${props => props.position};
  width: ${props => props.width};
  z-index: ${props => props.zindex};

  @media (min-width: 375px) {
    flex-direction: ${props => props.flexdirection375};
    height: ${props => props.height375};
    width: ${props => props.width375};
    min-width: ${props => props.width375};
  }

  @media (min-width: 768px) {
    flex-direction: ${props => props.flexdirection768};
    height: ${props => props.height768};
    width: ${props => props.width768};
  }

  @media (min-width: 960px) {
    flex-direction: ${props => props.flexdirection960};
    height: ${props => props.height960};
    width: ${props => props.width960};
    max-width: ${props => props.maxwidth960};
  }

  @media (min-width: 1024px) {
    flex-direction: ${props => props.flexdirection1024};
    height: ${props => props.height1024};
    width: ${props => props.width1024};
  }
`
StyledFooter.defaultProps = {
  background: "rgb(27, 28, 29)",
  boxsizing: "border-box",
  color: "white",
  display: "grid",
  fontsize: "1rem",
  zindex: 1,
  padding: "0 0 300px 0"
}

const styles = theme => ({
  layout: {
    /* backgroundColor: "rgb(27, 28, 29)", */
    color: "white",
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  fontPrimary: {
    color: "white"
  },
  fontSecondary: {
    "&:hover": {
      color: theme.palette.primary.light
    }
  },
  footer: {
    marginTop: theme.spacing.unit * 6,
    padding: `${theme.spacing.unit * 6}px 0`
  },
  navHover: {
    color: "green",
    "&hover": {
      color: "green"
    }
  }
})

const footers = [
  {
    title: "Company",
    /* description: ["About Us", "Contact"] */
    description: ["Community", "Pricing", "Contact"]
  },
  {
    title: "Features",
    /* description: ["Apps", "Learning Platform", "Social Learning"] */
    description: [""]
  },
  {
    title: "Resources",
    /* description: ["FAQ", "Blog"] */
    description: [""]
  },
  {
    title: "Legal",
    /* description: ["Privacy policy", "Terms of use"] */
    description: [""]
  }
]

class Footer extends Component {
  render() {
    const {classes} = this.props
    var MainFooter = (
      <StyledFooter {...this.props}>
        <footer className={classNames(classes.footer, classes.layout)}>
          <Grid container spacing={32} justify="space-evenly">
            {footers.map((footer, i) => (
              <Grid item xs key={footer.title}>
                <Typography
                  className={classes.fontPrimary}
                  variant="h6"
                  gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => {
                  var newStr = item.replace(/\s+/g, "-")
                  var link = "/" + newStr.toLowerCase()
                  /* switch (item) {
                    case "About Us":
                      link = "/about"
                      break
                    case "Blog":
                      link = "https://medium.com"
                      break
                    default:
                  } */
                  return (
                    <Link
                      component={RouterLink}
                      key={item}
                      className={classes.navHover}
                      to={`${link}`}>
                      <Typography
                        /* key={link} */
                        key={i}
                        variant="subtitle1"
                        color="primary"
                        className={classes.fontSecondary}>
                        {item}
                      </Typography>
                    </Link>
                  )
                })}
              </Grid>
            ))}
          </Grid>
        </footer>
      </StyledFooter>
    )
    return MainFooter
  }
}

export default withStyles(styles)(Footer)
