import { createContext, useReducer } from "react";

export const ShoppingCartContext = createContext({})

function ShoppinCartReducer(State, action) {
    switch (action.type) {
        case "SET":
            const inverted = action.payload.reverse()
            return inverted
        default:
            return State
    }
}
function ShoppingCartProvider({ children }) {
    const [cartState, dispatch] = useReducer(ShoppinCartReducer, [])
    function setShoppingCart(carts) {
        dispatch({ type: 'SET', payload: carts })
    }
    const value = {
        carts: cartState,
        setShoppingCart: setShoppingCart,
    }
}