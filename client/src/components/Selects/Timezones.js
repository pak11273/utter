import React, {Component} from 'react'
import timezones from '../../data/timezones.js'

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

export default props =>
  <div>
    <select onChange={props.onChange} value={props.value} name={props.name}>
      {zones.map((zone, i) => {
        return <option key={i}>  {zone.name} {zone.value}</option>
      })}
    </select>
  </div>
