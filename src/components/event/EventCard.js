import { TooltipWrapper } from "react-tooltip";

const EventCard = (props) => {
  const { data, onClick, className } = props;
  if (!data) return null;
  return (
    <TooltipWrapper
      html={`<div>${data.choiceList
        .map(
          (choice, index) =>
            `<div className="w-full flex"><div>${choice[0]}</div><div>------</div>${choice[1]
              .map((result) => `<div>${result}</div>`)
              .join("")}</div>`
        )
        .join("<div>===========</div>")}</div>`}
    >
      <div
        className={`cursor-pointer truncate rounded border border-solid border-gray-700 px-2 ${className}`}
        onClick={onClick}
      >
        {data.name}
      </div>
    </TooltipWrapper>
  );
};

export default EventCard;
