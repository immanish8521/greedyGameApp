import React, { useState, useEffect } from "react";
import "./App.scss";
import Table from "./components/Table";
import axios from "axios";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import Toggle from "./components/Toggle";
import dayjs from "dayjs";

const App = () => {
  let data_keys = [
    "date",
    "app_name",
    "requests",
    "responses",
    "impressions",
    "clicks",
    "revenue",
    "fill_rate",
    "ctr",
  ];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputData, setInputData] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [toggleState, setToggleState] = useState([
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
  const dateChangehandler = (e) => {
    setStartDate(e.startDate.toJSON().substring(0, 10));
    console.log(e.startDate.toJSON().substring(0, 10));
    setEndDate(e.endDate.toJSON().substring(0, 10));
  };
  const onclickHandler = () => {
    axios
      .get(
        `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
      )
      .then((data) => {
        let tableList = data.data.data.map((res) => {
          return {
            date: dayjs(res.date).format("	MMMM D, YYYY h:mm A"),
            app_name: inputValue.filter((p) => {
              return p.app_id === res.app_id;
            })[0].app_name,
            requests: res.requests,
            responses: res.responses,
            impressions: res.impressions,
            clicks: res.clicks,
            revenue: res.revenue.toFixed(3),
            fill_rate: ((res.requests / res.responses) * 100).toFixed(2),
            ctr: ((res.clicks / res.impressions) * 100).toFixed(2),
          };
        });
        setInputData(tableList);
        console.log(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://go-dev.greedygame.com/v3/dummy/apps`)
      .then((data) => {
        setInputValue(data.data.data);
        console.log(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const toggleColumn = (index) => {
    let arr1 = toggleState.concat();
    arr1[index] = !arr1[index];
    console.log(arr1);
    console.log(index);
    setToggleState(arr1);
  };

  const sortHandler = (index, asc) => {
    if (index !== 1) {
      let arr = inputData.concat();
      arr.sort((e1, e2) => {
        let lhs =
          index === 0 ? new Date(e1[data_keys[index]]) : e1[data_keys[index]];
        let rhs =
          index === 0 ? new Date(e2[data_keys[index]]) : e2[data_keys[index]];
        if (+lhs < +rhs) {
          return asc ? -1 : 1;
        } else if (+lhs > +rhs) {
          return asc ? 1 : -1;
        } else {
          return 0;
        }
      });
      setInputData(arr);
    } else {
      let arr = inputData.concat();
      arr.sort((e1, e2) => {
        if (e1[data_keys[index]] < e2[data_keys[index]]) {
          return asc ? -1 : 1;
        } else if (e1[data_keys[index]] > e2[data_keys[index]]) {
          return asc ? 1 : -1;
        } else {
          return 0;
        }
      });
      setInputData(arr);
    }
  };

  return (
    <>
      <div className="input_container">
        <div className="input_range">
          <DateRangePickerComponent
            placeholder="Enter Date Range"
            format="dd-MMM-yy"
            change={dateChangehandler}
          ></DateRangePickerComponent>
        </div>
        <div className="btn_submit">
          <button onClick={onclickHandler}>Search</button>
        </div>
      </div>
      <Toggle toggleState={toggleState} toggleColumn={toggleColumn} />

      <Table
        sortHandler={sortHandler}
        toggleState={toggleState}
        list={inputData}
        appList={inputValue}
      />
    </>
  );
};

export default App;
