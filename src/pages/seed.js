import React, { useState } from "react";
import {
  Row,
  Alert,
  Image,
  Button,
  Divider,
  Table,
  Modal,
  Col,
  Radio,
  Rate,
  Form,
  Slider,
  PageHeader,
  Input,
  Space,
  Card,
} from "antd";
import { message } from "antd";
//test
import { PlusOutlined, SmileOutlined, FrownOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

import axios from "axios";
import db from "../db.js";
import dbL from "../dbL.js";
import t from "../components/t.js";
import "./seed.css";

import Player from "./player.js";
import Support from "./support.js";
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";
// db.set('userId',null).write()
let userId = dbL.get("userId").value();
// console.log(userId)

/*
userId 随机生成
种马玩家id
种马id
蓝色因子 - speed stamina power guts wisdom
红色因子 - grass dirt shortDistance mile mediumDistance longDistance
        - escape leading insert tracking
绿色因子
种马父id
种马母id

total blue
total red
white num
*/
// 生成一个userId

const blueLabels = {
  speed: "速度",
  stamina: "耐力",
  power: "力量",
  guts: "根性",
  wisdom: "智力",
};
const redLabels = {
  grass: "草地",
  dirt: "泥地",
  shortDistance: "短距离",
  mile: "英里",
  mediumDistance: "中距离",
  longDistance: "长距离",
  escape: "逃",
  leading: "先",
  insert: "差",
  tracking: "追",
};

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
        src={data.imgUrl ? cdnServer + data.imgUrl : ""}
        preview={false}
        fallback="data:image/png;base64,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"
        width={80}
        onClick={showPlayer}
      ></Image>
      <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} width={"80%"}>
        <Player onSelect={handleSelectPlayer}></Player>
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
        src={data.imgUrl ? cdnServer + data.imgUrl : ""}
        preview={false}
        fallback="data:image/png;base64,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"
        width={80}
        onClick={showSupport}
      ></Image>
      <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} width={"80%"}>
        <Support onSelect={handleSelectSupport}></Support>
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
    // db.set('form',form).write()
    // 修整成需要的数据
    const formData = { ...tmpSeed };
    formData.userId = userId || dbL.get("userId").value();
    let updateTime = new Date().getTime();
    formData.updateTime = updateTime;
    formData["playerId-0"] = value["player-0"].id;
    formData["playerId-1"] = value["player-1"].id;
    formData["playerId-2"] = value["player-2"].id;
    formData["supportId"] = value["support"].id;
    delete formData["support"];
    delete formData["player-0"];
    delete formData["player-1"];
    delete formData["player-2"];
    // formData[formData['blue-0']]=formData['blueLevel-0']
    // formData[formData['red-0']]=formData['redLevel-0']
    let list = ["0", "1", "2"];
    list.forEach((i) => {
      //统计蓝色因子
      if (formData[formData[`blue-${i}`]] !== undefined) {
        formData[formData[`blue-${i}`]] += formData[`blueLevel-${i}`];
      } else {
        formData[formData[`blue-${i}`]] = formData[`blueLevel-${i}`];
      }
      //统计红色因子
      if (formData[formData[`red-${i}`]] !== undefined) {
        formData[formData[`red-${i}`]] += formData[`redLevel-${i}`];
      } else {
        formData[formData[`red-${i}`]] = formData[`redLevel-${i}`];
      }
      //统计红色因子
      if (formData["white"] !== undefined) {
        formData["white"] += formData[`whiteNum-${i}`];
      } else {
        formData["white"] = formData[`whiteNum-${i}`];
      }
      //统计ura
      if (formData["uraLevel"] !== undefined) {
        formData['uraLevel'] += formData[`uraLevel-${i}`]
      } else {
        formData['uraLevel'] = formData[`uraLevel-${i}`]
      }

    });
    const res = await axios.post("https://urarawin.com/api/add", formData);
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
          <PageHeader title={`${list[i]}`}></PageHeader>
          <Row>
            <Col span={6} offset={4}>
              <Form.Item label="角色" name={`player-${i}`} rules={[{ required: true }]}>
                <PlayerInput></PlayerInput>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="蓝色因子" name={`blue-${i}`} rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value={"speed"}>{"速度"}</Radio.Button>
              <Radio.Button value={"stamina"}>{"耐力"}</Radio.Button>
              <Radio.Button value={"power"}>{"力量"}</Radio.Button>
              <Radio.Button value={"guts"}>{"根性"}</Radio.Button>
              <Radio.Button value={"wisdom"}>{"智力"}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="蓝色因子星数" name={`blueLevel-${i}`} rules={[{ required: true }]}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="红色因子" name={`red-${i}`} rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value={"grass"}>{"草地/芝"}</Radio.Button>
              <Radio.Button value={"dirt"}>{"泥地/ダート"}</Radio.Button>
              <hr />
              <Radio.Button value={"shortDistance"}>{"短距离"}</Radio.Button>
              <Radio.Button value={"mile"}>{"英里"}</Radio.Button>
              <Radio.Button value={"mediumDistance"}>{"中距离"}</Radio.Button>
              <Radio.Button value={"longDistance"}>{"长距离"}</Radio.Button>
              <hr />
              <Radio.Button value={"escape"}>{"逃"}</Radio.Button>
              <Radio.Button value={"leading"}>{"先"}</Radio.Button>
              <Radio.Button value={"insert"}>{"差"}</Radio.Button>
              <Radio.Button value={"tracking"}>{"追"}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="红色因子星数" name={`redLevel-${i}`} rules={[{ required: true }]}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="绿色因子星数" name={`greenLevel-${i}`} initialValue={0}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="URA因子星数" name={`uraLevel-${i}`} initialValue={0}>
            <Rate count={3} />
          </Form.Item>
          <Form.Item label="白色因子个数" name={`whiteNum-${i}`} initialValue={0}>
            <Slider min={0} max={10} dots={true} tooltipPlacement={"left"}></Slider>
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
      ></Alert>
      <Row gutter={24}>{getFields()}</Row>
      <Row justify="end">
        <Col span={3}>
          <Form.Item label="辅助卡" name={"support"} rules={[{ required: true }]}>
            <SupportInput></SupportInput>
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
                  console.log("!!!!", value);
                  if (value.match(/^[0-9]\d*$/g) && value.length === 9) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("输入正确的9位数id"));
                },
              }),
            ]}
          >
            <Input placeholder="id" style={{ width: "100%" }}></Input>
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
                        <Radio.Button value={"escape"}>{"逃"}</Radio.Button>
                        <Radio.Button value={"leading"}>{"先"}</Radio.Button>
                        <Radio.Button value={"insert"}>{"差"}</Radio.Button>
                        <Radio.Button value={"tracking"}>{"追"}</Radio.Button>
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
      formData.attrs.push("playerId-0");
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
      if (blueLabels[item.attr]) {
        formData["blue-0"] = item.attr;
        formData.attrs.push("blueLevel-0");
        formData.levels.push(item.level);
      } else if(redLabels[item.attr]){
        formData["red-0"] = item.attr;
        formData.attrs.push("redLevel-0");
        formData.levels.push(item.level);
      } else if(item.attr==='uraLevel'){
        formData.attrs.push("uraLevel-0");
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
          <PlayerInput></PlayerInput>
        </Form.Item>
      </Row>
      <SearchOne name="p0" max="3"></SearchOne>
      <div>总计:</div>
      <SearchOne name="p1" max="9"></SearchOne>
      <Row>
        <Form.Item label="支援卡" name={"support"}>
          <SupportInput></SupportInput>
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
  let imgUrl = db.get("players").find({ id: props.id }).value().imgUrl;
  return (
    <Image
      src={cdnServer + imgUrl}
      fallback="data:image/png;base64,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"
      width={80}
      preview={false}
    ></Image>
  );
};

