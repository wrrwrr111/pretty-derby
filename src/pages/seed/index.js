import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
import {
  Row,
  Alert,
  Image,
  // Divider,
  Table,
  Modal,
  Col,
  Radio,
  Rate,
  Form,
  Slider,
  PageHeader,
  Input,
  // Space,
  Card,
  message,
} from "antd";
//test
import {
  PlusOutlined,
  SmileOutlined,
  FrownOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { useDB } from "../../hooks";
import dbL from "@/dbL.js";

import PlayerList from "@/components/player/PlayerList";
import SupportListWithFilter from "@/components/support/SupportListWithFilter";
import { CDN_SERVER, SEED_BLUE_LABELS, SEED_RED_LABELS, IMAGE_FALLBACK } from "@/config";
import { Helmet } from "react-helmet";

let userId = dbL.get("userId").value();

/*
userId 随机生成
种马玩家id
种马id
蓝色因子 - speed stamina power guts wisdom
红色因子 - grass dirt shortDistance mile mediumDistance longDistance
        - escapeR leadingR insertR trackingR
绿色因子
种马父id
种马母id

total blue
total red
white num
*/
// 生成一个userId

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
    triggerChange(data);
  };
  return (
    <>
      <Image
        src={data.imgUrl ? CDN_SERVER + data.imgUrl : ""}
        preview="false"
        fallback={IMAGE_FALLBACK}
        width={80}
        onClick={showPlayer}
      />
      <Modal
        visible={isPlayerVisible}
        onOk={closePlayer}
        onCancel={closePlayer}
        width={"80%"}
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
    triggerChange(data);
  };
  return (
    <>
      <Image
        src={data.imgUrl ? CDN_SERVER + data.imgUrl : ""}
        preview="false"
        fallback={IMAGE_FALLBACK}
        width={80}
        onClick={showSupport}
      />
      <Modal
        visible={isSupportVisible}
        onOk={closeSupport}
        onCancel={closeSupport}
        width={"80%"}
        bodyStyle={{ height: "90vh" }}
      >
        <div className="w-full h-full overflow-hidden flex relative">
          <SupportListWithFilter formName="seedSup" onClick={handleSelectSupport} sortFlag={true} />
        </div>
      </Modal>
    </>
  );
};
const SeedInput = (props) => {
  const [form] = Form.useForm();
  const [seed, setSeed] = useState({});

  const onFinish = async (value) => {
    let tmpSeed = seed;
    tmpSeed = Object.assign({}, seed, value);
    setSeed(tmpSeed);
    // 修整成需要的数据
    const formData = { ...tmpSeed };
    formData.userId = userId || dbL.get("userId").value();
    let updateTime = new Date().getTime();
    formData.updateTime = updateTime;
    formData["playerId0"] = value["player0"].id;
    formData["playerId1"] = value["player1"].id;
    formData["playerId2"] = value["player2"].id;
    formData["supportId"] = value["support"].id;
    delete formData["support"];
    delete formData["player0"];
    delete formData["player1"];
    delete formData["player2"];
    // formData[formData['blue0']]=formData['blueLevel0']
    // formData[formData['red0']]=formData['redLevel0']
    let list = ["0", "1", "2"];
    list.forEach((i) => {
      //统计蓝色因子
      if (formData[formData[`blue${i}`]] !== undefined) {
        formData[formData[`blue${i}`]] += formData[`blueLevel${i}`];
      } else {
        formData[formData[`blue${i}`]] = formData[`blueLevel${i}`];
      }
      //统计红色因子
      if (formData[formData[`red${i}`]] !== undefined) {
        formData[formData[`red${i}`]] += formData[`redLevel${i}`];
      } else {
        formData[formData[`red${i}`]] = formData[`redLevel${i}`];
      }
      //统计红色因子
      if (formData["white"] !== undefined) {
        formData["white"] += formData[`whiteNum${i}`];
      } else {
        formData["white"] = formData[`whiteNum${i}`];
      }
      //统计ura
      if (formData["uraLevel"] !== undefined) {
        formData["uraLevel"] += formData[`uraLevel${i}`];
      } else {
        formData["uraLevel"] = formData[`uraLevel${i}`];
      }
    });
    const res = await axios.post("https://urarawin.com/api/sqlite/add", formData);
    if (res.data && res.data.success) {
      message.info("成功添加");
      props.onFinish();
    } else {
      message.info("有地方出错了");
    }
  };
  const list = ["主要", "父辈1", "父辈2"];

  const getFields = () => {
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
        <Col span={8} key={i}>
          <PageHeader title={`${list[i]}`} />
          <Row>
            <Col span={6} offset={4}>
              <Form.Item label="角色" name={`player${i}`} rules={[{ required: true }]}>
                <PlayerInput />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="蓝色因子" name={`blue${i}`} rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value={"speed"}>{"速度"}</Radio.Button>
              <Radio.Button value={"stamina"}>{"耐力"}</Radio.Button>
              <Radio.Button value={"power"}>{"力量"}</Radio.Button>
              <Radio.Button value={"guts"}>{"根性"}</Radio.Button>
              <Radio.Button value={"wisdom"}>{"智力"}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="蓝色因子星数" name={`blueLevel${i}`} rules={[{ required: true }]}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="红色因子" name={`red${i}`} rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value={"grass"}>{"草地/芝"}</Radio.Button>
              <Radio.Button value={"dirt"}>{"泥地/ダート"}</Radio.Button>
              <hr />
              <Radio.Button value={"shortDistance"}>{"短距离"}</Radio.Button>
              <Radio.Button value={"mile"}>{"英里"}</Radio.Button>
              <Radio.Button value={"mediumDistance"}>{"中距离"}</Radio.Button>
              <Radio.Button value={"longDistance"}>{"长距离"}</Radio.Button>
              <hr />
              <Radio.Button value={"escapeR"}>{"逃"}</Radio.Button>
              <Radio.Button value={"leadingR"}>{"先"}</Radio.Button>
              <Radio.Button value={"insertR"}>{"差"}</Radio.Button>
              <Radio.Button value={"trackingR"}>{"追"}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="红色因子星数" name={`redLevel${i}`} rules={[{ required: true }]}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="绿色因子星数" name={`greenLevel${i}`} initialValue={0}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="URA因子星数" name={`uraLevel${i}`} initialValue={0}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="白色因子个数" name={`whiteNum${i}`} initialValue={0}>
            <Slider min={0} max={10} dots={true} tooltipPlacement={"left"} />
          </Form.Item>
        </Col>
      );
    }
    return children;
  };
  return (
    <Form name={"因子信息"} form={form} onFinish={onFinish}>
      <Alert
        message="目前每人只能配置一个种子 自觉维护自己的信息；第一次添加前先刷新 否则可能失败"
        type="info"
      />
      <Row gutter={24}>{getFields()}</Row>
      <Row justify="end">
        <Col span={3}>
          <Form.Item label="辅助卡" name={"support"} rules={[{ required: true }]}>
            <SupportInput />
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <Form.Item label="辅助卡突破" name={"supportLevel"} initialValue={0}>
            <Rate count={4} />
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <Form.Item
            label="玩家id"
            name="gameId"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.match(/^[0-9]\d*$/g) && value.length === 9) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("输入正确的9位数id"));
                },
              }),
            ]}
          >
            <Input placeholder="id" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={2} offset={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const SearchOne = (props) => {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          <Row>
            {fields.map((field, index) => (
              <Col key={field.key} lg={8} md={12} xs={24}>
                <Row>
                  <Form.Item
                    {...field}
                    name={[field.name, "attr"]}
                    fieldKey={[field.fieldKey, "attr"]}
                    rules={[{ required: true }]}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Radio.Group>
                      <Radio.Button value={"speed"}>{"速度"}</Radio.Button>
                      <Radio.Button value={"stamina"}>{"耐力"}</Radio.Button>
                      <Radio.Button value={"power"}>{"力量"}</Radio.Button>
                      <Radio.Button value={"guts"}>{"根性"}</Radio.Button>
                      <Radio.Button value={"wisdom"}>{"智力"}</Radio.Button>
                      <br />
                      <Radio.Button value={"grass"}>{"草地/芝"}</Radio.Button>
                      <Radio.Button value={"dirt"}>{"泥地/ダート"}</Radio.Button>
                      <br />
                      <Radio.Button value={"shortDistance"}>{"短距离"}</Radio.Button>
                      <Radio.Button value={"mile"}>{"英里"}</Radio.Button>
                      <Radio.Button value={"mediumDistance"}>{"中距离"}</Radio.Button>
                      <Radio.Button value={"longDistance"}>{"长距离"}</Radio.Button>
                      <br />
                      <Radio.Button value={"escapeR"}>{"逃"}</Radio.Button>
                      <Radio.Button value={"leadingR"}>{"先"}</Radio.Button>
                      <Radio.Button value={"insertR"}>{"差"}</Radio.Button>
                      <Radio.Button value={"trackingR"}>{"追"}</Radio.Button>
                      <br />
                      <Radio.Button value={"uraLevel"}>{"URA"}</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    {...field}
                    name={[field.name, "level"]}
                    fieldKey={[field.fieldKey, "level"]}
                    rules={[{ required: true }]}
                  >
                    <Rate count={props.max} />
                  </Form.Item>
                </Row>
                <Col span={5}>
                  <Button type="dashed" onClick={() => remove(field.name)}>
                    移除
                  </Button>
                </Col>
              </Col>
            ))}
          </Row>
          <Row justify="start">
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                // style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                添加过滤条件
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </Row>
        </>
      )}
    </Form.List>
  );
};

