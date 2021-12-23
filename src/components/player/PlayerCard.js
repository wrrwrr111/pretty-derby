import { cdnServer } from "../../config";
import t from '../t.js'
const PlayerCard = (props) => {
  const { data, onClick, className } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div className={`relative cursor-pointer ${className}`} onClick={onClick}
      style={{
        paddingBottom: '100%'
      }}
    >
      <div className='absolute top-3 left-1 right-1 bottom-2 flex items-center justify-center flex-wrap border-2 border-solid border-gray-500 rounded-lg'>
        <p className="truncate">{t(data.charaName)}</p>
        <p className="truncate">{t(data.name)}</p>
      </div>
      <img
        className='absolute top-0'
        alt={data.name}
        src={cdnServer + data.imgUrl}
        width={"100%"}
      ></img>
    </div>
  );
};

export default PlayerCard;
