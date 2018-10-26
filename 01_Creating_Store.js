//  Library code
function createStore (reducer) {
	/*
	The store should have four parts
	1. the state.
	2. Get the state.
	3. Listen to changes on the state.
	4. Update the state  
	*/
	let state

	let listeners = []




	const getState = () => state

	const subscribe = (listener) => {
		listeners.push(listener)
		return() => {
			listeners = listeners.filter((l) => l !== listener)
		}
	}

	const dispatch = (action) => {
		// call todos
		state = reducer(state, action)
		// loop over listeners and invoke them
		listeners.forEach((listener) => listener())
	}


	return {
		getState,
		subscribe,
		dispatch,
	}
}



//  App code

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'Remove_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'



// action creator

function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo, 
	}
}

function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id,
	}
}


function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id,
	}
}

function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal,
	}
}

function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id,
	}
}





/*
Pure function:
1. They always return the same result if the same arguments are passed in
2. They depend only on the arguments passed into them.
3. Never produce any side effects.
*/

// Reducer function

function todos (state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return state.concat([action.todo])
		case REMOVE_TODO:
			return state.filter((todo) => todo.id !== action.id)
		case TOGGLE_TODO:
			return state.map((todo) => todo.id !== action.id ? todo : 
				// name: todo.name,
				// id: todo.id,
				// complete: !todo.complete
				Object.assign({}, todo, {complete: !todo.complete})
			)
		default:
			return state 
	}	
}


function goals (state = [], action) {
	switch(action.type) {
		case ADD_GOAL:
			return state.concat([action.goal])
		case REMOVE_GOAL:
			return state.filter((goal) => goal.id !== action.id)
		default:
			return state
	}
}


function app (state = {} , action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action),
	} 
}

// {
// 	todos: [],
// 	goals: [],
// }


const store = createStore(app)

store.subscribe(() => {
	console.log('The new state is: ', store.getState())
})

store.dispatch(addTodoAction({
		id: 0,
		name: 'Learn Redux',
		complete: false,
}))


store.dispatch(addTodoAction({
	id: 1,
	name: 'Wash the car'
	complete: false,
}))

store.dispatch(addTodoAction({
	id: 2,
	name: 'Go to the gym'
	complete: true,
}))


store.dispatch(removeTodoAction(0))

store.dispatch(toggleTodoAction(0))


store.dispatch(addGoalAction({
	id: 0,
	name: 'Run a Marathon'
}))

store.dispatch(removeGoalAction(0))



