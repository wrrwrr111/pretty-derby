import { useState } from "react";
import { CDN_SERVER } from "src/config";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipWrapper } from "react-tooltip";
const SkillCard = (props) => {
  const { data, onClick, className } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  if (!data) return null;
  return (
    <TooltipWrapper html={`${t(data.describe)}<br/>${t(data.condition)}`}>
      <div
        className={` flex cursor-pointer items-center  rounded border-2 border-solid ${
          data.rarity === 1 && "bg-white"
        } ${data.rarity === 2 && "bg-yellow-300"} ${data.rarity === 3 && " bg-purple-400"} ${
          data.rarity === 4 && " bg-purple-400"
        } ${data.rarity === 5 && " bg-purple-400"} ${className}`}
        onClick={onClick}
      >
        {show && (
          <img
            className="h-5 w-5 overflow-hidden"
            onError={() => setShow(false)}
            alt={data.name}
            src={CDN_SERVER + data.imgUrl}
            preview="false"
          />
        )}
        <div className="flex-auto truncate">{data.name}</div>
      </div>
    </TooltipWrapper>
  );
};

export default SkillCard;
