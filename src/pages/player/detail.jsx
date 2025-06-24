import React from "react";
import PlayerDetail from "@/components/player/PlayerDetail.jsx";

const PlayerDetailPage = (props) => {
  const id = props.match?.params?.id;
  return (
    <div className="flex flex-auto w-full flex-wrap max-w-6xl mx-auto">
      <PlayerDetail id={id} page />
    </div>
  );
};

export default PlayerDetailPage;
