import React, {Component} from 'react'
import {NavLink, Link, Route, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import 'react-virtualized/styles.css'

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized'

import {Flex, Grid, Subtitle} from '../../../components'

// actions
import {toggleFooter} from '../../../actions/toggleFooterAction.js'
import {fetchTeachingList} from '../actions.js'

const StyledGrid = styled(Grid)`
  grid-template-columns: 100%;
  grid-template-areas: 'content';

  min-height: 600px;

  @media (min-width: 640px) {
    grid-template-areas: 'sidebar content';
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: green;
  }
`

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true
})

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10
})

class Created extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.list = props.courseReducer.TeachingCourseList

    this._cellRenderer = this._cellRenderer.bind(this)
  }

  componentDidMount() {
    // this.props.actions.toggleFooter(false)
    const currentCourse = this.props.courseReducer
    this.props.actions.fetchTeachingList(currentCourse)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  _cellRenderer({index, key, parent, style}) {
    const datum = this.list[index]

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <img
            src={datum.source}
            style={{
              height: 100,
              width: 100
            }}
          />
          <p>{datum.courseName}</p>
        </div>
      </CellMeasurer>
    )
  }

  render() {
    return (
      <StyledGrid>
        <Grid gridarea="content">
          <Masonry
            style={{outline: 'none', padding: '100px'}}
            cellCount={this.list.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={this._cellRenderer}
            height={600}
            width={800}
          />
        </Grid>
      </StyledGrid>
    )
  }
}

const mapStateToProps = state => {
  return {
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchTeachingList,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Created))
