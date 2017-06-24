import React, {Component} from 'react'
import styled from 'styled-components'
import LoaderReg from '../../../components/Loaders/LoaderReg'

const Content = styled.section`
  display: flex;
  flex-direction: column;

  // global styles
  body, h1, h2, h3, h4, h6, li {
      color: #fff;
      font-family: sans-serif;
      font-size: 20px;
      box-sizing: border-box;
  }
  
  h1 {
      font-size: 8rem;
  }
  
  h2 {
      font-size: 7rem;
  }
  
  h3 {
      font-size: 6rem;
  }
  
  h4 {
      font-size: 5rem;
  }
  
  h5 {
      font-size: 4rem;
  }
  
  h6 {
      font-size: 3rem;
  }
  
  p, li, a {
    font-size: 1.5rem;
  }
`
// class ContainerMaster extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: true
//     }
//   }

//   render() {
//     var loading = this.state.loading
//     if (loading === false) {
//       return (
//         <Content>
//           <LoaderReg />
//         </Content>
//       )
//     } else {
//       return <Content />
//     }
//   }
// }

// export default ContainerMaster

export default Content
