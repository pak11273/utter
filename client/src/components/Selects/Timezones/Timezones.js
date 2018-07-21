import React, {Component} from 'react'
import styled from 'styled-components'
import timezones from './data/timezones.js'

const Select = styled.select`
  font-size: 1.3rem;
  margin: 2rem;
  width: 300px;
`
const Option = styled.option`
  width: 5rem;
`

function flattenZones(arr) {
  const zones = arr.map(obj => {
    return obj.zones.map(obj => {
      return obj
    })
  })

  const flat = [].concat.apply([], zones)
  return flat
}

const zones = flattenZones(timezones)

export default props => (
  <div>
    <Select onChange={props.onChange} value={props.value} name={props.name}>
      {zones.map((zone, i) => {
        return (
          <Option key={i}>
            {' '}
            {zone.name} {zone.value}
          </Option>
        )
      })}
    </Select>
  </div>
)
