/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class Z extends PureComponent {
  submit = async values => {
    try {
      const {data: zoneCreate} = await this.props.mutate({
        variables: {
          ageGroup: values.ageGroup,
          owner: values.owner,
          zoneName: values.zoneName,
          zoneDescription: values.zoneDescription,
          zoneImage: values.zoneImage,
          teachingLang: values.teachingLang,
          usingLang: values.usingLang
        }
      })

      if (zoneCreate) {
        return zoneCreate
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

const ZoneCreateMutation = gql`
  mutation zoneCreate(
    $app: String
    $appLevel: Int
    $ageGroup: String!
    $owner: String!
    $zoneName: String!
    $zoneImage: String
    $zoneDescription: String
    $teachingLang: String
    $usingLang: String
  ) {
    zoneCreate(
      input: {
        app: $app
        appLevel: $appLevel
        ageGroup: $ageGroup
        owner: $owner
        zoneName: $zoneName
        zoneImage: $zoneImage
        zoneDescription: $zoneDescription
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      id
      app
      appLevel
      ageGroup
      zoneName
      zoneDescription
      owner {
        username
      }
    }
  }
`

export const ZoneCreateConnector = graphql(ZoneCreateMutation)(Z)
