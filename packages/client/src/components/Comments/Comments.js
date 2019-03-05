import React, {Component} from "react"
import {Link} from "react-router-dom"
import styled from "styled-components"
import {CreateComment, Comment} from "./"
import Box from "../../components/Boxes/Box.js"
import Button from "../../components/buttons/button.js"
import superagent from "superagent"
import {ApiMgr} from "../../utils"

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    superagent
      .get("/api/comments")
      .query(null)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }
        const results = res.body.comment

        this.setState({
          list: results
        })
      })
  }

  addComment = comment => {
    superagent
      .post("/api/comments")
      .send(comment)
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const updatedList = Object.assign([], this.state.list)
          updatedList.push(res.body)
          this.setState({
            list: updatedList
          })
        }
      })
  }

  updateName = e => {
    e.preventDefault()
    const updatedName = Object.assign({}, this.state.comment)
    updatedName[e.target.name] = e.target.value
    this.setState({
      comment: updatedName
    })
  }

  render() {
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}>
          <Comment currentComment={comment} />
        </li>
      )
    })
    return (
      <Box>
        <Box overflow="scroll" height="500px">
          <ol>{commentList}</ol>
        </Box>
        <CreateComment addComment={this.addComment} />
      </Box>
    )
  }
}

export default Comments
