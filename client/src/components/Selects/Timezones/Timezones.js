import React from "react"
import styled from "styled-components"
import timezones from "./data/timezones.js"

const Select = styled.select`
  margin: 0 0 20px 0;
  width: 300px;
`
const Option = styled.option`
  font-size: 14px;
  width: 5rem;
`

function flattenZones(arr) {
  const zones = arr.map(obj => obj.zones.map(obj => obj))

  /* const flat = [].concat.apply([], zones) */
  const flat = [].concat(...zones)
  return flat
}

const zones = flattenZones(timezones)

export default ({onChange, value, name}) => (
  <Select onChange={onChange} value={value} name={name}>
    {zones.map((zone, i) => (
      <Option key={i}>
        {zone.name} {zone.value}
      </Option>
    ))}
  </Select>
)
