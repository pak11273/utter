import React, {Component} from 'react'
import NavbarReg from '../components/Navbars/NavbarReg'
import ContainerCenter from '../components/Containers/ContainerCenter'
import LoaderReg from '../components/Loaders/LoaderReg'
import LoaderDribble from '../components/Loaders/LoaderDribble'

const style = {
  body: {
    background: 'red'
  }
}

class HomePage extends Component {
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

export default HomePage
