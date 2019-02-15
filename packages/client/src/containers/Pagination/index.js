import React, {Component} from "react"
import {connect} from "react-redux"

import Grid from "@material-ui/core/Grid"

/* import {Flex, Box, Text} from "../../components" */

// selectors
/* import {selectCourseProp} from "./selectors.js" */

// actions
/* import {paginateRequest} from "./actions.js" */

class PaginationContainer extends Component {
  state = {
    collection: "",
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    totalPages: 10
  }

  handleCheckboxChange = (e, {checked, name}) =>
    this.setState({[name]: checked})

  handleInputChange = (e, {name, value}) => this.setState({[name]: value})

  handlePaginationChange = (e, {activePage}) => {
    this.setState({activePage}, () => console.log("active: ", this.state))
    console.log("props: ", this.props)
  }

  render() {
    /* const { */
    /* activePage */
    /* boundaryRange, */
    /* siblingRange, */
    /* showEllipsis, */
    /* showFirstAndLastNav, */
    /* showPreviousAndNextNav, */
    /* totalPages */
    /* } = this.state */

    /* const parentState = this.props */

    return (
      <Grid>
        <Grid>
          {/* <Pagination
            activePage={activePage}
            boundaryRange={boundaryRange}
            onPageChange={this.handlePaginationChange}
            size="mini"
            siblingRange={siblingRange}
            totalPages={totalPages}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={showEllipsis ? undefined : null}
            firstItem={showFirstAndLastNav ? undefined : null}
            lastItem={showFirstAndLastNav ? undefined : null}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
            state={parentState}
          /> */}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = () => {
  // const getCourseProp = selectCourseProp()
  // return (state, props) => getCourseProp(state, props)
  return {}
}

export default connect(mapStateToProps)(PaginationContainer)
