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
          owner: values.owner,
          zoneName: values.zoneName,
          zoneDescription: values.zoneDescription,
          zoneImage: values.zoneImage,
          teachingLang: values.teachingLang,
          usingLang: values.usingLang
        }
      })
      console.log("connnector: ", values)

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
    $owner: String!
    $zoneName: String!
    $zoneImage: String
    $zoneDescription: String
    $teachingLang: String
    $usingLang: String
  ) {
    zoneCreate(
      input: {
        owner: $owner
        zoneName: $zoneName
        zoneImage: $zoneImage
        zoneDescription: $zoneDescription
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      id
      zoneName
      owner {
        username
      }
      zoneDescription
    }
  }
`

export const ZoneCreateConnector = graphql(ZoneCreateMutation)(Z)
