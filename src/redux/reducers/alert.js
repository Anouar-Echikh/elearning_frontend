
   var initialState = {
     open:false,
     openT:false,
     info:{}
     };
   
   const AlertReducer = (state = initialState, action) => {
     switch (action.type) {
       //-------Fetch-------//
       case "OPEN":
         return { ...state,open:true,info:action.payload};
        case "CLOSE":
            return { ...state,open:false};
            case "OPEN_T":
         return { ...state,openT:true,info:action.payload};
        case "CLOSE_T":
            return { ...state,openT:false};
       //----DEFAULT----//
       default:
         return state;
     }
   };
   export default AlertReducer;
   