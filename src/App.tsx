import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/common/Layout";

// 使用 lazy 动态导入组件
const Race = lazy(() => import("@/pages/race"));
const Player = lazy(() => import("@/pages/player"));
const Support = lazy(() => import("@/pages/support"));
const Nurturing = lazy(() => import("@/pages/nurturing"));
const Skill = lazy(() => import("@/pages/skill"));
const Seed = lazy(() => import("@/pages/seed"));
const NurturingMO = lazy(() => import("@/pages/nurturingMo"));
const SeedMo = lazy(() => import("@/pages/seedMo"));
const SupportDetailPage = lazy(() => import("@/pages/support/detail"));
const PlayerDetailPage = lazy(() => import("@/pages/player/detail"));
const SkillDetailPage = lazy(() => import("@/pages/skill/detail"));
const BuffList = lazy(() => import("@/components/buff"));

// 加载中的占位组件
const Loading = () => <div>Loading...</div>;

const App = () => {

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/support" element={<Support />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/nurturing" element={<Nurturing />} />
          <Route path="/nurturingMo" element={<NurturingMO />} />
          <Route path="/seed" element={<Seed />} />
          <Route path="/SeedMo" element={<SeedMo />} />
          <Route path="/race" element={<Race />} />
          <Route path="/support-detail/:id" element={<SupportDetailPage />} />
          <Route path="/support-detail/:id/:nur" element={<SupportDetailPage />} />
          <Route path="/player-detail/:id" element={<PlayerDetailPage />} />
          <Route path="/player-detail/:id/:nur" element={<PlayerDetailPage />} />
          <Route path="/skill-detail/:id" element={<SkillDetailPage />} />
          <Route path="/buff" element={<BuffList />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
