import React, {Component} from 'react'
import styled from 'styled-components'
import NavbarRegView from '../components/Navbars/NavbarReg/NavbarRegView'
import MastheadRegView from '../components/Mastheads/MastheadReg/MastheadRegView'
import ContainerMaster from '../components/Containers/ContainerMaster'
import LoaderReg from '../components/Loaders/LoaderReg'
import SectionRegView from '../components/Sections/SectionReg/SectionRegView'
import SectionMediaLeftView from '../components/Sections/SectionMediaLeftView/SectionMediaLeftView'
import ButtonRegView from '../components/Buttons/ButtonReg/ButtonRegView'

const Content = styled.section`
`
class HomePage extends Component {
  render() {
    return (
      <div>
        <NavbarRegView
          logo="Utter"
          list={['Educators', 'Businesses', 'About', 'Contact', 'Spectate']}
        />
        <ContainerMaster>
          <MastheadRegView
            title="Utter"
            subtitle="Speak another language"
            caption="Have a conversation"
          />
          <SectionRegView
            title="Still can't speak two sentences?"
            info="A proven method"
            cta="">
            <Content>
              <h3>Check out these guys</h3>
              <ul>
                <li>
                  Been through years of language classes
                  with no success?
                </li>
                <li>
                  Got the usual 4 to 5 apps but things are
                  just goinjg too slow?
                </li>
                <li>
                  Want to really have a conversation in
                  another language?
                </li>
                <li>
                  Tired of bothering 'NATIVE' speakers, the
                  few who want to train you?
                </li>
                <li>What? You scared?</li>
              </ul>
            </Content>
          </SectionRegView>
          <SectionMediaLeftView
            title="Still can't speak two sentences?"
            info="A proven method"
            cta="">
            <Content>
              <h1>another section</h1>
            </Content>
          </SectionMediaLeftView>
          <SectionRegView>
            <Content>
              <h1>another section</h1>
              <ul>
                <li>You'll get learn how to speak fluently</li>
                <li>You'll understand and conversate</li>
                <li>Learn to speak like a native</li>
                <li>Keep track of your progress</li>
                <li>
                  Make friends, learn to speak with other
                  learners
                </li>
              </ul>
            </Content>
          </SectionRegView>
          <SectionRegView>
            <Content>
              <h1>another section</h1>
              <ul>
                <li>
                  No money? Get sponspored: by school,
                  parent, mentor or friend
                </li>
                <li>Become a sponsor</li>
              </ul>
            </Content>
          </SectionRegView>
        </ContainerMaster>
      </div>
    )
  }
}

export default HomePage
