import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Button} from 'semantic-ui-react'

import {LEVEL_RANKS} from '../../../api/levels/types.js'

const RANKS = LEVEL_RANKS.map(rank => ({value: rank, text: rank}))

const SKILL_VALUES = [
  {value: 0, text: 0},
  {value: 1, text: 1},
  {value: 2, text: 2},
  {value: 3, text: 3},
  {value: 4, text: 4},
  {value: 5, text: 5},
  {value: 6, text: 6},
  {value: 7, text: 7},
  {value: 8, text: 8}
]

const LevelDetails = (level = {title: 'blha'}) => {
  console.log('level: ', level)
  const {title = '', rank = ''} = level
  return (
    <Form size="large">
      <Form.Field name="title" width={16}>
        <label>Name</label>
        <input placeholder="Name" value={name} />
      </Form.Field>
      <Form.Field name="rank" width={16}>
        <label>Rank</label>
        <Dropdown fluid selection options={RANKS} value={rank} />
      </Form.Field>
    </Form>
  )
}

export default LevelDetails
