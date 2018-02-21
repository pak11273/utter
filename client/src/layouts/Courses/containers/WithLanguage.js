import React, {Component} from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'
import STATES from '../data/states'
import {Box} from '../../../components'
import '../styles.css'

class Teaching extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: 'StatesField',
      country: 'AU',
      disabled: false,
      searchable: props.searchable,
      selectValue: '',
      clearable: true,
      rtl: false
    }

    this.clearValue = this.clearValue.bind(this)
    this.switchCountry = this.switchCountry.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  clearValue(e) {
    this.select.setInputValue('')
  }

  switchCountry(e) {
    constnewCountry = e.target.value
    this.setState({
      country: newCountry,
      selectValue: null
    })
  }

  updateValue(newValue) {
    this.setState({
      selectValue: newValue
    })
  }

  render() {
    const options = STATES[this.state.country]
    return (
      <Box className="section" position="absolute" top="20px" right="30px">
        <Select
          id="state-select"
          ref={ref => {
            this.select = ref
          }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus
          options={options}
          simpleValue
          clearable={this.state.clearable}
          style={{
            width: '250px'
          }}
          menuContainerStyle={{
            width: '250px'
          }}
          menuStyle={{
            width: '250px'
          }}
          name="selected-state"
          disabled={this.state.disabled}
          value={this.state.selectValue}
          onChange={this.updateValue}
          rtl={this.state.rtl}
          searchable={this.state.searchable}
        />
      </Box>
    )
  }
}

Teaching.propTypes = {
  label: PropTypes.string,
  searchable: PropTypes.bool
}

Teaching.defaultProps = {
  label: 'States:',
  searchable: true
}

export default Teaching
