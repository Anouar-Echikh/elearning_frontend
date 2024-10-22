import {ADD_ITEM,DELETE_ITEM,SET_LIST,UPDATE_ITEM} from '../types/goalsTypes'


const INITIAL_STATE = {
items:[]

};
 
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case DELETE_ITEM :
            return {...state,items:state.items.filter((el)=>el.id!==action.payload)}
        case UPDATE_ITEM :
            return {...state,items:state.items.map((el)=>el.id===action.payload.id?el=action.payload:el)}
            case ADD_ITEM :
                return {...state,items:[...state.items,action.payload]}
                case SET_LIST :
                    return {...state,items:action.payload}
        default:
            return state
    }
}

export default reducer;