import React, {Component} from "react"

// import {selectUserInfo} from '../../../../api/user/selectors.js'

class Profile extends Component {
  render() {
    /* const {user} = this.props */
    return (
      <form size="large">
        <div>Avatar</div>
        <input placeholder="Avatar" defaultValue="username changem" disabled />
        <div>Followers</div>
        <input placeholder="Followers" defaultValue={1} readOnly />
      </form>
    )
  }
}

export default Profile
