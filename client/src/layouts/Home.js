import React, {Component} from 'react'
import styled from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper'
import Masthead from '../containers/Mastheads/Masthead'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import CTA from '../components/Buttons/CTA.js'
import Section from '../containers/Sections/Section.js'
import Img from '../components/Medias/Img'

class Home extends Component {
  render(props) {
    return (
      <Wrapper>
        <Masthead background="url('https://previews.123rf.com/images/nyul/nyul1408/nyul140800216/31077944-Corporate-people-chatting-at-business-office-lobby-Standing-gesturing-arms-crossed-arms-on-hip-confi-Stock-Photo.jpg') no-repeat center top">
          <Title>
            Speak another language
          </Title>
          <Subtitle>This actually works!</Subtitle>
          <CTA color="black">Learn More</CTA>
        </Masthead>
        <Section>
          <Title>Pains</Title>
          <ul>
            <li>Native speakers are hard to comeby.</li>
            <li>Not all native speakers are good teachers/mentors/tutors.</li>
            <li>
              Learned for years in highschool or college but can't speak one
              sentence beyond hi and bye
            </li>
            <li>
              It hurts when you try and speak and you are made fun of, or you
              feel stupid when you say it wrong
            </li>
            <li>No meetups nearby to practice</li>
          </ul>
        </Section>
        <Section>
          <Title>Solutions</Title>
          <ul>
            <li>
              We have native speakers on staff that help create and review our
              material
            </li>
            <li>
              We know how the brain operates and how you can retain what you
              learned.
            </li>
            <li>You will learn the 1000 most spoken words in conversation</li>
            <li>
              You will be learning with peers. Meaning you will be speaking with
              people who are at your level.
            </li>
            <li>
              We have a policy where no one makes fun of others. If you do, you
              will be banned
            </li>
            <li>
              You don't need a meetup. If you have internet access you can start
              practicing with people all over the world.
            </li>
          </ul>
        </Section>
        <Section>
          <Title>Other Features</Title>
          <ul>
            <li>A flashcard system that will help build your vocabulary</li>
            <li>
              You will have tracked progress. A scheduler. A system that lets
              you know where your weak areas are.
            </li>
          </ul>
        </Section>
        <Section>
          <Title>Get Sponsored</Title>
          <Title>Become a Sponsor</Title>
        </Section>
      </Wrapper>
    )
  }
}

export default Home
