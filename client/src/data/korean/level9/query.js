import vocab from './vocab.js'

// combine objects to form one object to pass to random generator
let animalsObj = vocab.category.nouns.animals
// let birdsObj = vocab.category.nouns.birds
// let bodyPartsObj = vocab.category.nouns.bodyParts
// let buildingsObj = vocab.category.nouns.buildings
// let clothesObj = vocab.category.nouns.clothes
// let familyObj = vocab.category.nouns.family
// let furnitureObj = vocab.category.nouns.furniture
// let drinksObj = vocab.category.nouns.foods.drinks
// let meatsObj = vocab.category.nouns.foods.meats
// let fruitsObj = vocab.category.nouns.foods.fruits
// let veggiesObj = vocab.category.nouns.foods.veggies
// let otherObj = vocab.category.nouns.foods.other
// let stapleObj = vocab.category.nouns.foods.staple
// let hygieneObj = vocab.category.nouns.hygiene
// let natureObj = vocab.category.nouns.nature
// let toysObj = vocab.category.nouns.toys
// let vehiclesObj = vocab.category.nouns.vehicles
// let miscObj = vocab.category.nouns.misc
let verbObj = vocab.category.verbs

// culture specific objects
// let cultureObjVeggies = vocab.category.cultureSpecific.nouns.foods.veggies

const listObj = _.merge(
  animalsObj,
  // bodyPartsObj,
  // buildingsObj,
  // clothesObj,
  // familyObj,
  // furnitureObj,
  // drinksObj,
  // meatsObj,
  // fruitsObj,
  // veggiesObj,
  // otherObj,
  // stapleObj,
  // hygieneObj,
  // natureObj,
  // toysObj,
  // vehiclesObj,
  // miscObj,
  // cultureObjVeggies
  verbObj
)

export default listObj
