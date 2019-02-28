import React from "react"
import {Mutation, Query} from "react-apollo"
import {adopt} from "react-adopt"
import gql from "graphql-tag"
/* import remove from "lodash/remove" */

import {getLevels} from "../../levels/xhr.js"
/* import {DELETE_LEVEL, getVocabularies} from "../xhr.js" */
import {store} from "../../../store.js"

const courseId = store.getState().apiReducer.Course.items[0]
export const DELETE_LEVEL = gql`
  mutation vocabularyDelete($word: String, $translation: String) {
    vocabularyDelete(word: $word, translation: $translation) {
      vocabulary {
        word
        translation
      }
      errors {
        path
        message
      }
    }
  }
`

export const GET_VOCABULARY = gql`
  query getVocabulary($levelId: String!) {
    getVocabulary(levelId: $levelId) {
      word
      translation
    }
  }
`

/* const vocabularyDelete = ({render}) => ( */
/*   <Mutation */
/*     mutation={DELETE_LEVEL} */
/*     update={(cache, {data: {vocabularyDelete}}) => { */
/*       try { */
/*         const gotVocabularies = cache.readQuery({ */
/*           query: getVocabularies, */
/*           variables: {courseId} */
/*         }) */
/*         var {vocabularies} = gotVocabularies.getVocabularies */

/*         cache.writeQuery({ */
/*           query: getVocabularies, */
/*           data: { */
/*             getVocabularies: { */
/*               vocabularies: */
/*                 remove( */
/*                   vocabularies, */
/*                   item => */
/*                     item.vocabulary === vocabularyDelete.vocabulary.vocabulary */
/*                 ) || [] */
/*             } */
/*           } */
/*         }) */
/*       } catch (err) { */
/*         console.log("err: ", err) */
/*       } */
/*     }}> */
/*     {(mutation, result) => render({mutation, result})} */
/*   </Mutation> */
/* ) */

export const VOCABULARY_CREATE= gql`
  mutation vocabularyCreate($levelId: String!) {
    vocabularyCreate(levelId: $levelId) {
      vocabulary {
        audioUrl
        courseId
        gender
        level
        translation
        word
      }
      errors {
        message
      }
    }
  }
`

export const vocabularyCreateMutation= ({render}) => (
    <Mutation
      mutation={VOCABULARY_CREATE}
      update={(cache, {data: {vocabularyCreate}}) => {
        const query = GET_VOCABULARY 
        const {vocabulary} = cache.readQuery({query})

        cache.writeQuery({
          query,
          data: {vocabulary: vocabulary.concat([vocabularyCreate])}
        })

        try {
				console.log('VOCABULARY_CREATE: ', VOCABULARY_CREATE)
          var getVocabulary = cache.readQuery({
            query: getLevels,
            variables: {levelId: 1}
          })
          var {levels} = getVocabulary.getLevels
					console.log(levels);
      /* console.log( */
      /*   "vocabulary Create: ", */
      /*   VOCABULARY_CREATE.vocabulary */
      /* ) */
      /* console.log("courseId: ", this.props.course.id) */
      /* console.log("levels: ", levels) */
      /* cache.writeQuery({ */
      /*   query: getLevels, */
      /*   variables: { */
      /*     courseId: this.props.course.id */
      /*   }, */
      /*   data: { */
      /*     getLevels: { */
      /*       levels: levels[0].vocabulary.push( */
      /*         VOCABULARY_CREATE.vocabulary */
      /*       ) */
      /*     } */
      /*   } */
      /* }) */
      } catch (err) {
        console.log("err: ", err)
      }}}>
      {(mutation, result) => render({mutation, result})}
    </Mutation>
  )

export default adopt({
  getLevelsQuery: ({render}) => (
    <Query
      errorPolicy="all"
      query={getLevels}
      variables={{
        courseId
      }}>
      {render}
    </Query>
  ),
  getVocabularyQuery: ({render}) => (
    <Query errorPolicy="all" query={GET_VOCABULARY}>
      {render}
    </Query>
  ),
vocabularyCreateMutation
  /* vocabularyDelete */
})
