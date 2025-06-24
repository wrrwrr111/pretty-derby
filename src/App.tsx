// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Race from "@/pages/race";
import Player from "@/pages/player";
import Support from "@/pages/support";
import Nurturing from "@/pages/nurturing";
import Skill from "@/pages/skill";
import Seed from "@/pages/seed";
import NurturingMO from "@/pages/nurturingMo";
import SeedMo from "@/pages/seedMo";
import SupportDetailPage from "@/pages/support/detail";
import PlayerDetailPage from "@/pages/player/detail";
import SkillDetailPage from "@/pages/skill/detail";
import { BuffList } from "@/components/buff";
import Layout from "@/components/common/Layout";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("!!!app");
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
