import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";

import { Picker, List } from "antd-mobile";

import { Image, Modal, Rate, Form, message } from "antd";
//test
import { PlusOutlined, SmileOutlined, FrownOutlined, CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

import dbL from "../../dbL";
import SupportListWithFilter from "@/components/support/SupportListWithFilter";
import PlayerList from "@/components/player/PlayerList.js";

import { useDB } from "../../hooks";
import { useTranslation } from "react-i18next";

import { CDN_SERVER, SEED_BLUE_LABELS, SEED_RED_LABELS, IMAGE_FALLBACK } from "@/config";
import { Helmet } from "react-helmet";
let userId = dbL.get("userId").value();

const PlayerInput = ({ value = {}, onChange }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [data, setData] = useState({});
  const showPlayer = (index) => {
    setIsPlayerVisible(true);
  };
  const closePlayer = () => {
    setIsPlayerVisible(false);
  };
  const triggerChange = (changedValue) => {
    setIsPlayerVisible(false);
    onChange?.({
      ...data,
      ...value,
      ...changedValue,
    });
  };
  const handleSelectPlayer = (data) => {
    setData(data);
    closePlayer();
    triggerChange(data);
  };
  return (
    <>
      <div className="w-16 h-16">
        <Image
          src={data.imgUrl ? CDN_SERVER + data.imgUrl : ""}
          preview="false"
          fallback={IMAGE_FALLBACK}
          onClick={showPlayer}
        />
      </div>
      <Modal
        visible={isPlayerVisible}
        onOk={closePlayer}
        onCancel={closePlayer}
        width={"100%"}
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <PlayerList sortFlag={true} onClick={handleSelectPlayer} />
      </Modal>
    </>
  );
};
const SupportInput = ({ value = {}, onChange }) => {
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [data, setData] = useState({});
  const showSupport = (index) => {
    setIsSupportVisible(true);
  };
  const closeSupport = () => {
    setIsSupportVisible(false);
  };
  const triggerChange = (changedValue) => {
    setIsSupportVisible(false);
    onChange?.({
      ...data,
      ...value,
      ...changedValue,
    });
  };
  const handleSelectSupport = (data) => {
    setData(data);
    closeSupport();
    triggerChange(data);
  };
  return (
    <>
      <div className="w-16 h-16">
        <Image
          src={data.imgUrl ? CDN_SERVER + data.imgUrl : ""}
          preview="false"
          fallback={IMAGE_FALLBACK}
          onClick={showSupport}
        />
      </div>
      <Modal
        visible={isSupportVisible}
        onOk={closeSupport}
        onCancel={closeSupport}
        width={"100%"}
        bodyStyle={{ height: "80vh" }}
      >
        <div className="w-full h-full overflow-hidden flex relative">
          <SupportListWithFilter
            formName="seedSupMo"
            onClick={handleSelectSupport}
            sortFlag={true}
          />
        </div>
      </Modal>
    </>
  );
};

const SearchOne = (props) => {
  const { t } = useTranslation();
  const PICKER_LISTS = [
    [
      { value: "speed", label: t("速度") },
      { value: "stamina", label: t("耐力") },
      { value: "power", label: t("力量") },
      { value: "guts", label: t("根性") },
      { value: "wisdom", label: t("智力") },
      { value: "grass", label: t("草地") },
      { value: "dirt", label: t("泥地") },
      { value: "shortDistance", label: t("短距离") },
      { value: "mile", label: t("英里") },
      { value: "mediumDistance", label: t("中距离") },
      { value: "longDistance", label: t("长距离") },
      { value: "escapeR", label: t("逃") },
      { value: "leadingR", label: t("先") },
      { value: "insertR", label: t("差") },
      { value: "trackingR", label: t("追") },
    ],
    [
      { value: 1, label: `1${t("星")}` },
      { value: 2, label: `2${t("星")}` },
      { value: 3, label: `3${t("星")}` },
      { value: 4, label: `4${t("星")}` },
      { value: 5, label: `5${t("星")}` },
      { value: 6, label: `6${t("星")}` },
      { value: 7, label: `7${t("星")}` },
      { value: 8, label: `8${t("星")}` },
      { value: 9, label: `9${t("星")}` },
    ],
  ];
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }, { errors }) => (
        <List>
          {fields.map((field, index) => (
            <Form.Item
              {...field}
              key={field.key}
              name={[field.name, "attr"]}
              fieldKey={[field.fieldKey, "attr"]}
              rules={[{ required: true }]}
              validateTrigger={["onChange", "onBlur"]}
              noStyle
            >
              <Picker data={PICKER_LISTS} cascade={false} extra={t("请选择")}>
                <List.Item arrow="horizontal">{t("过滤条件(总计)")}</List.Item>
              </Picker>
            </Form.Item>
          ))}
          <List.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              {t("添加过滤条件")}
            </Button>
          </List.Item>
        </List>
      )}
    </Form.List>
  );
};
const SearchForm = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    let formData = { attrs: [], levels: [] };
    if (value["player0"]) {
      formData.attrs.push("playerId0");
      formData.levels.push(value["player0"].id);
    }
    if (value["support"]) {
      formData.attrs.push("supportId");
      formData.levels.push(value["support"].id);
    }
    value.p1?.forEach((item) => {
      formData.attrs.push(item.attr[0]);
      formData.levels.push(item.attr[1]);
    });

    props.search(formData);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form name="搜索" form={form} onFinish={onFinish} className="seed-form w-full">
      <SearchOne name="p1" />
      <div className="grid grid-cols-4 w-full " align="start">
        <div>
          {t("角色")}
          <Form.Item name={`player0`}>
            <PlayerInput />
          </Form.Item>
        </div>
        <div>
          {t("支援卡")}
          <Form.Item name={"support"}>
            <SupportInput />
          </Form.Item>
        </div>
        <div className="col-span-2">
          {t("突破等级")}
          <Form.Item name={"supportLevel"} initialValue={0}>
            <Rate count={4} />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="button" onClick={() => onReset()}>
            {t("重置")}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("搜索")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

