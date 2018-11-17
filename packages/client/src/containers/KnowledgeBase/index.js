import React, {Component} from 'react'
// import {Grid as VirtualGrid} from 'react-virtualized'
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
  cellRenderer = ({columnIndex, key, rowIndex, style}) => {
    var list = [
      ['hello', 'anyeonhaseyo', 'play>'],
      ['hello', 'anyeong', 'play>']
    ]
    return (
      <div key={key} style={style}>
        {list[rowIndex][columnIndex]}
      </div>
    )
  }

  render() {
    var list = [
      ['hello', 'anyeonhaseyo', 'play>'],
      ['hello', 'anyeong', 'play>']
    ]
    return (
      <Section gridtemplatecolumns="1fr" padding="10px" width="88%">
        <Text fontsize="2rem" textalign="center">
          KnowledgeBase
        </Text>
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
            {/*            <VirtualGrid
              cellRenderer={this.cellRenderer}
              columnCount={list[0].length}
              columnWidth={100}
              height={300}
              rowCount={list.length}
              rowHeight={30}
              width={400}
            />
            */}
            <h1>nah</h1>
          </Column>
        </Section>
      </Section>
    )
  }
}

export default KnowledgeBase
