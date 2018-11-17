import React, {Component} from 'react'

const mapStateToProps = state => ({
  unitInfo: selectUnitInfo(state)
})

class Clubs extends Component {
  render() {
    const {unitInfo} = this.props
    const {name, affiliation} = unitInfo

    return (
      <Segment attached="bottom">
        <Form size="large">
          <Form.Field name="name" width={6}>
            <label>Unit Name</label>
            <input placeholder="Name" value={name} />
          </Form.Field>
          <Form.Field name="affiliation" width={6}>
            <label>Affiliation</label>
            <Dropdown selection options={FACTIONS} value={affiliation} />
          </Form.Field>
        </Form>
      </Segment>
    )
  }
}

export default connect(mapStateToProps)(Clubs)
