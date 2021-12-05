import React, { useState, useEffect } from "react";
import { Button, Checkbox, Input } from "antd";
// import { useDidRecover } from 'react-router-cache-route'
import { useDidRecover } from "react-router-cache-route";
import Layout from "../../components/common/Layout.js";
import dbL from "../../dbL.js";
import db from "../../db.js";
import t from "../../components/t.js";
import SupportList from "../../components/support/SupportList";
import SkillCheckbox from "../../components/skill/SkillCheckbox";

const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";

const allSupports = db.get("supports").value();
const Support = (props) => {
  document.title = TITLE;
  useDidRecover(() => {
    document.title = TITLE;
  });
  const { filter = true, onClick } = props;
  const [list, setList] = useState(props.supportList || allSupports || []);
  const [chooseMode, setChooseMode] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [chosenList, setChosenList] = useState(dbL.get("mySupports").value() || []);
  const [effectList, setEffectList] = useState();
  const [typeList, setTypeList] = useState([]);
  const [eventIdList, setEventIdList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const effects = db.get("effects").value();
  const effectOptions = Object.keys(effects).map((key) => {
    return { label: t(effects[key].name), value: key };
  });
  const typeOptions = ["スピード", "スタミナ", "パワー", "根性", "賢さ", "友人"].map((item) => ({
    label: t(item),
    value: item,
  }));

  const changeChooseMode = () => {
    setShowMode(!showMode);
    setChooseMode(!chooseMode);
  };

  const changeShowMode = () => {
    setShowMode(!showMode);
  };

  const onSelect = (item) => {
    let tmpList = [...chosenList];
    const index = tmpList.indexOf(item.id);
    if (index === -1) {
      tmpList.push(item.id);
    } else {
      tmpList.splice(index, 1);
    }
    dbL.update("mySupports", tmpList).write();
    setChosenList([...tmpList]);
  };

  const onSupportCheckboxChange = (effectList) => setEffectList(effectList);

  const onSkillCheckboxUpdate = (skillList) => setSkillList(skillList);

  const onTypeListChange = (typeList) => setTypeList(typeList);

  const onSearch = (searchText) => {
    const allEventList = db.get("events").value();
    const eventIdList = allEventList
      .filter((event) => {
        let jsonEvent = JSON.stringify(event);
        if (jsonEvent.indexOf(searchText) !== -1) {
          return true;
        } else {
          return false;
        }
      })
      .reduce((list, event) => {
        list.push(event.id);
        return list;
      }, []);
    setEventIdList(eventIdList);
  };

  useEffect(() => {
    updateSupport({ effectList, skillList, eventIdList, typeList });
  }, [effectList, skillList, eventIdList, typeList]);

  const updateSupport = ({ effectList, skillList, eventIdList, typeList }) => {
    let tempList = allSupports;
    if (effectList?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        effectList.forEach((value) => {
          support.effects &&
            support.effects.forEach((effect) => {
              if (effect.type == value) {
                flag += 1;
              }
            });
        });
        return flag === effectList.length;
      });
    }
    if (skillList?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        support.skillList.forEach((skillId) => {
          if (skillList.indexOf(skillId) !== -1) {
            return (flag = 1);
          }
        });
        return flag;
      });
    }
    if (eventIdList?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        support.eventList.forEach((eventId) => {
          if (eventIdList.indexOf(eventId) !== -1) {
            return (flag = 1);
          }
        });
        return flag;
      });
    }
    if (typeList?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        if (typeList.indexOf(support.type) !== -1) {
          return (flag = 1);
        }
        return flag;
      });
    }
    setList([...tempList]);
  };

  return (
    <Layout contentClass="flex flex-auto w-full flex-wrap max-w-6xl mx-auto overflow-hidden relative">
      {filter && (
        <div className="w-1/4 h-full flex flex-col p-1 overflow-hidden">
          <div className="w-full rounded m-1 h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold flex-shrink-0">
            {t("筛选")}
          </div>
          <Button onClick={changeShowMode}>{t("高亮我的卡组")}</Button>
          <Button onClick={changeChooseMode}>{t("配置卡组")}</Button>
          {chooseMode && (
            <Button onClick={changeChooseMode} type="primary">
              {t("配置完成")}
            </Button>
          )}
          <Search
            placeholder={t("输入关键词")}
            enterButton={t("搜索")}
            size="middle"
            style={{ width: "100%" }}
            onSearch={onSearch}
          />
          <div className="overflow-y-auto flex-auto flex flex-col">
            <div className="font-semibold my-1">{t("类型")}</div>
            <CheckboxGroup options={typeOptions} value={typeList} onChange={onTypeListChange} />
            <div className="font-semibold my-1">{t("技能")}</div>
            <SkillCheckbox
              onUpdate={onSkillCheckboxUpdate}
              checkOnly={true}
              needId={true}
            ></SkillCheckbox>
            <div className="font-semibold my-1">{t("育成效果")}</div>
            <CheckboxGroup
              options={effectOptions}
              value={effectList}
              onChange={onSupportCheckboxChange}
            />
          </div>
        </div>
      )}
      <div className="w-3/4 h-full flex flex-col p-1 overflow-hidden">
        <div className="w-full rounded m-1 h-12 flex items-center justify-center bg-blue-400 text-gray-100 text-xl font-semibold flex-shrink-0">
          {t("支援卡列表")}
        </div>
        <div className=" overflow-y-scroll overflow-x-hidden pl-4 w-full h-full flex flex-wrap">
          <SupportList
            listClass="justify-between"
            sortFlag={true}
            dataList={list}
            ownList={showMode ? chosenList : null}
            onClick={chooseMode ? onSelect : onClick}
          />
        </div>
      </div>
    </Layout>
  );
};
export default Support;
