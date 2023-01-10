import { createContext,useReducer } from "react";

export const ProductContext = createContext(
    {
        productList: []
    }
)

function productReducer (State,action){
    switch(action.type){
        case "SET":
            const inverted = action.payload.reverse()
            return inverted
        default:
            return State
    }
}

function ProductProvider({children}){
    const [productState,dispatch]=useReducer(productReducer,[])
    function setProduct(products){
        dispatch({type:'SET',payload:products})
    }
    const value = {
        products:productState,
        setProduct:setProduct,
    }
    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
export default ProductProvider