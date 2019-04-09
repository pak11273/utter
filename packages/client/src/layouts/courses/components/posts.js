import React from "react"
import {
  Datagrid,
  Edit,
  EditButton,
  /* Filter, */
  Create,
  DisabledInput,
  List,
  LongTextInput,
  /* ReferenceField, */
  ReferenceInput,
  Responsive,
  SelectInput,
  SimpleForm,
  SimpleList,
  /* TextField, */
  TextInput
} from "react-admin"

/* const PostsFilter = props => ( */
/*   <Filter {...props}> */
/*     <TextInput label="Search" source="q" alwaysOn /> */
/*     <ReferenceInput label="User" source="userId" reference="users" allowEmpty> */
/*       <SelectInput optionText="name" /> */
/*     </ReferenceInput> */
/*   </Filter> */
/* ) */

const PostsTitle = ({record}) => {
  return <span>Posts {record ? `"${record.title}"` : ""}</span>
}

export const PostsList = props => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.title}
          secondaryText={record => `${record.views} views`}
          tertiaryText={record => {
            new Date(record.published_at).toLocaleDateString()
          }}
        />
      }
      medium={
        <Datagrid>
          {/* <TextField source="id" />
           <ReferenceField label="User" source="userId" reference="users">
            <TextField source="name" />
          </ReferenceField> 
          <TextField source="title" /> */}
          <EditButton label="Edit" />
        </Datagrid>
      }
    />
  </List>
)

export const PostsCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="body" />
    </SimpleForm>
  </Create>
)

export const PostsEdit = props => (
  <Edit title={<PostsTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="body" />
    </SimpleForm>
  </Edit>
)
