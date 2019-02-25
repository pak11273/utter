import React from "react"
import {Mutation} from "react-apollo"
import {adopt} from "react-adopt"
import remove from "lodash/remove"

import {DELETE_LEVEL, getVocabularies} from "../xhr.js"
import {store} from "../../../store.js"

const courseId = store.getState().apiReducer.Course.items[0]

const vocabularyDelete = ({render}) => (
  <Mutation
    mutation={DELETE_LEVEL}
    update={(cache, {data: {vocabularyDelete}}) => {
      try {
        const gotVocabularies = cache.readQuery({
          query: getVocabularies,
          variables: {courseId}
        })
        var {vocabularies} = gotVocabularies.getVocabularies

        cache.writeQuery({
          query: getVocabularies,
          data: {
            getVocabularies: {
              vocabularies:
                remove(
                  vocabularies,
                  item =>
                    item.vocabulary === vocabularyDelete.vocabulary.vocabulary
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

export default adopt({
  vocabularyDelete
})
