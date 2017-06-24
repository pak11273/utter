import React, {Component} from 'react'
import styled from 'styled-components'
import SectionRegView from './SectionRegView'

const Example = styled.div`
  background: orange;
  height: 300px;
  width: 100%;
`

class SectionReg extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Example />
      </div>
    )
  }
}

export default SectionReg
