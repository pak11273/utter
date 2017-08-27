import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Button, Select, Title, Subtitle, Wrapper} from '../components'
import {Masthead} from '../containers'

class LanguageDetails extends Component {
  render() {
    const {name, description, levels} = this.props.language
    const languageNames = this.props.languages.map(item => {
      return item.name
    })
    return (
      <Wrapper>
        <Masthead bg="green">
          <Title>{name}</Title>
          <Subtitle>{description}</Subtitle>
          <Subtitle>Levels: {levels}</Subtitle>
          <Subtitle>Choose your native tongue?</Subtitle>
          <Select fontsize="2rem" color="black" margin="20px">
            {languageNames.map(item => {
              if (item != name) {
                return <option>{item} Speakers</option>
              }
            })}
          </Select>
          <Link to="/getting-started">
            <Button
              color="black"
              fontsize="2rem"
              margin="20px"
              width="140px"
              height="50px">
              Enroll
            </Button>
          </Link>
        </Masthead>
      </Wrapper>
    )
  }
}

export default LanguageDetails
