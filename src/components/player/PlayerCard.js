import { useState } from "react";
import { CDN_SERVER } from "src/config";
import { useTranslation } from "react-i18next";
const PlayerCard = (props) => {
  const { data, onClick, className } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  return data ? (
    <div className={`relative cursor-pointer ${className} pb-[100%]`} onClick={onClick}>
      <div className="absolute top-3 left-1 right-1 bottom-2 flex flex-wrap items-center justify-center rounded-lg border-2 border-solid border-gray-500">
        <p className="truncate">{t(data.charaName)}</p>
        <p className="truncate">{t(data.name)}</p>
      </div>
      {show && (
        <img
          className="absolute top-0 aspect-[32/35]"
          onError={() => setShow(false)}
          alt={t(data.name)}
          src={CDN_SERVER + data.imgUrl}
          width={"100%"}
        />
      )}
    </div>
  ) : null;
};

export default PlayerCard;
