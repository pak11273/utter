import React, {Component} from 'react'
import {NavLink, Link, Route, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized'

import 'react-table/react-table.css'

import {Flex, Grid, Subtitle} from '../../../components'

// actions
import {toggleFooter} from '../../../actions/toggleFooterAction.js'
import {fetchTeachingList} from '../actions.js'

const StyledSubtitle = styled(Subtitle)`
  text-align: left;
  font-color: #2196f3;
  font-size: 1.2rem;
`
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
// Array of images with captions
const list = [
  {
    source:
      'https://static.intercomassets.com/avatars/1720537/square_128/blue-logo-no-text-2800-1515056703.png?1515056703',
    caption: 'hello world'
  }
]

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

function cellRenderer({index, key, parent, style}) {
  const datum = list[index]

  return (
    <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
      <div style={style}>
        <img
          src={datum.source}
          style={{
            height: datum.imageHeight,
            width: datum.imageWidth
          }}
        />
        <p>{datum.caption}</p>
      </div>
    </CellMeasurer>
  )
}

class Created extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    const currentCourse = this.props.courseReducer
    this.props.actions.fetchTeachingList(currentCourse)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  render() {
    return (
      <StyledGrid>
        <p>a list of my courses from redux</p>
        <p>list</p>
        <Grid gridarea="content">
          <Masonry
            style={{outline: 'none', padding: '100px'}}
            cellCount={list.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
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
