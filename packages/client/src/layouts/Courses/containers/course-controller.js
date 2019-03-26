/* import React, {PureComponent} from "react" */
import gql from "react-apollo"
/* import {CourseCreateConnector} from "@utterzone/connector" */

/* import CourseCreateView from "./course-create.js" */

/* export default class SignupCtrl extends PureComponent { */
/*   render() { */
/*     return ( */
/*       <React.Fragment> */
/*         <CourseCreateConnector> */
/*           {({submit}) => <CourseCreateView submit={submit} />} */
/*         </CourseCreateConnector> */
/*       </React.Fragment> */
/*     ) */
/*   } */
/* } */

const COURSE_CREATE = gql`
  mutation courseCreate(
    $title: String!
    $courseImage: String
    $courseDescription: String
    $courseMode: String
    $resources: [ResourceInput]
    $teachingLang: String
    $usingLang: String
  ) {
    courseCreate(
      input: {
        title: $title
        courseImage: $courseImage
        courseDescription: $courseDescription
        courseMode: $courseMode
        resources: $resources
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      id
      title
      owner {
        username
      }
      courseDescription
      courseMode
      resources {
        value
        label
      }
      teachingLang
      usingLang
    }
  }
`

export {COURSE_CREATE}
