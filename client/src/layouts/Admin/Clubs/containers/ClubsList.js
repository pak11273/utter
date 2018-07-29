import React from 'react'
import {Grid, Table, Segment, Header, Form, Dropdown} from 'semantic-ui-react'

const RANKS = [
  {value: 'Private', text: 'Private'},
  {value: 'Corporal', text: 'Corporal'},
  {value: 'Sergeant', text: 'Sergeant'},
  {value: 'Lieutenant', text: 'Lieutenant'},
  {value: 'Captain', text: 'Captain'},
  {value: 'Major', text: 'Major'},
  {value: 'Colonel', text: 'Colonel'}
]

const MECHS = [{value: 'WHM-6R', text: 'Warhammer WHM-6R'}]

const UserList = () => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={10}>
          <Header as="h3">User List</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                <Table.HeaderCell width={3}>Rank</Table.HeaderCell>
                <Table.HeaderCell width={2}>Age</Table.HeaderCell>
                <Table.HeaderCell width={2}>Skills</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Natasha Kerensky</Table.Cell>
                <Table.Cell>Captain</Table.Cell>
                <Table.Cell>52</Table.Cell>
                <Table.Cell>2/3</Table.Cell>
                <Table.Cell>WHM-6R</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as="h3">UserDetails</Header>
          <Segment>
            <Form size="large">
              <Form.Field name="name" width={16}>
                <label>Name</label>
                <input placeholder="Name" defaultValue="Natasha Kerensky" />
              </Form.Field>
              <Form.Field name="rank" width={16}>
                <label>Rank</label>
                <Dropdown
                  fluid
                  selection
                  options={RANKS}
                  defaultValue="Colonel"
                />
              </Form.Field>
              <Form.Field name="age" width={6}>
                <label>Age</label>
                <input placeholder="Age" defaultValue="52" />
              </Form.Field>
              <Form.Field name="gunnery" width={6}>
                <label>Gunnery</label>
                <input defaultValue="2" />
              </Form.Field>
              <Form.Field name="usering" width={6}>
                <label>Usering</label>
                <input defaultValue="3" />
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default UserList
