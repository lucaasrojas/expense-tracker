import React from "react";
import "./chartBarStyles.css";
export const ChartBar = (props) => {
  return (
    <div>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <div className="chartbar__base">
          <div
            className="chartbar__mark"
            style={{
              height: `${props.percentage}%`,
            }}
          ></div>
        </div>
      </div>
      <p className="chartbar__label">{props.month}</p>
    </div>
  );
};
