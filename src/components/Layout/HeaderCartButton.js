import CartIcon from "../Cart/CartIcon";
import { useContext ,useEffect , useState} from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/Cart-context";
const HeaderCartButton = props => {
    const [animateButton , setBtnAnimate] = useState(false);
    const cartCtx = useContext(CartContext);
    console.log(cartCtx);
    const {item} = cartCtx;
    const cartItems = item.reduce((currNum , item)=>{
        return currNum + item.amount;
    } , 0);
    const btnClasses = `${classes.button} ${animateButton ? classes.bump : ""}`;
    useEffect(()=>{
        if(item.length === 0) return;
        setBtnAnimate(true);
        const timer = setTimeout(()=>{
            setBtnAnimate(false);
        } , 300)
        return () => {
            clearTimeout(timer);
        }
    } , [item]);
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {cartItems}
        </span>
    </button>
};
export default HeaderCartButton;