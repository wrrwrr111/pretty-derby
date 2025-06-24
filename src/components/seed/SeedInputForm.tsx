import React, { useState } from "react";
import { Row, Alert, Col, Radio, Rate, Form, Slider, PageHeader, Input, Button, message } from "antd";
import { useDB } from "@/hooks";
import dbL from "@/dbL";
import axios from "axios";
import PlayerInput from "./PlayerInput";
import SupportInput from "./SupportInput";
import { SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";

const SeedInputForm = ({ onFinish: onFinishProp }) => {
  const [form] = Form.useForm();
  const [seed, setSeed] = useState({});
  const userId = dbL.get("userId").value();

  const onFinish = async (values) => {
    let tmpSeed = Object.assign({}, seed, values);
    setSeed(tmpSeed);

    const formData = { ...tmpSeed };
    formData.userId = userId;
    formData.updateTime = new Date().getTime();
    formData.playerId0 = values.player0?.id;
    formData.playerId1 = values.player1?.id;
    formData.playerId2 = values.player2?.id;
    formData.supportId = values.support?.id;

    delete formData.support;
    delete formData.player0;
    delete formData.player1;
    delete formData.player2;

    ["0", "1", "2"].forEach((i) => {
      // Process blue factors
      if (formData[formData[`blue${i}`]] !== undefined) {
        formData[formData[`blue${i}`]] += formData[`blueLevel${i}`];
      } else {
        formData[formData[`blue${i}`]] = formData[`blueLevel${i}`];
      }

      // Process red factors
      if (formData[formData[`red${i}`]] !== undefined) {
        formData[formData[`red${i}`]] += formData[`redLevel${i}`];
      } else {
        formData[formData[`red${i}`]] = formData[`redLevel${i}`];
      }

      // Process white factors
      if (formData.white !== undefined) {
        formData.white += formData[`whiteNum${i}`];
      } else {
        formData.white = formData[`whiteNum${i}`];
      }

      // Process URA
      if (formData.uraLevel !== undefined) {
        formData.uraLevel += formData[`uraLevel${i}`];
      } else {
        formData.uraLevel = formData[`uraLevel${i}`];
      }
    });

    try {
      const res = await axios.post(
        "https://urarawin-worker.urarawin.workers.dev/api/sqlite/add",
        formData
      );
      if (res.data?.success) {
        message.info("成功添加");
        onFinishProp();
      } else {
        message.info("有地方出错了");
      }
    } catch (error) {
      message.error("提交失败");
    }
  };

  const renderPlayerFields = () => {
    const labels = ["主要", "父辈1", "父辈2"];
    return labels.map((label, i) => (
      <Col span={8} key={i}>
        <PageHeader title={label} />
        <Row>
          <Col span={6} offset={4}>
            <Form.Item label="角色" name={`player${i}`} rules={[{ required: true }]}>
              <PlayerInput />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="蓝色因子" name={`blue${i}`} rules={[{ required: true }]}>
          <Radio.Group>
            {Object.entries(SEED_BLUE_LABELS).map(([value, label]) => (
              <Radio.Button key={value} value={value}>{label}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="蓝色因子星数" name={`blueLevel${i}`} rules={[{ required: true }]}>
          <Rate count={3} />
        </Form.Item>
        <Form.Item label="红色因子" name={`red${i}`} rules={[{ required: true }]}>
          <Radio.Group>
            {Object.entries(SEED_RED_LABELS).map(([value, label]) => (
              <Radio.Button key={value} value={value}>{label}</Radio.Button>
            ))}
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
    ));
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Alert
        message="目前每人只能配置一个种子 自觉维护自己的信息；第一次添加前先刷新 否则可能失败"
        type="info"
      />
      <Row gutter={24}>{renderPlayerFields()}</Row>
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
              () => ({
                validator(_, value) {
                  if (value.match(/^[0-9]\d*$/g)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("输入正确的id"));
                },
              }),
            ]}
          >
            <Input placeholder="id" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="区服" name={`server`} rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value={"zh-CN"}>{"简中"}</Radio.Button>
              <Radio.Button value={"zh-TW"}>{"繁中"}</Radio.Button>
              <Radio.Button value={"ja"}>{"日服"}</Radio.Button>
            </Radio.Group>
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

export default SeedInputForm;
