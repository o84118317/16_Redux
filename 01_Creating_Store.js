{
	type: 'ADD_TODO',
	todo: {
		id: 0,
		name: 'Learn Redux',
		complete: false,
	}
}


{
	type: 'Remove_TODO',
	id: 0,
}

{
	type: 'TOGGLE_TODO',
	id: 0,
}

{
	type: 'ADD_GOAL',
	goal: {
		id: 0,
		name: 'Run a Marathon'
	}
}

{
	type: 'REMOVE_GOAL',
	id: 0
}



/*
Pure function:
1. They always return the same result if the same arguments are passed in
2. They depend only on the arguments passed into them.
3. Never produce any side effects.
*/

// Reducer function

function todos (state = [], action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo])
	} else if (action.type === 'Remove_TODO') {
		return state.filter((todo) => todo.id !== action.id)
	} else if (action.type ==='TOGGLE_TODO') {
		return state.map((todo) => todo.id !== action.id ? todo : 
			// name: todo.name,
			// id: todo.is,
			// complete: !todo.complete
			Object.assign({}, todo, {complete: !todo.complete})
		) 
	} else {
		return state
	}
}


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