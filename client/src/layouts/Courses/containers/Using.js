import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import languageData from '../data/languageData.js'
import {Box} from '../../../components'
import '../styles.css'

class Using extends Component {
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
    this.props.addUsingLang(newValue)
  }

  render() {
    const options = languageData
    return (
      <Box width="250px">
        <Select
          id="state-select"
          ref={ref => {
            this.select = ref
          }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          options={options}
          required
          simpleValue
          clearable={this.state.clearable}
          wrapperStyle={{
            margin: '20px 0 0 0',
            width: '100%'
          }}
          style={{
            width: '100%'
          }}
          menuContainerStyle={{
            width: '100%'
          }}
          menuStyle={{
            width: '100%'
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

Using.propTypes = {
  label: PropTypes.string,
  searchable: PropTypes.bool
}

Using.defaultProps = {
  label: 'Language:',
  searchable: true
}

export default Using