const SeedCard = (props) => {
  const { t } = useTranslation();
  const db = useDB();
  if (!db) return null;
  const data = props.data;
  const player = db.get("players").find({ id: data.playerId0 }).value();
  const support = db.get("supports").find({ id: data.supportId }).value();
  const like = async (seed) => {
    if (!userId) {
      message.info(t("刷新后重试"));
      return;
    }
    let id = seed.id;
    const res = await axios.post("https://urarawin.com/api/sqlite/like", { id, userId });
    if (res.data) {
      message.info(t("成功"));
      seed.likes += 1;
    }
  };
  const dislike = async (seed) => {
    if (!userId) {
      message.info(t("刷新后重试"));
      return;
    } else if (seed.dislikes && seed.dislikes.indexOf(userId) !== -1) {
      return;
    }
    let id = seed.id;
    const res = await axios.post("https://urarawin.com/api/sqlite/dislike", { id, userId });
    if (res.data) {
      message.info(t("成功"));
      seed.dislikes += 1;
    }
  };
  return (
    <div className="w-1/2 p-1">
      <div className="border-green-300 border border-solid flex flex-col">
        <CopyToClipboard text={data.gameId} onCopy={() => message.info("成功")}>
          <div className="w-full flex text-lg">
            {data.gameId}
            <CopyOutlined />
          </div>
        </CopyToClipboard>
        <div className="w-full flex items-center justify-around">
          {player && (
            <img alt={player.name} src={CDN_SERVER + player.imgUrl} className="w-10 h-10" />
          )}
          {support && <img alt={support.name} src={CDN_SERVER + support.imgUrl} className="w-10" />}
          <div className="text-lg flex" onClick={() => like(data)}>
            <SmileOutlined />
            <div>{data.likes}</div>
          </div>
          <div className="text-lg flex" onClick={() => dislike(data)}>
            <FrownOutlined />
            <div>{data.dislikes}</div>
          </div>
        </div>
        <div>{`${t(SEED_BLUE_LABELS[data["blue0"]])}: ${data["blueLevel0"]}`}</div>
        <div>{`${t(SEED_RED_LABELS[data["red0"]])}: ${data["redLevel0"]}`}</div>
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
        <div>{`${t("突破等级")}: ${data["supportLevel"] || 0}`}</div>
      </div>
    </div>
  );
};
const Seed = () => {
  const { t } = useTranslation();

  const [seedList, setSeedList] = useState([]);
  const search = async (value) => {
    const res = await axios.post("https://urarawin.com/api/sqlite/search", value);
    if (res.data) {
      if (res.data.count) {
        setSeedList([...res.data.list]);
      } else {
        message.info(t("暂无数据"));
      }
    } else {
      message.info(t("出错了"));
    }
  };
  return (
    <div className="w-full flex flex-wrap px-3">
      <Helmet>
        <title>分享 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Helmet>
      <SearchForm search={search} />
      <div className="w-full text-lg font-semibold">{t("结果")}</div>
      {seedList.map((seed) => {
        return <SeedCard key={seed.id} data={seed} />;
      })}
    </div>
  );
};
export default Seed;
