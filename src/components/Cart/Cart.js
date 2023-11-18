import classes from "./Card.module.css"
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/Cart-context";
import CartItem from "./CartItem";
const Cart = props => {
    const cartctx = useContext(CartContext);
    const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`;
    const cartItemRemoveHandler = id => {
        cartctx.removeItem(id);
    }
    const cartItemAddHandler = item => {
        cartctx.addItem({...item , amount : 1});
    }
    const cartItems = <ul className={classes["cart-items"]}>
        {cartctx.item.map((item)=>{
            return <CartItem key = {item.id} name = {item.name} amount = {item.amount} price = {item.price} onRemove = {cartItemRemoveHandler.bind(null , item.id)} onAdd = {cartItemAddHandler.bind(null , item)}/>
        })}
    </ul>;
    
    return <Modal onClose={props.onCloseCart}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {cartctx.item.length > 0 && <button className={classes.button} >Order</button>}
        </div>
    </Modal>
};
export default Cart;