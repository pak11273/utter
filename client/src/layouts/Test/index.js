import React, {Component} from 'react'
import {Reactables, Header} from 'gigatables-react'

class Test extends Component {
  constructor() {
    super()
  }
  render() {
    var settings = {
      struct: {
        // all in
        download: {
          csv: false
        },
        search: ['top', 'bottom'],
        rowsSelector: ['asc', 'top', 'bottom'],
        pagination: ['bottom']
      },
      ajax: '/wtf',
      columns: [
        {data: 'id'},
        {data: 'desc'},
        {data: 'title'},
        {data: 'date'},
        {data: 'types'},
        {data: 'info'}
      ]
    }
    return (
      <Reactables settings={settings}>
        <Header data="id">ID</Header>
        <Header data="title">Name</Header>
        <Header data="desc">Description</Header>
        <Header data="date">Date</Header>
        <Header data="info">Info</Header>
        <Header data="field2">Field123 but data from field2</Header>
        <Header data="field1">Field1</Header>
        <Header data="field3">Field3 invisible</Header>
        <Header>Field3 invisible</Header>
      </Reactables>
    )
  }
}

export default Test
