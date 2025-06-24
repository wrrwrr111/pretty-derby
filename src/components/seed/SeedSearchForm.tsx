import React from "react";
import { Form, Row, Col, Radio, Rate, Button } from "antd";
import PlayerInput from "./PlayerInput";
import SupportInput from "./SupportInput";

import { Plus } from "lucide-react";
import { SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";

const SearchOne = ({ name, max }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          <Row>
            {fields.map((field) => (
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
                    <Rate count={max} />
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
              <Button type="dashed" onClick={() => add()} icon={<Plus />}>
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

const SeedSearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let formData = { attrs: [], levels: [] };

    if (values.player0) {
      formData.attrs.push("playerId0");
      formData.levels.push(values.player0.id);
    }

    if (values.supportLevel) {
      formData.attrs.push("supportLevel");
      formData.levels.push(values.supportLevel);
    }

    if (values.support) {
      formData.attrs.push("supportId");
      formData.levels.push(values.support.id);
    }

    values.p0?.forEach((item) => {
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

    values.p1?.forEach((item) => {
      formData.attrs.push(item.attr);
      formData.levels.push(item.level);
    });

    if (values.server) {
      formData.attrs.push("server");
      formData.levels.push(values.server);
    }

    onSearch(formData);
  };

  const onReset = () => form.resetFields();

  return (
    <Form form={form} onFinish={onFinish} className="seed-form">
      <Row>
        <Form.Item label="区服" name="server" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="zh-CN">简中</Radio.Button>
            <Radio.Button value="zh-TW">繁中</Radio.Button>
            <Radio.Button value="ja">日服</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="角色" name="player0">
          <PlayerInput />
        </Form.Item>
      </Row>
      <SearchOne name="p0" max="3" />
      <div>总计:</div>
      <SearchOne name="p1" max="9" />
      <Row>
        <Form.Item label="支援卡" name="support">
          <SupportInput />
        </Form.Item>
        <Form.Item label="突破等级" name="supportLevel" initialValue={0}>
          <Rate count={4} />
        </Form.Item>
      </Row>
      <Row justify="end">
        <Form.Item>
          <Button htmlType="button" onClick={onReset}>
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

export default SeedSearchForm;