const SearchForm = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    let formData = { attrs: [], levels: [] };
    if (value["player0"]) {
      formData.attrs.push("playerId0");
      formData.levels.push(value["player0"].id);
    }
    if (value["supportLevel"]) {
      formData.attrs.push("supportLevel");
      formData.levels.push(value["supportLevel"]);
    }
    if (value["support"]) {
      formData.attrs.push("supportId");
      formData.levels.push(value["support"].id);
    }
    value.p0?.forEach((item) => {
      if (SEED_BLUE_LABELS[item.attr]) {
        formData["blue0"] = item.attr;
        formData.attrs.push("blueLevel0");
        formData.levels.push(item.level);
      } else if (SEED_RED_LABELS[item.attr]) {
        formData["red0"] = item.attr;
        formData.attrs.push("redLevel0");
        formData.levels.push(item.level);
      } else if (item.attr === "uraLevel") {
        formData.attrs.push("uraLevel0");
        formData.levels.push(item.level);
      }
    });
    value.p1?.forEach((item) => {
      formData.attrs.push(item.attr);
      formData.levels.push(item.level);
    });

    props.search(formData);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form name="搜索" form={form} onFinish={onFinish} className="seed-form">
      <Row>
        <Form.Item label="角色" name={`player0`}>
          <PlayerInput />
        </Form.Item>
      </Row>
      <SearchOne name="p0" max="3" />
      <div>总计:</div>
      <SearchOne name="p1" max="9" />
      <Row>
        <Form.Item label="支援卡" name={"support"}>
          <SupportInput />
        </Form.Item>
        <Form.Item label="突破等级" name={"supportLevel"} initialValue={0}>
          <Rate count={4} />
        </Form.Item>
      </Row>
      <Row justify="end">
        <Form.Item>
          <Button htmlType="button" onClick={() => onReset()}>
            重置
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

