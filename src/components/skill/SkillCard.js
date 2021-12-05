import { cdnServer } from "../../config";
import t from "../t.js";
const SkillCard = (props) => {
  const { data, onClick, className } = props;
  // const skill = props.skill || db.get('skills').find({ id: props.id }).value()
  if (!data) {
    return <></>;
  }
  return (
    <div
      className={` rounded border-solid border-2  flex items-center cursor-pointer ${data.rarity === 1 && "bg-white"} ${data.rarity === 2 && "bg-yellow-300"} ${data.rarity === 3 && " bg-purple-400"} ${data.rarity === 4 && " bg-purple-400"} ${data.rarity === 5 && " bg-purple-400"} ${className}`}
      onClick={onClick}
      data-tip={`<p>${t(data.describe)}</p><p>${t(data.condition)}</p>`}
    >
      <img className='w-5' alt={data.name} src={cdnServer + data.imgUrl} preview={false}></img>
      <div className="flex-auto truncate">{data.name}</div>
    </div>
  );
};

export default SkillCard;
