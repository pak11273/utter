import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

import {
  Column,
  Masthead,
  Subtitle,
  Text,
  Title,
  Section,
  Wrapper
} from '../../components'

function KoreanLevel3(props) {
  return (
    <Wrapper>
      <Masthead
        background="#666"
        height="450px"
        height768="300px"
        padding="30px"
        textalign="left">
        <Title color="white" fontsize="2rem">
          Level Three - Two Letter Syllables
        </Title>
        <Subtitle color="#bbb" fontsize="1.5rem">
          Combining letters to form syllables
        </Subtitle>
      </Masthead>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="175px"
        height960="200px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Column>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              Rules
            </Subtitle>
            <Text>Constructing syllables</Text>
            <Text>Syllables are constructed of either 2, 3 or 4 letters</Text>
            <Text>Must always start with a consonant</Text>
            <Text>
              Vowels always go in the middle of three letter syllable
            </Text>
            <Text>
              Vowels always go in the second position of four letter syllable
            </Text>
          </Column>
        </Column>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="175px"
        height960="200px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Column>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              Construction
            </Subtitle>
            <Text>Either triangle formation or vertical formation</Text>
            <Text>Which formation depends on the vowel</Text>
            <Text>
              a, i, ya, yae, e, ye, ae, eo, and yeo use the triangle formation
            </Text>
            <Text>eu, u, o, yo, and yu use vertical formation</Text>
          </Column>
        </Column>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="175px"
        height960="100px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Column>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left"
          />
          <Subtitle color="#333" padding="15px">
            Grammar
          </Subtitle>
        </Column>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="20px"
        height960="20px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Subtitle color="#333" padding="15px">
          Vocabulary
        </Subtitle>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="375px"
        height960="300px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Column>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              b + vowels
            </Subtitle>
            <Text>bo</Text>
            <Text>bu </Text>
            <Text>beo </Text>
            <Text>beu </Text>
            <Text>ba </Text>
            <Text>bae </Text>
            <Text>be </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              j + vowels
            </Subtitle>
            <Text>jo </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              g + vowels
            </Subtitle>
            <Text>go </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              g + vowels
            </Subtitle>
            <Text>go </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              s + vowels
            </Subtitle>
            <Text>so </Text>
          </Column>
        </Column>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="275px"
        height960="200px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              m + vowels
            </Subtitle>
            <Text>mo </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              n + vowels
            </Subtitle>
            <Text>no </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              ng + vowels
            </Subtitle>
            <Text>ngo </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              r + vowels
            </Subtitle>
            <Text>ro </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              h + vowels
            </Subtitle>
            <Text>ho </Text>
          </Column>
        </Column>
        <Column>
          <Column
            justifycontent="flex-start"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle color="#333" padding="15px">
              r + vowels
            </Subtitle>
            <Text>ho </Text>
          </Column>
        </Column>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="175px"
        height960="100px"
        maxwidth="960px"
        padding="30px"
        textalign="left">
        <Column>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left"
          />
          <Subtitle color="#333" padding="15px">
            Phrases
          </Subtitle>
        </Column>
      </Section>
      <Section
        alignitems="flex-start"
        flexdirection960="row"
        height="175px"
        height960="900px"
        maxwidth="960px"
        padding="30px"
        textalign="left"
      />
    </Wrapper>
  )
}

export default KoreanLevel3
