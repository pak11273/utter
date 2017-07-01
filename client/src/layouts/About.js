import React, {Component} from 'react'
import NavbarReg from '../containers/Navbars/NavbarReg'
import ContainerCenter from '../containers/Containers/ContainerCenter'
import LoaderReg from '../containers/Loaders/LoaderReg'
import LoaderDribble from '../containers/Loaders/LoaderDribble'

class About extends Component {
  render() {
    return (
      <div style={style.body}>
        <NavbarReg />
        <ContainerCenter>
          <LoaderReg speed={3000} text="fallas" />
        </ContainerCenter>
      </div>
    )
  }
}

export default About
