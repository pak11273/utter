import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import Zone from "../api/zone/zone-model"

const result = Zone.find({})

export default result

/* export default [ */
/*   { */
/*     name: "Terminus", */
/*     image: "chatrooms/terminus.jpg" */
/*   }, */
/*   { */
/*     name: "Alexandria", */
/*     image: "chatrooms/alexandria.jpg" */
/*   }, */
/*   { */
/*     name: "Sanctuary", */
/*     image: "chatrooms/sanctuary.jpg" */
/*   }, */
/*   { */
/*     name: "Hilltop", */
/*     image: "chatrooms/hilltop.jpg" */
/*   } */
/* ] */