const SupportImage = (props) => {
  let support = db.get("supports").find({ id: props.id }).value();
  let imgUrl = "";
  if (support) {
    imgUrl = support.imgUrl;
  }
  return (
    <Image
      src={cdnServer + imgUrl}
      fallback="data:image/png;base64,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"
      width={80}
      preview={false}
    ></Image>
  );
};

const Seed = () => {
  const [isSeedInputVisible, setIsSeedInputVisible] = useState(false);
  const [seedList, setSeedList] = useState([]);

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
              <Button shape="circle" icon={<CopyOutlined />} />
            </CopyToClipboard>
          </Row>
          <Row align="middle">
            <Button shape="circle" icon={<SmileOutlined />} onClick={() => like(seed)} />
            <p>{seed.likes ? seed.likes.length : 0}</p>
          </Row>
          <Row align="middle">
            <Button shape="circle" icon={<FrownOutlined />} onClick={() => dislike(seed)} />
            <p>{seed.dislikes ? seed.dislikes.length : 0}</p>
          </Row>
          {seed.userId===userId&&<Row align="middle">
            <Button shape="circle" icon={<DeleteOutlined />}
            style = {{color:'red'}} onClick={() => deleteSeed(seed)} />
          </Row>}
        </>
      ),
    },
    {
      title: "主要",
      dataIndex: "playerId-0",
      key: "playerId-0",
      render: (text) => <PlayerImage id={text}></PlayerImage>,
    },
    {
      title: "蓝色因子",
      dataIndex: "blue-0",
      key: "blue-0",
      render: (text, record) =>
          <span className="rate-label">
          {`${blueLabels[text]}\xa0\xa0${record["blueLevel-0"]}`}
          </span>
      ,
    },
    {
      title: "红色因子",
      dataIndex: "red-0",
      key: "red-0",
      render: (text, record) =>
          <span className="rate-label">
            {`${redLabels[text]}\xa0\xa0${record["redLevel-0"]}`}
          </span>
      ,
    },
    {
      title: "绿色因子",
      dataIndex: "greenLevel-0",
      key: "greenLevel-0",
      render: (text, record) =>
          <span className="rate-label">
          {`固有\xa0\xa0${record["greenLevel-0"]}`}
          </span>
      ,
    },{
      title: "URA",
      dataIndex: "uraLevel-0",
      key: "uraLevel-0",
      render: (text, record) =>
          <span className="rate-label">
            {`URA\xa0\xa0${record["uraLevel-0"]}`}
          </span>
      ,
    },
    {
      title: "父辈1",
      dataIndex: "playerId-1",
      key: "playerId-1",
      render: (text) => <PlayerImage id={text}></PlayerImage>,
    },
    {
      title: "父辈2",
      dataIndex: "playerId-2",
      key: "playerId-2",
      render: (text) => <PlayerImage id={text}></PlayerImage>,
    },
    {
      title: "总计蓝色",
      key: "allBlue",
      render: (text, record) =>
        Object.keys(blueLabels).map((key) => {
          if (record[key]) {
            // console.log(key,record[key])
            return (
                  <span className="rate-label">
                    {`${blueLabels[key]}\xa0\xa0${record[key]}`}
                  </span>
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
        Object.keys(redLabels).map((key) => {
          if (record[key]) {
            return (
                  <span className="rate-label">
                    {`${redLabels[key]}\xa0\xa0${record[key]}`}
                  </span>
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
      render: (text) => <SupportImage id={text}></SupportImage>,
    },
    {
      title: "突破等级",
      dataIndex: "supportLevel",
      key: "supportLevel",
      render: (text, record) => (
        <Row>
          <Rate count={4} value={record["supportLevel"]} disabled></Rate>
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
  const showMySeed = ()=>{
    search({attrs:['userId'],levels:[userId]})
  }
  const deleteSeed = async (value)=>{
    const res = await axios.post("https://urarawin.com/api/delete", value);
    if (res.data) {
      message.info("成功删除");
    } else {
      message.info("出错了");
    }
  }
  const search = async (value) => {
    const res = await axios.post("https://urarawin.com/api/search", value);
    if (res.data) {
      if (res.data.length) {
        setSeedList([...res.data]);
      } else {
        setSeedList([]);
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
    } else if (seed.likes && seed.likes.indexOf(userId) !== -1) {
      return;
    }
    let id = seed.id;
    const res = await axios.post("https://urarawin.com/api/like", { id, userId });
    if (res.data) {
      message.info("成功");
      seed.likes ? seed.likes.push(userId) : (seed.likes = [userId]);
      seed.dislikes && seed.dislikes.splice(seed.dislikes.indexOf(userId), 1);
    }
    setSeedList([...seedList]);
  };
  const dislike = async (seed) => {
    if (!userId) {
      message.info("刷新后重试");
      return;
    } else if (seed.dislikes && seed.dislikes.indexOf(userId) !== -1) {
      return;
    }
    let id = seed.id;
    const res = await axios.post("https://urarawin.com/api/dislike", { id, userId });
    if (res.data) {
      message.info("成功");
      seed.likes && seed.likes.splice(seed.likes.indexOf(userId), 1);
      seed.dislikes ? seed.dislikes.push(userId) : (seed.dislikes = [userId]);
    }
    setSeedList([...seedList]);
  };

  return (
    <>
      <div className="seed-container">
        <Card className="card" title="过滤条件">
          <SearchForm search={search}></SearchForm>
          <Button onClick={() => showSeedInput()}>配置我的种子</Button>
          <Button onClick={() => showMySeed()}>查看我的种子</Button>
        </Card>
        <Card className="card" title="结果">
          <Table columns={columns} dataSource={seedList} pagination={false} rowKey={"id"} />
        </Card>
      </div>
      <Modal
        visible={isSeedInputVisible}
        onOk={closeSeedInput}
        onCancel={closeSeedInput}
        footer={null}
        width={"80%"}
      >
        <SeedInput onFinish={closeSeedInput}></SeedInput>
      </Modal>
    </>
  );
};
export default Seed;
