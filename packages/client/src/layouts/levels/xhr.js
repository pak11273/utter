import gql from "graphql-tag"

export const GET_LEVELS = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        _id
        courseId
        level
        title
      }
    }
  }
`

/* export const LEVEL_CREATE = gql` */
/*   mutation levelCreate( */
/* 	$courseId: String */
/* 	$level: Int */
/* 	$title: String */
/* 	) { */
/*     levelCreate( */
/* 			input: { */
/* 				$courseId: courseId */

/* 				$level: level */

/* 				$title: title */

/* 			} */
/* 		) { */
/*       level { */
/*         courseId */
/*         _id */
/*         level */
/*         title */
/*       } */
/*       errors { */
/*         message */
/*       } */
/*     } */
/*   } */
/* ` */

export const DELETE_LEVEL = gql`
  mutation levelDelete($courseId: String, $level: Int, $title: String) {
    levelDelete(courseId: $courseId, level: $level, title: $title) {
      level {
        courseId
        id
        level
        title
      }
      errors {
        path
        message
      }
    }
  }
`
