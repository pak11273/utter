const TabBar = () => "trash?"
import {selectCurrentTab} from "./selectors.js"

const mapStateToProps = state => {
  const currentTab = selectCurrentTab(state)

  return {currentTab}
}

export default TabBar
