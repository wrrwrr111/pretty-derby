import React from "react";
import { useDB } from "@/hooks";
import { Smile, Frown, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { CDN_SERVER, SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";
import dbL from "@/dbL";
import { toast } from "sonner";

const userId = dbL.get("userId").value();

const MobileSeedCard = ({ data }) => {
  const { t } = useTranslation();
  const { db } = useDB();

  if (!db) return null;

  const player = db.get("players").find({ id: data.playerId0 }).value();
  const support = db.get("supports").find({ id: data.supportId }).value();

  const like = async (seed) => {
    if (!userId) {
      toast.info(t("刷新后重试"));
      return;
    }
    const res = await axios.post(
      "https://urarawin-worker.urarawin.workers.dev/api/sqlite/like",
      { id: seed.id, userId }
    );
    if (res.data) {
      toast.info(t("成功"));
      seed.likes += 1;
    }
  };

  const dislike = async (seed) => {
    if (!userId) {
      toast.info(t("刷新后重试"));
      return;
    } else if (seed.dislikes && seed.dislikes.indexOf(userId) !== -1) {
      return;
    }
    const res = await axios.post(
      "https://urarawin-worker.urarawin.workers.dev/api/sqlite/dislike",
      { id: seed.id, userId }
    );
    if (res.data) {
      toast.info(t("成功"));
      seed.dislikes += 1;
    }
  };

  return (
    <div className="w-1/2 p-1">
      <div className="border-green-300 border border-solid flex flex-col">
        <CopyToClipboard text={data.gameId} onCopy={() => message.info("成功")}>
          <div className="w-full flex text-lg">
            {data.gameId}
            <Copy />
          </div>
        </CopyToClipboard>
        <div className="w-full flex items-center justify-around">
          {player && (
            <img
              alt={player.name}
              src={CDN_SERVER + player.imgUrl}
              className="w-10 h-10"
            />
          )}
          {support && (
            <img
              alt={support.name}
              src={CDN_SERVER + support.imgUrl}
              className="w-10"
            />
          )}
          <div className="text-lg flex" onClick={() => like(data)}>
            <Smile />
            <div>{data.likes}</div>
          </div>
          <div className="text-lg flex" onClick={() => dislike(data)}>
            <Frown />
            <div>{data.dislikes}</div>
          </div>
        </div>
        <div>{`${t(SEED_BLUE_LABELS[data.blue0])}: ${data.blueLevel0}`}</div>
        <div>{`${t(SEED_RED_LABELS[data.red0])}: ${data.redLevel0}`}</div>
        {Object.keys(SEED_BLUE_LABELS).map((key) =>
          data[key] ? (
            <div key={key}>{`${t("总计")} ${t(SEED_BLUE_LABELS[key])}: ${data[key]}`}</div>
          ) : null
        )}
        {Object.keys(SEED_RED_LABELS).map((key) =>
          data[key] ? (
            <div key={key}>{`${t("总计")} ${t(SEED_RED_LABELS[key])}: ${data[key]}`}</div>
          ) : null
        )}
        <div>{`${t("突破等级")}: ${data.supportLevel || 0}`}</div>
      </div>
    </div>
  );
};

export default MobileSeedCard;
