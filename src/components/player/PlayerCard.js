import { useState } from "react";
import { cdnServer } from "../../config";
import { useTranslation } from "react-i18next";
const PlayerCard = (props) => {
  const { data, onClick, className } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  return data ? (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        paddingBottom: "100%",
      }}
    >
      <div className="absolute top-3 left-1 right-1 bottom-2 flex items-center justify-center flex-wrap border-2 border-solid border-gray-500 rounded-lg">
        <p className="truncate">{t(data.charaName)}</p>
        <p className="truncate">{t(data.name)}</p>
      </div>
      {show && (
        <img
          className="absolute top-0"
          style={{ aspectRatio: "32 / 35" }}
          onError={() => setShow(false)}
          alt={t(data.name)}
          src={cdnServer + data.imgUrl}
          width={"100%"}
        />
      )}
    </div>
  ) : null;
};

export default PlayerCard;
