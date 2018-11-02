import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import checker from './checker.js'
import logger from './logger.js'

export default applyMiddleware(
	thunk,
	checker,
	logger
)