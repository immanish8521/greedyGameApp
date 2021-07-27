import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/_table.scss";

const Table = (props) => {
  const [sortState, setSortState] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [initialState, setInitialState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const colName = [
    "DATE",
    "APP NAME",
    "AD REQUEST",
    "AD RESPONSE",
    "IMPRESSION",
    "CLICKS	",
    "REVENUE",
    "FILL RATE",
    "CTR",
  ];
  const sortHandler = (index, asc) => {
    if (initialState[index] === 0) {
      let arr2 = initialState.concat();
      arr2[index] = 1;
      setInitialState(arr2);
    }
    let arr1 = sortState.concat();
    arr1[index] = !arr1[index];
    props.sortHandler(index, asc);
    setSortState(arr1);
  };
  return (
    <div className="table_container">
      <table className="table sticky">
        <thead>
          {colName.map((col, i) => {
            return (
              props.toggleState[i] && (
                <th
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => sortHandler(i, sortState[i])}
                >
                  {col}
                  <FontAwesomeIcon
                    icon={
                      initialState[i] === 0
                        ? null
                        : sortState[i]
                        ? faArrowUp
                        : faArrowDown
                    }
                  ></FontAwesomeIcon>
                </th>
              )
            );
          })}
        </thead>
        <tbody>
          {props.list.map((res) => {
            return (
              <tr>
                {Object.keys(res).map((k, i) => {
                  return (
                    props.toggleState[i] && (
                      <td data-label="Manish">{res[k]}</td>
                    )
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
