import { useState } from "react";
import { CDN_SERVER } from "src/config";
import { useTranslation } from "react-i18next";
const SupportCard = (props) => {
  const { data, onClick, className } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  return data ? (
    <div className={`relative cursor-pointer ${className} pb-[134%]`} onClick={onClick}>
      <div className="absolute inset-1 flex flex-wrap items-center justify-center rounded-lg border-2 border-solid border-gray-500">
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
