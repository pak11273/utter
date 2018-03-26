import React, {Component} from 'react'

function Features(props) {
  return (
    <Section>
      <h1>This roadmap is reviewed on a monthly basis</h1>
      <h2>This app is essentially being built by you, our community!</h2>
      <Col>
        <h1>
          This will be a list where users can submit the next feature request
        </h1>
        <h1>example</h1>
        <Input /><span>Search</span>
        <div>List of Features</div>
        <ul>
          <li>Make the thumbnails on level page bigger (votes 5)</li>
        </ul>
        <div>Results of Search</div>
        <div>Refresh sort</div>
      </Col>
      <Col>
        <div>Features currently being implemented</div>
        <ul>
          <li>
            when a user is afk for more than 5mins. They should show a status
            of afk in the room list
          </li>
          <li>
            when a user is afk for more than 15mins. They should be kicked out
            of the room.
          </li>
        </ul>
        <div>Features that have been implemented</div>
        <ul>
          <li>Change font family</li>
        </ul>
        <h1>Thanks for your feedback!</h1>
      </Col>
    </Section>
  )
}

export default Features
