import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Box, Ol, Text} from '../../components'
import superagent from 'superagent'

// actions
import {loadUtteredList, updateUtteredList} from './actions.js'

const UtteredList = props =>
  <Box alignitems="flex-start">
    <Ol fontsize="1rem" color="black">
      {props.utteredList.map((list, index) => {
        return <li>{list.native} {list.word}: {list.uttered}</li>
      })}
    </Ol>
  </Box>

class Uttered extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    superagent
      .get('/api/users/59ba886955d0041e7a4a854a')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }

        let results = res.body.utteredList

        if (!results) {
          results = []
        } else {
          this.props.action.loadUtteredList(results)
        }
      })
  }

  render() {
    return (
      <Box>
        <Box flexdirection="row" justifycontent="space-aroudn">
          <Text>Sort By: </Text>
          <select>
            <option>Room</option>
            <option>Self</option>
          </select>
        </Box>
        <Box flexdirection="row" justifycontent="space-aroudn">
          <Text>Sort By: </Text>
          <select>
            <option>words</option>
            <option>uttered</option>
          </select>
          <select>
            <option>Asc</option>
            <option>Desc</option>
          </select>
        </Box>
        <Box alignitems="flex-start">
          <UtteredList utteredList={this.props.reducer.utteredList} />
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    reducer: state.utteredReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators({loadUtteredList, updateUtteredList}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uttered)
