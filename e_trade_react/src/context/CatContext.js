import { createContext, useReducer } from "react";

export const CategoryContext = createContext(
    {
        categoryList: []
    }
)

function categoryReducer(State,action){
    switch(action.type){
        case "SET":
            const inverted=action.payload.reverse()
            return inverted
        default:
            return State
    }
}

function CategoryProvider({children}){
    const [categoryState,dispatch]=useReducer(categoryReducer,[])
    function setCategory(categories) {
        dispatch({type:"SET",payload:categories})
    }
    const value={
        categories:categoryState,
        setCategory:setCategory
    }
    return(
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    )
}
export default CategoryProvider