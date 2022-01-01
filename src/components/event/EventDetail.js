import t from "../t.js";
import SkillList from "../skill/SkillList";
const EventDetail = ({ data }) => {
  // const ChoiceItem = props.event?.choiceList.map((choice,index)=>{
  //   const ResultItem = choice[1].map((result,index)=>
  //     <p key={index}>{result}</p>
  //   )
  //   return(
  //     <Row key={index} gutter={[8,8]} className="list-row">
  //       <Col span={12}>
  //         <p>{choice[0]}</p>
  //         <p>{t(choice[0])}</p>
  //       </Col>
  //       <Col span={12}>{ResultItem}</Col>
  //     </Row>
  //   )
  // })
  return data ? (
    <>
      <div className="font-semibold mb-1">{data.name}</div>
      <div className="font-semibold mb-1">{t(data.name)}</div>
      {data.choiceList.map((choice, index) => (
        <div className={`w-full flex py-2 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
          <div className="w-1/3 mr-4">
            <p>{choice[0]}</p>
            <p>{t(choice[0])}</p>
          </div>
          <div className="flex-auto">
            {choice[1].map((result) => (
              <p>{result}</p>
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
