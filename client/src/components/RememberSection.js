import React, {Component} from 'react'
import {Section, Box, Subtitle, List, ListItem} from '../components'

function RememberSection(props) {
  const {height, list} = props
  return (
    <Section height={height} maxwidth="1024px" style={{minHeight: '600px'}}>
      <Box padding="40px">
        <Subtitle>
          Things to Remember
        </Subtitle>
        <List>
          {list.map((item, i) => {
            {
              return (
                <ListItem fontsize="1.3rem" padding="10px 0 0 0">
                  {item}
                </ListItem>
              )
            }
          })}
        </List>
      </Box>
    </Section>
  )
}

export default RememberSection
