import React, {Component} from 'react'
import styled from 'styled-components'
// const img = require('../../../assets/images/bg1.jpg')

const Section = styled.div`
  background: url("https://www.imtj.com/sites/default/files/asset/travel%2C%20tourism%2C%20city%2C%20landmarks_1.jpg");
  margin: 0 auto;
  height: 500px;
  width: 800px;
  background-size: cover;
`
const MediaImgView = () =>
  <Section>
    <h1>Media Img View</h1>
  </Section>

export default MediaImgView
