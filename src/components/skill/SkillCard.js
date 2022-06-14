import { useState } from "react";
import { CDN_SERVER } from "@/config";
import { useTranslation } from "react-i18next";
const SkillCard = (props) => {
  const { data, onClick, className } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  return data ? (
    <div
      className={` rounded border-solid border-2  flex items-center cursor-pointer ${
        data.rarity === 1 && "bg-white"
      } ${data.rarity === 2 && "bg-yellow-300"} ${data.rarity === 3 && " bg-purple-400"} ${
        data.rarity === 4 && " bg-purple-400"
      } ${data.rarity === 5 && " bg-purple-400"} ${className}`}
      onClick={onClick}
      data-tip={`<div>${t(data.describe)}</div><div>${t(data.condition)}</div>`}
    >
      {show && (
        <img
          className="w-5 h-5 overflow-hidden"
          onError={() => setShow(false)}
          alt={data.name}
          src={CDN_SERVER + data.imgUrl}
          preview="false"
        />
      )}
      <div className="flex-auto truncate">{data.name}</div>
    </div>
  ) : null;
};

export default SkillCard;
