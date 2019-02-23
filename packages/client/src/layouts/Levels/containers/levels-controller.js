import React from "react"

import {gql, Mutation} from "react-apollo"
import {adopt} from "react-adopt"
/* import {LevelsConnector} from "@utterzone/connector" */

/* const GET_LEVELS = gql` */
/*   query getLevels($courseId: String!) { */
/*     getLevels(courseId: $courseId) { */
/*       levels { */
/*         id */
/*         courseId */
/*         level */
/*         title */
/*       } */
/*     } */
/*   } */
/* ` */

const DELETE_LEVEL = gql`
  mutation levelDelete($courseId: String, $level: String) {
    levelDelete(courseId: $courseId, level: $level) {
      id
    }
  }
`

const levelDelete = ({render}) => (
  <Mutation
	mutation={DELETE_LEVEL}
  /* update={(cache, {data: {levelDelete}}) => { */
  /* const query = GET_LEVELS */
  /* const gotLevels = cache.readQuery({query}) */
  /* console.log("levelDelete: ", levelDelete) */
  /* const byTodoId = R.propEq("id", levelDelete.id) */
  /* var gotLevels = cache.readQuery({ */
  /*   query: GET_LEVELS */
  /* variables: {courseId: this.props.course.id} */
  /* }) */
  /* var {levels} = gotLevels.getLevels */

  /* cache.writeQuery({ */
  /*   query, */
  /*   data: { */
  /*     getLevels: { */
  /*       levels: levels.concat([levelDelete.level]) */
  /*     } */
  /*   } */
  /* }) */
  /* }} */
  >
    {mutation => render(mutation)}
    {/* {(mutation, {loading, error, data}) => */
    /*   render(mutation, {loading, error, data}) */
    /* } */}
  </Mutation>
)

export default adopt({
  levelDelete
})
