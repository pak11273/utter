import React, {PureComponent} from "react"

import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

const styles = () => ({
  root: {
    display: "flex",
    margin: "100px auto",
    width: "960px"
  }
})

const facts = [
  {
    question:
      "Can I really be fluent in a language in a couple of weeks or months?",
    answer:
      "It takes years to master another language and become fluent in it.  We make no false promises and don't believe in a 'get fluent quick scheme'.  Learning a language is a long and arduous endeavor.  However, we do believe our platform is one of the most advanced tools you can use to help speed up speaking a new language.  Our goal is to boost this process and be a platform where everyone can practice and have intelligent conversations in their new language."
  },
  {
    question:
      "I would really like to use this platform but I can't afford to pay the monthly fees",
    answer:
      "Utterzone is a premium service and can only exist on user payments.  We will be implementing a sponsorship program in the near future where you can try and get sponsored by parents, your school or univiersity, or another organization."
  },
  {
    question: "How can I get unbanned from a zone? ",
    answer: "Once you are banned you cannot get unbanned from a zone."
  }
]

class FAQ extends PureComponent {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container alignItems="center" direction="column">
          <Typography variant="h2" align="center" gutterBottom>
            FAQ
          </Typography>
          <List>
            {facts.map((item, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText
                    primary={item.question}
                    secondary={item.answer}
                  />
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(FAQ)
