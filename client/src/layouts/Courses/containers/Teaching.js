import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import languageData from '../data/languageData'
import {Box} from '../../../components'
import '../styles.css'

class Teaching extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: 'TeachingField',
      disabled: false,
      searchable: props.searchable,
      selectValue: '',
      clearable: true,
      rtl: false
    }

    this.clearValue = this.clearValue.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  clearValue(e) {
    this.select.setInputValue('')
  }

  updateValue(newValue) {
    this.setState({
      selectValue: newValue
    })
    // redux
    console.log(this.props)
    this.props.addTeachingLang(newValue)
  }

  render() {
    const options = languageData
    return (
      <Box width="250px">
        <Select
          id="language-select"
          ref={ref => {
            this.select = ref
          }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          required
          autoFocus
          options={options}
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
          name="selected-language"
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
  label: 'Languages:',
  searchable: true
}

export default Teaching
