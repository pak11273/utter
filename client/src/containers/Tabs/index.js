import React, {Component} from 'react'
import {connect} from 'react-redux'

import TabBar from './TabBar'

import {selectCurrentTab} from './selectors.js'
import {selectTab} from './actions.js'

const mapState = state => {
  const currentTab = selectCurrentTab(state)

  return {currentTab}
}

const actions = {onTabClick: selectTab}

export default connect(mapState, actions)(TabBar)
