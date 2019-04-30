import Enzyme from 'enzyme';
import Adaptor from 'enzyme-adaptor-react-16';

Enzyme.configure({
	adaptor: new Adaptor()
})

import React from "react"
import {shallow} from "enzyme"
import Courses from "../containers/courses.js"

const wrapper = shallow(<Courses />)

describe("(Component) Courses", () => {
  it("renders without exploding", () => {
    expect(wrapper).to.have.length(1)
  })
})
