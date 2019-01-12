import {createContext} from "react"

const context = createContext({
	user: {},
	logout: () => {} // logout the user
})

export const ContextProvider = context.Provider
export const ContextConsumer = context.Consumer
