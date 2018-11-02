import { combineReducers } from 'redux'

import todos from './todos.js'
import loading from './loading.js'
import goals from './goals.js'

export default combineReducers({
	todos,
	goals,
	loading,
})