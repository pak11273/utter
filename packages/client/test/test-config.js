import {configure} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

;[".css", ".scss", ".png", ".jpg", ".JPG", ".svg"].forEach(ext => {
  require.extensions[ext] = () => null
})

configure({adapter: new Adapter()})
