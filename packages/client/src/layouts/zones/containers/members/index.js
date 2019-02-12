import React, {PureComponent} from "react"

import Avatar from "@material-ui/core/Avatar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
/* import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction" */
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import {withStyles} from "@material-ui/core/styles"

import ceoImg from "../../../../assets/images/ceo.jpg"

const styles = () => ({
  root: {
    backgroundColor: "orange",
    height: "100%",
    width: "100%"
  }
})

class Members extends PureComponent {
  render() {
		console.log('member props: ', this.props);
    const {classes} = this.props
    return (
      <div className={classes.root}>
			{this.props.usersList.map((user,i) => [
        <List key={i}>
          <ListItem button style={{color: "#fafafa"}}>
            <ListItemAvatar>
              <Avatar alt={`Avatar n°${0 + 1}`} src={`${ceoImg}`} />
            </ListItemAvatar>
						<ListItemText
							primary={`${user}`}
						/>
          </ListItem>
        </List>
			])}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Members)
