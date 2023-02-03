import Head from "next/head";
import { PlayerList } from "../components/player/PlayerList";

export default () => {
  return (
    <div className="container mx-auto flex-auto">
      <Head>
        <title>角色 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Head>
      <PlayerList sortFlag />
    </div>
  );
};
