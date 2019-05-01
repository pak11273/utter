import React from "react"
import {shallow} from "enzyme"
import {expect} from "chai"
import Courses from "../../../src/layouts/courses/containers/courses.js"

const wrapper = shallow(<Courses />)

describe("(Component) Courses", () => {
  it("renders without exploding", () => {
    expect(wrapper).to.have.lengthOf(1)
  })
})
