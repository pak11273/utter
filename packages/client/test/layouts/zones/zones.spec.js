import React from "react"
import {shallow} from "enzyme"
import {expect} from "chai"
import Zones from "../../../src/layouts/zones/containers/zones.js"

const wrapper = shallow(<Zones />)

describe("(Component) Zones", () => {
  it("renders without exploding", () => {
    expect(wrapper).to.have.lengthOf(1)
  })
})
