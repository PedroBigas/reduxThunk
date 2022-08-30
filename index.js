const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const fetch = require('cross-fetch')

const initialState = [{id:0,title:'Tarefa', completed: false}]

const addItem =(item)=> {return {type:'ADD_ITEM', playload:item}}

const loadItemAndAdd = () => {
    return (dispatch) =>{
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json()).then(json=>{
            dispatch(addItem(json))
        })
    }
}

const listReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.playload]
            
    
        default:
            return state;
    }
}

const store = createStore(listReducer, applyMiddleware(thunk));

store.dispatch(loadItemAndAdd())

console.log(console.log(store.getState()));

store.subscribe(()=>{console.log(store.getState())})