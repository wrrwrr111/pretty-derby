import React, { useState } from "react";
import { Card, Modal, message } from "antd";
import { Helmet } from "react-helmet";
import axios from "axios";
import dbL from "@/dbL";
import SeedInputForm from "@/components/seed/SeedInputForm";
import SeedSearchForm from "@/components/seed/SeedSearchForm";
import SeedTable from "@/components/seed/SeedTable";
import { Button } from "@/components/ui/button";

const Seed = () => {
  const [isSeedInputVisible, setIsSeedInputVisible] = useState(false);
  const [seedList, setSeedList] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState({});
  const userId = dbL.get("userId").value();

  const showSeedInput = () => setIsSeedInputVisible(true);
  const closeSeedInput = () => setIsSeedInputVisible(false);

  const showMySeed = () => {
    search({ attrs: ["userId"], levels: [userId] });
  };

  const search = async (params) => {
    setSearchParams(params);
    try {
      const res = await axios.post(
        "https://urarawin-worker.urarawin.workers.dev/api/sqlite/search",
        params
      );
      if (res.data) {
        if (res.data.count) {
          setSeedList(res.data.list);
          setTotal(res.data.count);
        } else {
          setSeedList([]);
          setTotal(0);
          message.info("暂无数据");
        }
      }
    } catch (error) {
      message.error("搜索失败");
    }
  };

  const handleTableChange = (pagination) => {
    search({
      ...searchParams,
      count: pagination.total,
      offset: pagination.current * 10 - 10,
    });
  };

  const like = async (seed) => {
    if (!userId) {
      message.info("刷新后重试");
      return;
    }
    try {
      const res = await axios.post("https://urarawin-worker.urarawin.workers.dev/api/sqlite/like", {
        id: seed.id,
        userId,
      });
      if (res.data) {
        message.info("成功");
        setSeedList((prev) =>
          prev.map((item) => (item.id === seed.id ? { ...item, likes: item.likes + 1 } : item))
        );
      }
    } catch (error) {
      message.error("操作失败");
    }
  };

  const dislike = async (seed) => {
    if (!userId) {
      message.info("刷新后重试");
      return;
    }
    try {
      const res = await axios.post(
        "https://urarawin-worker.urarawin.workers.dev/api/sqlite/dislike",
        { id: seed.id, userId }
      );
      if (res.data) {
        message.info("成功");
        setSeedList((prev) =>
          prev.map((item) =>
            item.id === seed.id ? { ...item, dislikes: item.dislikes + 1 } : item
          )
        );
      }
    } catch (error) {
      message.error("操作失败");
    }
  };

  const deleteSeed = async (seed) => {
    try {
      const res = await axios.post(
        "https://urarawin-worker.urarawin.workers.dev/api/sqlite/delete",
        seed
      );
      if (res.data) {
        message.info("成功删除");
        setSeedList((prev) => prev.filter((item) => item.id !== seed.id));
        setTotal((prev) => prev - 1);
      }
    } catch (error) {
      message.error("删除失败");
    }
  };

  return (
    <>
      <Helmet>
        <title>分享 - 乌拉拉大胜利 - 赛马娘资料站</title>
      </Helmet>
      <div className="seed-container">
        <Card className="card" title="过滤条件">
          <SeedSearchForm onSearch={search} />
          <Button onClick={showSeedInput}>配置我的种子</Button>
          <Button onClick={showMySeed}>查看我的种子</Button>
        </Card>
        <Card className="card" title="结果">
          <SeedTable
            data={seedList}
            total={total}
            onChange={handleTableChange}
            onLike={like}
            onDislike={dislike}
            onDelete={deleteSeed}
            userId={userId}
          />
        </Card>
      </div>
      <Modal
        visible={isSeedInputVisible}
        onOk={closeSeedInput}
        onCancel={closeSeedInput}
        footer={null}
        width="80%"
      >
        <SeedInputForm onFinish={closeSeedInput} />
      </Modal>
    </>
  );
};

export default Seed;
