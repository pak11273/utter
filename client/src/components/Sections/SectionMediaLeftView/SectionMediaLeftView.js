import React from 'react'
import styled from 'styled-components'
import MediaImgView from '../../Medias/MediaImg/MediaImgView'

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: orange;
`
const SectionLeft = styled.div`
  align-items: center;
`

const SectionRight = styled.div`
  align-items: center;
`

const SectionMediaLeftView = ({title, info, cta}) =>
  <Section>
    <SectionLeft>
      <MediaImgView />
    </SectionLeft>
    <SectionRight>
      <h2>{title}</h2>
      <h4>{info}</h4>
      <h5>{cta}</h5>
    </SectionRight>
  </Section>

export default SectionMediaLeftView
