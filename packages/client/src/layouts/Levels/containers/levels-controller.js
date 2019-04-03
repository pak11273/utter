import React from "react"
import {Mutation} from "react-apollo"
/* import {adopt} from "react-adopt" */
import remove from "lodash/remove"

import {DELETE_LEVEL, getLevels} from "../xhr.js"
/* import {store} from "../../../store.js" */

/* const courseId = store.getState().apiReducer.Course.items[0] */

const levelDelete = ({render}) => (
  <Mutation
    mutation={DELETE_LEVEL}
    update={(cache, {data: {levelDelete}}) => {
      try {
        const gotLevels = cache.readQuery({
          query: getLevels,
          variables: "TODO: pending"
        })
        var {levels} = gotLevels.getLevels

        cache.writeQuery({
          query: getLevels,
          data: {
            getLevels: {
              levels:
                remove(
                  levels,
                  item => item.level === levelDelete.level.level
                ) || []
            }
          }
        })
      } catch (err) {
        console.log("err: ", err)
      }
    }}>
    {(mutation, result) => render({mutation, result})}
  </Mutation>
)

export default levelDelete
