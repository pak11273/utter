import React, {Component} from 'react'
import styled from 'styled-components'
import Container from '../../containers/Container'
import {Box, Section, Subtitle, Title} from '../../components'

const ProfileContainer = styled(Container)`
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  width: 100%;
`
ProfileContainer.defaultProps = {}

function Profile(props) {
  return (
    <ProfileContainer>
      <Box background="blue" color="black">
        {' '}
        One
      </Box>
      <Box background="red" color="black">
        Two
      </Box>
      <Box background="green" color="black">
        Three
      </Box>
      <Box background="papayawhip" color="black">
        Four{' '}
      </Box>
      <Box background="peru" color="black">
        Five
      </Box>
      <Box background="blue" color="black">
        {' '}
        One
      </Box>
      <Box background="red" color="black">
        Two
      </Box>
      <Box background="green" color="black">
        Three
      </Box>
      <Box background="papayawhip" color="black">
        Four{' '}
      </Box>
      <Box background="peru" color="black">
        Five
      </Box>
    </ProfileContainer>
  )
}

export default Profile
