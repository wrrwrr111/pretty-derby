import React, { useState } from "react";
import { Checkbox } from "antd";
const RaceCheckbox = (props) => {
  const [raceFilterCondition, setRaceFilterCondition] = useState(props.raceFilterCondition);

  const filterList = {
    distanceType: [
      { label: "短距離", value: "短距離" },
      { label: "マイル", value: "マイル" },
      { label: "中距離", value: "中距離" },
      { label: "長距離", value: "長距離" },
    ],
    grade: [
      { label: "Pre-OP", value: "Pre-OP" },
      { label: "OP", value: "OP" },
      { label: "G1", value: "G1" },
      { label: "G2", value: "G2" },
      { label: "G3", value: "G3" },
    ],
    ground: [
      { label: "芝", value: "芝" },
      { label: "ダート", value: "ダート" },
    ],
  };
  const onChange = (checkedValues, type) => {
    let tmpObj = {};
    tmpObj[type] = checkedValues;
    props.onChange({ ...raceFilterCondition, ...tmpObj });
    setRaceFilterCondition({ ...raceFilterCondition, ...tmpObj });
  };
  return (
    <>
      {Object.keys(filterList).map((key) => (
        <div key={key}>
          <Checkbox.Group
            options={filterList[key]}
            defaultValue={props.raceFilterCondition[key]}
            onChange={(checkedValues) => onChange(checkedValues, key)}
          />
        </div>
      ))}
    </>
  );
};
export default RaceCheckbox;
