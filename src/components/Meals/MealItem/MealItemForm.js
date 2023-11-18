import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef } from "react";
const MealItemForm = props => {
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = +amountInputRef.current.value;
        props.onAddToCart(enteredAmount);
    };


    return (<form className={classes.form} onSubmit={submitHandler}>
        <Input label = "Amount" input = {{
            id : "amount" + props.id,
            type : "number",
            min : "1",
            max : "5",
            step : "1",
            defaultValue : '1'
        }} ref = {amountInputRef}/>
        <button>+ Add</button>
    </form>)
};
export default MealItemForm;