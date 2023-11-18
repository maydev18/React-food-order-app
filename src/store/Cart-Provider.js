import CartContext from "./Cart-context";
import { useReducer } from "react";
const defaultCartState = {
    item : [],
    totalAmount : 0,
};
const cartReducer = (state , action) => {
    if(action.type === "ADD"){
        const existingCartItemIndex = state.item.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.item[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems = state.item.concat(action.item);
        }

        const newAmount = state.totalAmount + (action.item.price * action.item.amount);
        console.log(updatedItems , newAmount);
        return {
            item : updatedItems,
            totalAmount : newAmount
        };
    }
    if(action.type === "REMOVE"){
        const existingCartItemIndex = state.item.findIndex((item) => item.id === action.id);
        const existingItem = state.item[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.item.filter(item => item.id !== action.id);
        }
        else{
            const updatedItem = {...existingItem , amount : existingItem.amount-1};
            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            item : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    return defaultCartState;
};
const CartProvider = props => {
    const [cartState , dispatchCartAction] = useReducer(cartReducer , defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type : "ADD" , 
            item : item
        });
    }
    const removeItemHandler = id => {
        dispatchCartAction({
            type : "REMOVE",
            id : id
        });
    }
    const cartContext = {
        item : cartState.item,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemHandler
    }
    return <CartContext.Provider value = {cartContext}>
        {props.children}
    </CartContext.Provider>
};
export default CartProvider;