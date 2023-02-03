import { useAtom } from "jotai";
import { type NextPage } from "next";
import {
  PlayerDetailDialog,
  playerDetailDialogIdAtom,
} from "../components/player/PlayerDetailDialog";

const Test: NextPage = () => {
  const [id, setId] = useAtom(playerDetailDialogIdAtom);
  return (
    <div>
      <div onClick={() => setId("B5ZpDRkc3gW")}>test</div>
      <PlayerDetailDialog />
    </div>
  );
};
export default Test;
