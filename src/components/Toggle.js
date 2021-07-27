import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import "../styles/_toggle.scss";

const Toggle = ({ toggleColumn, toggleState }) => {
  const colName = [
    "",
    "",
    "AD REQUEST",
    "AD RESPONSE",
    "IMPRESSION",
    "CLICKS	",
    "REVENUE",
    "FILL RATE",
    "CTR",
  ];
  const toggleHandler = (index) => {
    toggleColumn(index);
  };
  return (
    <div className="toggle_main_container">
      {colName.map((name, index) => {
        if (index < 2) {
          return null;
        } else {
          return (
            <span key={index} className="toggle_container">
              {name}
              <FontAwesomeIcon
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  paddingLeft: ".2rem",
                  paddingTop: ".2rem",
                }}
                onClick={() => toggleHandler(index)}
                icon={toggleState[index] ? faToggleOn : faToggleOff}
              />
            </span>
          );
        }
      })}
    </div>
  );
};

export default Toggle;