const PlayerImage = (props) => {
  const db = useDB();
  if (!db) return null;
  let imgUrl = db.get("players").find({ id: props.id }).value().imgUrl;
  return <Image src={CDN_SERVER + imgUrl} fallback={IMAGE_FALLBACK} width={80} preview="false" />;
};

const SupportImage = (props) => {
  const db = useDB();
  if (!db) return null;
  let support = db.get("supports").find({ id: props.id }).value();
  let imgUrl = "";
  if (support) {
    imgUrl = support.imgUrl;
  }
  return <Image src={CDN_SERVER + imgUrl} fallback={IMAGE_FALLBACK} width={80} preview="false" />;
};

const Seed = () => {
  const [isSeedInputVisible, setIsSeedInputVisible] = useState(false);
  const [seedList, setSeedList] = useState([]);
  const [total, setTotal] = useState(0);
  // const [current, setCurrent] = useState(0)
  const [value, setValue] = useState();

  const columns = [
    {
      title: "玩家id",
      dataIndex: "gameId",
      key: "gameId",
      render: (text, seed) => (
        <>
          <Row>
            <p>{text}</p>
            <CopyToClipboard text={text} onCopy={() => message.info("成功")}>
              <CopyOutlined />
            </CopyToClipboard>
          </Row>
          <Row align="middle">
            <SmileOutlined onClick={() => like(seed)} />
            <p>{seed.likes}</p>
          </Row>
          <Row align="middle">
            <FrownOutlined onClick={() => dislike(seed)} />
            <p>{seed.dislikes}</p>
          </Row>
          {seed.userId === userId && (
            <Row align="middle">
              <DeleteOutlined onClick={() => deleteSeed(seed)} />
            </Row>
          )}
        </>
      ),
    },
    {
      title: "主要",
      dataIndex: "playerId0",
      key: "playerId0",
      render: (text) => <PlayerImage id={text} />,
    },
    {
      title: "蓝色因子",
      dataIndex: "blue0",
      key: "blue0",
      render: (text, record) => (
        <span className="rate-label">{`${SEED_BLUE_LABELS[text]}\xa0\xa0${record["blueLevel0"]}`}</span>
      ),
    },
    {
      title: "红色因子",
      dataIndex: "red0",
      key: "red0",
      render: (text, record) => (
        <span className="rate-label">{`${SEED_RED_LABELS[text]}\xa0\xa0${record["redLevel0"]}`}</span>
      ),
    },
    {
      title: "绿色因子",
      dataIndex: "greenLevel0",
      key: "greenLevel0",
      render: (text, record) => (
        <span className="rate-label">{`固有\xa0\xa0${record["greenLevel0"]}`}</span>
      ),
    },
    {
      title: "URA",
      dataIndex: "uraLevel0",
      key: "uraLevel0",
      render: (text, record) => (
        <span className="rate-label">
          {`${record["uraLevel0"] ? `URA  ${record["uraLevel0"]}` : ""}`}
        </span>
      ),
    },
    {
      title: "父辈1",
      dataIndex: "playerId1",
      key: "playerId1",
      render: (text) => <PlayerImage id={text} />,
    },
    {
      title: "父辈2",
      dataIndex: "playerId2",
      key: "playerId2",
      render: (text) => <PlayerImage id={text} />,
    },
    {
      title: "总计蓝色",
      key: "allBlue",
      render: (text, record) =>
        Object.keys(SEED_BLUE_LABELS).map((key) => {
          if (record[key]) {
            return (
              <span
                key={key}
                className="rate-label"
              >{`${SEED_BLUE_LABELS[key]}\xa0\xa0${record[key]}`}</span>
            );
          } else {
            return null;
          }
        }),
    },
    {
      title: "总计红色",
      key: "allRed",
      render: (text, record) =>
        Object.keys(SEED_RED_LABELS).map((key) => {
          if (record[key]) {
            return (
              <span
                key={key}
                className="rate-label"
              >{`${SEED_RED_LABELS[key]}\xa0\xa0${record[key]}`}</span>
            );
          } else {
            return null;
          }
        }),
    },
    { title: "总计URA", dataIndex: "uraLevel", key: "uraLevel", render: (text) => text },
    { title: "总计白色", dataIndex: "white", key: "white", render: (text) => text },
    {
      title: "支援卡",
      dataIndex: "supportId",
      key: "supportId",
      render: (text) => <SupportImage id={text} />,
    },
    {
      title: "突破等级",
      dataIndex: "supportLevel",
      key: "supportLevel",
      render: (text, record) => (
        <Row>
          <Rate count={4} value={record["supportLevel"]} disabled />
        </Row>
      ),
    },
  ];

  const showSeedInput = (index) => {
    setIsSeedInputVisible(true);
  };
  const closeSeedInput = () => {
    setIsSeedInputVisible(false);
  };
  const showMySeed = () => {
    search({ attrs: ["userId"], levels: [userId] });
  };
  const deleteSeed = async (value) => {
    const res = await axios.post("https://urarawin.com/api/sqlite/delete", value);
    if (res.data) {
      message.info("成功删除");
    } else {
      message.info("出错了");
    }
  };
  const search = async (value) => {
    setValue(value);
    const res = await axios.post("https://urarawin.com/api/sqlite/search", value);
    // setCurrent(0)
    if (res.data) {
      if (res.data.count) {
        setSeedList([...res.data.list]);
        setTotal(res.data.count);
      } else {
        setSeedList([]);
        setTotal(0);
        message.info("暂无数据");
      }
    } else {
      message.info("出错了");
    }
  };
  const like = async (seed) => {
    if (!userId) {
      message.info("刷新后重试");
      return;
    }
    let id = seed.id;
    const res = await axios.post("https://urarawin.com/api/sqlite/like", { id, userId });
    if (res.data) {
      message.info("成功");
      seed.likes += 1;
    }
    setSeedList([...seedList]);
  };
  const dislike = async (seed) => {
    if (!userId) {
      message.info("刷新后重试");
      return;
    }
    let id = seed.id;
    const res = await axios.post("https://urarawin.com/api/sqlite/dislike", { id, userId });
    if (res.data) {
      message.info("成功");
      seed.dislikes += 1;
    }
    setSeedList([...seedList]);
  };
  const onChange = (e) => {
    search({
      ...value,
      count: e.total,
      offset: e.current * 10 - 10,
    });
  };
  return (
    <>
      <Helmet>
        <title>分享 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Helmet>
      <div className="seed-container">
        <Card className="card" title="过滤条件">
          <SearchForm search={search} />
          <Button onClick={() => showSeedInput()}>配置我的种子</Button>
          <Button onClick={() => showMySeed()}>查看我的种子</Button>
        </Card>
        <Card className="card" title="结果">
          <Table
            columns={columns}
            dataSource={seedList}
            onChange={onChange}
            pagination={{
              pageSize: 10,
              total: total,
              simple: true,
              showQuickJumper: false,
              position: ["topRight", "bottomRight"],
            }}
            rowKey={"id"}
          />
        </Card>
      </div>
      <Modal
        visible={isSeedInputVisible}
        onOk={closeSeedInput}
        onCancel={closeSeedInput}
        footer={null}
        width={"80%"}
      >
        <SeedInput onFinish={closeSeedInput} />
      </Modal>
    </>
  );
};
export default Seed;
