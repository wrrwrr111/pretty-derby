import { Image } from "antd";
import { cdnServer } from "../../config";
const SupportCard = (props) => {
  const { data, onClick, className } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      <Image
        alt={data.name}
        src={cdnServer + data.imgUrl}
        preview={false}
        width={"100%"}
      ></Image>
    </div>
  );
};

export default SupportCard;
