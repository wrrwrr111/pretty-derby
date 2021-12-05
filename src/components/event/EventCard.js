import EventDetail from "./EventDetail";
const EventCard = (props) => {
  const { data, onClick, className } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div
      className={`border border-solid border-gray-700 px-2 rounded truncate cursor-pointer ${className}`}
      onClick={onClick}
      data-tip={``}
    >
      {data.name}
    </div>
  );
};

export default EventCard;
