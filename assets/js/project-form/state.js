import { createState } from "../utility.js";

var initialState = {
    isNew: true,
    rows: 1,
}

var global = createState(initialState)

export { global };