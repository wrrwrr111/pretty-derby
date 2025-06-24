import React from "react";
import { Picker, List } from "antd-mobile";
import { Form, Rate } from "antd";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PlayerInput from "./PlayerInput";
import SupportInput from "./SupportInput";
import Button from "@/components/ui/button";

const SearchOne = ({ name }) => {
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
    <Form.List name={name}>
      {(fields, { add }) => (
        <List>
          {fields.map((field) => (
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
            <Button type="dashed" onClick={() => add()} icon={<Plus />}>
              {t("添加过滤条件")}
            </Button>
          </List.Item>
        </List>
      )}
    </Form.List>
  );
};

const MobileSeedSearchForm = ({ onSearch }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let formData = { attrs: [], levels: [] };

    if (values.player0) {
      formData.attrs.push("playerId0");
      formData.levels.push(values.player0.id);
    }

    if (values.support) {
      formData.attrs.push("supportId");
      formData.levels.push(values.support.id);
    }

    values.p1?.forEach((item) => {
      formData.attrs.push(item.attr[0]);
      formData.levels.push(item.attr[1]);
    });

    onSearch(formData);
  };

  const onReset = () => form.resetFields();

  return (
    <Form form={form} onFinish={onFinish} className="w-full">
      <SearchOne name="p1" />
      <div className="grid grid-cols-4 w-full" align="start">
        <div>
          {t("角色")}
          <Form.Item name="player0">
            <PlayerInput />
          </Form.Item>
        </div>
        <div>
          {t("支援卡")}
          <Form.Item name="support">
            <SupportInput />
          </Form.Item>
        </div>
        <div className="col-span-2">
          {t("突破等级")}
          <Form.Item name="supportLevel" initialValue={0}>
            <Rate count={4} />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="button" onClick={onReset}>
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

export default MobileSeedSearchForm;
