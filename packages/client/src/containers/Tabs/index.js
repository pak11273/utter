import {connect} from "react-redux"

const TabBar = () => "trash?"
import {selectCurrentTab} from "./selectors.js"
import {selectTab} from "./actions"

const mapStateToProps = state => {
  const currentTab = selectCurrentTab(state)

  return {currentTab}
}

const actions = {onTabClick: selectTab}

export default connect(
  mapStateToProps,
  actions
)(TabBar)
