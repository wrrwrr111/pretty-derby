import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// 定义类型
type FilterOption = {
  id: string;
  label: string;
  value: string;
};

type FilterCategory = {
  distanceType: FilterOption[];
  grade: FilterOption[];
  ground: FilterOption[];
};

type RaceFilterCondition = {
  distanceType: string[];
  grade: string[];
  ground: string[];
};

interface RaceCheckboxProps {
  raceFilterCondition: RaceFilterCondition;
  onChange: (newCondition: RaceFilterCondition) => void;
}

const RaceCheckbox: React.FC<RaceCheckboxProps> = ({ raceFilterCondition, onChange }) => {
  const [localCondition, setLocalCondition] = useState<RaceFilterCondition>(raceFilterCondition);

  // 使用更严格的类型定义
  const filterList: FilterCategory = {
    distanceType: [
      { id: "short", label: "短距離", value: "短距離" },
      { id: "mile", label: "マイル", value: "マイル" },
      { id: "medium", label: "中距離", value: "中距離" },
      { id: "long", label: "長距離", value: "長距離" },
    ],
    grade: [
      { id: "pre-op", label: "Pre-OP", value: "Pre-OP" },
      { id: "op", label: "OP", value: "OP" },
      { id: "g1", label: "G1", value: "G1" },
      { id: "g2", label: "G2", value: "G2" },
      { id: "g3", label: "G3", value: "G3" },
    ],
    ground: [
      { id: "turf", label: "芝", value: "芝" },
      { id: "dirt", label: "ダート", value: "ダート" },
    ],
  };

  const handleChange = (type: keyof RaceFilterCondition, value: string, checked: boolean) => {
    const newCondition = { ...localCondition };

    if (checked) {
      newCondition[type] = [...newCondition[type], value];
    } else {
      newCondition[type] = newCondition[type].filter((v) => v !== value);
    }

    setLocalCondition(newCondition);
    onChange(newCondition);
  };

  return (
    <div className="space-y-4">
      {(Object.keys(filterList) as Array<keyof FilterCategory>).map((type) => (
        <div key={type} className="space-y-2">
          <Label className="capitalize">{type}</Label>
          <div className="flex flex-wrap gap-4">
            {filterList[type].map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={localCondition[type].includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleChange(type, option.value, checked as boolean)
                  }
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaceCheckbox;
