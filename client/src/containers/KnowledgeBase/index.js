import React, {Component} from 'react'
import {Box, Button, Column, Section, Text, TextArea} from '../../components'

class KnowledgeBase extends Component {
  render() {
    return (
      <Section gridtemplatecolumns="1fr" padding="10px" width="88%">
        <Section
          border="1px solid black"
          borderradius="5px"
          gridtemplatecolumns="48% 2% 48%"
          padding="10px 20px"
          width="88%">
          <Box>
            <TextArea border="none" placeholder="Text here" resize="none" />
            <Button alignself="flex-end" color="black" width="50px">
              Find
            </Button>
          </Box>
          <Box background="black" height="100%" margin="0 auto" width="1px" />
          <Box>
            <TextArea border="none" placeholder="Translation" resize="none" />
            <Button alignself="flex-end" color="black" width="50px">
              Play
            </Button>
          </Box>
        </Section>
        <Section margin="20px 0 0 0" gridtemplatecolumns="1">
          <Column>
            <Text>Definitions</Text>
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
