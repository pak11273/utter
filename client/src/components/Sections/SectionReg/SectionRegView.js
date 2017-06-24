import React from 'react'
import styled from 'styled-components'
import MediaImgView from '../../Medias/MediaImg/MediaImgView'

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: orange;
  h2 {
    text-align: center;
  }
`
const SectionRegView = ({title, info, cta}) =>
  <Section>
    <MediaImgView />
    <h2>{title}</h2>
    <h4>{info}</h4>
    <h5>{cta}</h5>
  </Section>

export default SectionRegView
