import React from "react"
import styled from "styled-components"
import timezones from "./data/timezones.js"
import {FormikSelect} from "../../index.js"

/* const Select = styled.select` */
/*   margin: 0 0 20px 0; */
/*   width: 300px; */
/* ` */
const Option = styled.option`
  font-size: 14px;
  width: 5rem;
`

function flattenZones(arr) {
  const zones = arr.map(obj => obj.zones.map(obj => obj))

  const flat = [].concat(...zones)
  return flat
}

const zones = flattenZones(timezones)

export default ({onChange, value, name}) => (
  <FormikSelect onChange={onChange} value={value} name={name}>
    <Option key="America/New_York" selected="selected">
      New York (Eastern) America/New_York
    </Option>
    {zones.map(zone => {
      return (
        <div>
          <Option key={zone.name}>
            {zone.name} {zone.value}
          </Option>
        </div>
      )
    })}
  </FormikSelect>
)
