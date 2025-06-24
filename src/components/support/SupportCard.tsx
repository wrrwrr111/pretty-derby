import { useState } from "react";
import { CDN_SERVER } from "@/config";
import { useTranslation } from "react-i18next";
const SupportCard = (props) => {
  const { data, onClick, className } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  return data ? (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        paddingBottom: "134%",
      }}
    >
      <div className="absolute inset-1 flex items-center justify-center flex-wrap border-2 border-solid border-gray-500 rounded-lg">
        <p className="">{t(data.charaName)}</p>
        <p className="">{t(data.name)}</p>
      </div>
      {show && (
        <img
          className="absolute top-0"
          onError={() => setShow(false)}
          alt={data.name}
          src={CDN_SERVER + data.imgUrl}
          width={"100%"}
        />
      )}
    </div>
  ) : null;
};

export default SupportCard;
