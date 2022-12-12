import React from "react";
import DateCard from "../DateCard";
import "./expenseCardStyles.css";
const ExpenseCard = (props) => {
    return (
        <div className="expense__item">
            <span className="expense__detail">
                {props.title} - ${props.amount}
            </span>
            <DateCard date={props.date} />
        </div>
    );
};

export default ExpenseCard;
