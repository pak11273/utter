import {SchemaDirectiveVisitor} from "apollo-server"

export class restDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {url} = this.args
    field.resolve = () => fetch(url)
  }
}
