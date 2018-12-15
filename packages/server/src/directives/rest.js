import {SchemaDirectiveVisitor} from "graphql-tools"

export class restDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {url} = this.args
    field.resolve = () => fetch(url)
  }
}
