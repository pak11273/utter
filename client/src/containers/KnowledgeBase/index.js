import React, {Component} from 'react'
import {
  Box,
  Button,
  Column,
  Img,
  Section,
  Text,
  TextArea
} from '../../components'
import '../../assets/css/sprites.css'

class KnowledgeBase extends Component {
  render() {
    return (
      <Section gridtemplatecolumns="1fr" padding="10px" width="88%">
        <Text fontsize="2rem" textalign="center">KnowledgeBase</Text>
        <Section
          border="1px solid black"
          borderradius="5px"
          gridtemplatecolumns="48% 2% 48%"
          margin="20px auto 20px"
          padding="10px"
          width="88%">
          <Box>
            <TextArea
              alignself="flex-start"
              border="none"
              focusoutline="none"
              placeholder="Text here"
              resize="none"
            />
            <Button alignself="flex-end" color="black" width="50px">
              Find
            </Button>
          </Box>
          <Box background="black" height="100%" margin="0 auto" width="1px" />
          <Box>
            <Text alignself="flex-start" textalign="left" width="100%">
              Translation
            </Text>
            <Box alignself="flex-end" className="sound_off" />
          </Box>
        </Section>
        <Section margin="20px 0 0 0" gridtemplatecolumns="1">
          <Column>
            <Text>Examples</Text>
            <Box>Hello</Box>
            <Box>play</Box>
          </Column>
          <Column>
            <Box>
              <Text>Phrases</Text>
            </Box>
          </Column>
        </Section>
      </Section>
    )
  }
}

export default KnowledgeBase
