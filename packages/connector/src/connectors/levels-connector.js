/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class L extends PureComponent {
  submit = async values => {
    try {
      const {data: levelCreate} = await this.props.mutate({
        variables: {
          levelName: values.levelName,
          levelDescription: values.levelDescription,
          levelImage: values.levelImage,
          levelMode: values.levelMode,
          teachingLang: values.teachingLang,
          usingLang: values.usingLang
        }
      })

      if (levelCreate) {
        return levelCreate
      }
      if (error) {
        return normalizeErrors(error)
      }
    } catch (err) {
      console.log("err: ", err)
    }
    return null
  }

  render() {
    return this.props.children({submit: this.submit})
  }
}

const LevelCreateMutation = gql`
  mutation levelCreate(
    $levelName: String!
    $levelImage: String
    $levelDescription: String
    $levelMode: String
    $teachingLang: String
    $usingLang: String
  ) {
    levelCreate(
      input: {
        levelName: $levelName
        levelImage: $levelImage
        levelDescription: $levelDescription
        levelMode: $levelMode
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      _id
      levelName
      levelAuthor {
        username
      }
      levelDescription
      levelMode
    }
  }
`

export const LevelsConnector = graphql(LevelCreateMutation)(L)
