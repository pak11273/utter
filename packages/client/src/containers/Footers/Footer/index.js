import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Container, Grid, Header, List, Segment} from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import styled from "styled-components"

import {toggleFooter} from "../../../app/actions/toggle-footer-action.js"

const StyledFooter = styled.section`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  border: ${props => props.border};
  border-radius: ${props => props.borderradius};
  box-sizing: ${props => props.borderbox};
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
  boxsizing: "border-box",
  color: "black",
  display: "grid",
  fontsize: "1rem"
}

class Footer extends Component {
  componentDidMount() {
    // this.props.actions.toggleFooter()
  }

  render() {
    const {toggleFooterReducer} = this.props
    if (toggleFooterReducer.toggle) {
      var MainFooter = (
        <StyledFooter {...this.props}>
          <Segment inverted vertical style={{padding: "5em 0em"}}>
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="About" />
                    <List link inverted>
                      <List.Item as="a">Contact Us</List.Item>
                      <List.Item as="a">Pending</List.Item>
                      <List.Item as="a">Pending</List.Item>
                      <List.Item as="a">Pending</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="Services" />
                    <List link inverted>
                      <List.Item as="a">Pending</List.Item>
                      <List.Item as="a">FAQ</List.Item>
                      <List.Item as="a">Blog</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Header as="h4" inverted>
                      Footer Header
                    </Header>
                    <p>
                      Extra space for a call to action inside the footer that
                      could help re-engage users.
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </StyledFooter>
      )
    } else {
      MainFooter = <div />
    }
    return MainFooter
  }
}

const mapStateToProps = state => {
  return {
    toggleFooterReducer: state.toggleFooterReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        toggleFooter
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
