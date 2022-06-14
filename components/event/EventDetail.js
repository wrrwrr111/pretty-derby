import SkillList from "../skill/SkillList";
import { useTranslation } from "react-i18next";
const EventDetail = ({ data }) => {
  const { t } = useTranslation();
  return data ? (
    <>
      <div className="font-semibold mb-1">{data.name}</div>
      <div className="font-semibold mb-1">{t(data.name)}</div>
      {data.choiceList.map((choice, index) => (
        <div
          key={choice}
          className={`w-full flex py-2 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
        >
          <div className="w-1/3 mr-4">
            <p>{choice[0]}</p>
            <p>{t(choice[0])}</p>
          </div>
          <div className="flex-auto">
            {choice[1].map((result) => (
              <p key={result}>{result}</p>
            ))}
          </div>
        </div>
      ))}
      {data.skills && (
        <>
          <div className="font-semibold mb-1">{t("技能")}</div>
          <SkillList idList={data.skills || []} />
        </>
      )}
    </>
  ) : null;
};
export default EventDetail;
