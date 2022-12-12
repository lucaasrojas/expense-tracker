import React from "react";
import "./dateCardStyles.css";
const DateCard = ({ date }) => {
    return (
        <div className="date__card">
            <div className="date__day">
                <span>{date.format("DD")}</span>
            </div>
            <div className="date__month_year">
                <span>{date.format("MMM YYYY")}</span>
            </div>
        </div>
    );
};

export default DateCard;
