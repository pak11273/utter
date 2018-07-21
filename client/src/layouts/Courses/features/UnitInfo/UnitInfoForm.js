import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown} from 'semantic-ui-react'

import {showColorPicker} from '../../../../components/ColorPicker/colorPickerActions.js'
import {getValueFromEvent} from '../../../../../src/utils/clientUtils'

import FormEditWrapper from '../../../../components/'
import {ColorPickerButton} from '../../../../components/ColorPicker/ColorPickerButton.js'

import {getEntitiesSession} from '../../../../api/entities/selectors.js'

import {selectCurrentUnitInfo} from '../UnitInfo/selectors.js'
import {updateUnitInfo, setUnitColor} from '../UnitInfo/actions.js'

const mapState = state => {
  const session = getEntitiesSession(state)
  const {Faction} = session
  const factions = Faction.all().toRefArray()
  // const unitInfo = selectCurrentUnitInfo(state)
  return {
    factions
    // unitInfo
  }
}

const actions = {
  updateUnitInfo,
  showColorPicker
}

class UnitInfoForm extends Component {
  // onAffiliationChanged = (e, result) => {
  //   const {name, value} = result

  //   const newValues = {[name]: value}
  //   this.props.updateUnitInfo(newValues)
  // }

  // onNameChanged = e => {
  //   const newValues = getValueFromEvent(e)
  //   this.props.updateUnitInfo(newValues)
  // }

  // onColorClicked = () => {
  //   const onColorPickedAction = setUnitColor()

  //   this.props.showColorPicker(this.props.unitInfo.color, onColorPickedAction)
  // }

  render() {
    // const {unitInfo, factions} = this.props
    // const isDisplayingUnit = Boolean(unitInfo)
    // let name = '',
    //   affiliation = null,
    //   color = null

    // if (isDisplayingUnit) {
    //   ;({name, affiliation, color} = unitInfo)
    // }

    // const displayFactions = factions.map(faction => {
    //   return {
    //     value: faction.id,
    //     text: faction.name
    //   }
    // })

    return <Form size="large" />
  }
}

{
  /*<Form.Field name="name">
          <label>Unit Name</label>
          <FormEditWrapper
            singleValue={true}
            value={{name}}
            onChange={this.onNameChanged}
            passIsEditing={false}>
            <input
              placeholder="Name"
              name="name"
              disabled={!isDisplayingUnit}
            />
          </FormEditWrapper>
        </Form.Field>
        <Form.Group>
          <Form.Field name="affiliation" width={12}>
            <label>Affiliation</label>
            <Dropdown
              name="affiliation"
              selection
              options={displayFactions}
              value={affiliation}
              disabled={!isDisplayingUnit}
              onChange={this.onAffiliationChanged}
            />
          </Form.Field>
          <Form.Field name="color">
            <label>Color</label>
            <ColorPickerButton
              value={color}
              disabled={!isDisplayingUnit}
              onClick={this.onColorClicked}
            />
          </Form.Field>
        </Form.Group>*/
}
export default connect(mapState, actions)(UnitInfoForm)
