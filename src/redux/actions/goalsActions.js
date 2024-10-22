
/*
Action 1 : getListOfItems
Action 2 : delete
Action 3 : update 
Action 4 : add

*/
import {ADD_ITEM,DELETE_ITEM,UPDATE_ITEM,SET_LIST} from '../types/goalsTypes'


// DELETE ITEM
const deleteItem=(id)=>{
    return dispatch=>{
        dispatch({type:DELETE_ITEM,payload:id})
    }
}

// UPDATE ITEM
const updateItem=(item)=>{
    return dispatch=>{
        dispatch({type:UPDATE_ITEM,payload:item})
    }
}
//Add item
const  addItem =(item)=>{
    return dispatch=>{
        dispatch({type:ADD_ITEM,payload:item})
    }
}
const setList=(list)=>{
    return dispatch=>{
        dispatch({type:SET_LIST,payload:list})
    }
}

export {setList,deleteItem,updateItem,addItem};