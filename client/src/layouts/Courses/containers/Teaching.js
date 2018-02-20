import React, {Component} from 'react'
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import {Box, Text} from '../../../components'
import styles from '../styles.css'

const DATA = {
  CITIES: [
    {label: 'hawaii', value: 1},
    {label: 'denver', value: 2},
    {label: 'canton', value: 3},
    {label: 'dallas', value: 4}
  ]
}

class Teaching extends Component {
  constructor() {
    super()

    this.state = {
      selectValue: ''
    }

    this.updateValue = this.updateValue.bind(this)
    this.optionRenderer = this.optionRenderer.bind(this)
  }

  getInitialState() {
    return {}
  }

  updateValue(newValue) {
    this.setState({
      selectValue: newValue
    })
  }

  optionRenderer({
    focusedOption,
    focusedOptionIndex,
    focusOption,
    key,
    labelKey,
    option,
    options,
    selectValue,
    style,
    valueArray,
    valueKey
  }) {
    const classNames = [styles.countryOption]
    if (option === focusedOption) {
      classNames.push(styles.countryOptionFocused)
    }
    if (valueArray.indexOf(option) >= 0) {
      classNames.push(styles.countryOptionSelected)
    }

    return (
      <div
        className={classNames.join(' ')}
        key={key}
        onClick={() => selectValue(option)}
        onMouseEnter={() => focusOption(option)}
        style={style}>
        <label className={styles.countryLabel}>{option.label}</label>
      </div>
    )
  }

  render() {
    var options = DATA.CITIES
    return (
      <VirtualizedSelect
        options={options}
        ref="citySelect"
        simpleValue
        clearable
        name="select-city"
        value={this.state.selectValue}
        onChange={this.updateValue}
        searchable
        labelKey="label"
        valueKey="value"
        optionRenderer={this.optionRenderer}
      />
    )
  }
}
export default Teaching
