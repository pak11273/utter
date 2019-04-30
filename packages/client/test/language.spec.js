import React from "react"
import {shallow} from "enzyme"
import Courses from "../src/layouts/courses/containers/courses.js"

const wrapper = shallow(<Courses />)

describe("(Component) Courses", () => {
  it("renders without exploding", () => {
    expect(wrapper).to.have.length(1)
  })
})
