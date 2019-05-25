import React from "react"
import Button from "@material-ui/core/Button"
import {
  Box,
  Column,
  Line,
  Section,
  Subtitle,
  Text,
  Title,
  Wrapper
} from "../components"

import {Masthead} from "../containers"

// images
import busyPeopleImg from "../assets/images/busy-people2.jpg"

function Home() {
  return (
    <Wrapper>
      <Masthead background="url('https://previews.123rf.com/images/nyul/nyul1408/nyul140800216/31077944-Corporate-people-chatting-at-business-office-lobby-Standing-gesturing-arms-crossed-arms-on-hip-confi-Stock-Photo.jpg') no-repeat center top">
        <Column maxwidth="960px">
          <Title>Sponsorship</Title>
        </Column>
      </Masthead>
      <Section>
        <Column maxwidth="960px">
          <Subtitle>
            Get sponsored. If you are lacking funds or would like someone to
            support you in your endeavor to learn a new language then you can
            get help here. Browse through our list of sponsors who are looking
            to support eager learners. First make a profile and write a letter
            describing your desire to learn a new language. Browse through
            specific sponsors and apply to them. If you already know who your
            sponsor is then just type in the name.
          </Subtitle>
          <Button>Looking for Sponsors</Button>
          <Subtitle>
            {" "}
            Anyone can be a sponsor. Parents, Teachers, Businesses, Schools,
            Government Institutions, etc. When you become a sponsor you will be
            ablel to monitor your sponsorees activities and their progress. If a
            sponsoree is not actively using the program, you can automatically
            drop them from sponsorship. Special discounts for applied to the
            amount of sponsorees a sponsor has. Ask for details.
          </Subtitle>
          <Button>Become a Sponsor</Button>
        </Column>
      </Section>
      <Section
        height="800px"
        background={`url(${busyPeopleImg}) no-repeat center/cover`}>
        <Column maxwidth="960px">
          <Box>
            <Text color="white" fontsize="3rem">
              Great for countries to help promote their culture.
            </Text>
            <Line />
            <Text color="white" fontsize="3rem">
              Great for schools to help foster their language learning programs.
            </Text>
            <Line />
            <Text color="white" fontsize="3rem">
              Great for parents to help their child learn their mother tongue.
            </Text>
          </Box>
        </Column>
      </Section>
    </Wrapper>
  )
}

export default Home
