import React from 'react'
import styled from 'styled-components'
import {Box, Section, Subtitle, Text} from '../../../components'

const Info = ({info, subtitle}) =>
  <Section display="flex" minheight="600px" maxwidth="1024px">
    <Box padding="0 40px">
      <Subtitle>
        {subtitle}
      </Subtitle>
      <Text fontsize="1.5rem" margin="10px 0 0 0">
        {info}
      </Text>
    </Box>
  </Section>

export default Info
