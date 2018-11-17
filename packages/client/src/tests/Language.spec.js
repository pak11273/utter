import React from 'react'
import {Language} from '../components'
// import renderer from 'react-test-renderer' // not used
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

test('Language snapshot test', () => {
  const component = shallow.create(<Language />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
