import React, {Component} from 'react'
import {connect} from 'react-redux'

import TabBar from './TabBar'
import {selectCurrentTab} from './selectors.js'
import {selectTab} from './actions'

const mapStateToProps = state => {
  const currentTab = selectCurrentTab(state)

  return {currentTab}
}

const actions = {onTabClick: selectTab}

export default connect(mapStateToProps, actions)(TabBar)
// export default class TabBarContainer extends Component {
//   constructor(props) {
//     super(props)

//     const {tabs = [{name: null}]} = props

//     const firstTab = tabs[0]

//     this.state = {
//       currentTab: firstTab.name
//     }
//   }

//   onTabClick = name => {
//     this.setState({currentTab: name})
//   }

//   render() {
//     const {tabs, ...otherProps} = this.props
//     const {currentTab} = this.state

//     return (
//       <TabBar
//         {...otherProps}
//         currentTab={currentTab}
//         onTabClick={this.onTabClick}
//         tabs={tabs}
//       />
//     )
//   }
// }
