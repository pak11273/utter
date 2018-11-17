import {Model, fk, oneToOne, many} from 'redux-orm'
import {Schema} from 'redux-orm'

export class Author extends Model {}

Author.modelName = 'Author'
Course.fields = {
  course: many('Course')
}

export class Course extends Model {}

Course.modelName = 'Course'
Course.fields = {
  authors: oneToOne('Author'),
  levels: many('Levels')
}

export class Levels extends Model {}

Levels.modelName = 'Levels'
Levels.fields = {
  terms: many('Terms')
}

export class Terms extends Model {}
Terms.modelName = 'Terms'
Terms.fields = {
  words: many('Words')
}

const schema = new Schema()
schema.register(Course, Levels, Author, Terms)
export default schema
