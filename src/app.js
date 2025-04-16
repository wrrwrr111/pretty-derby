import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import Race from "@/pages/race";
import Player from "@/pages/player";
import Support from "@/pages/support";
import Nurturing from "@/pages/nurturing/index";
import Skill from "@/pages/skill";
import Seed from "@/pages/seed";
// import NotFound from "@/pages/404";

import NurturingMO from "@/pages/nurturingMo";
import SeedMo from "@/pages/seedMo";

import SupportDetailPage from "@/pages/support/detail";
import PlayerDetailPage from "@/pages/player/detail";
import SkillDetailPage from "@/pages/skill/detail";
import { BuffList } from "./components/buff.js";
import Layout from "./components/common/Layout.js";

const AppPc = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Player} />
          <Route path="/support" component={Support} />
          <Route path="/skill" component={Skill} />
          <Route path="/nurturing" component={Nurturing} />
          <Route path="/nurturingMo" component={NurturingMO} />
          <Route path="/seed" component={Seed} />
          <Route path="/SeedMo" component={SeedMo} />
          <Route path="/race" component={Race} />
          <Route path="/support-detail/:id/:nur" component={SupportDetailPage} />
          <Route path="/support-detail/:id" component={SupportDetailPage} />
          <Route path="/player-detail/:id/:nur" component={PlayerDetailPage} />
          <Route path="/player-detail/:id" component={PlayerDetailPage} />
          <Route path="/skill-detail/:id" component={SkillDetailPage} />
          <Route path="/buff" component={BuffList} />
          {/* <Route component={NotFound} /> */}
        </Switch>
        <ReactTooltip className="z-max hidden! md:inline-block!" html={true} />
      </Layout>
    </Router>
  );
};

export default AppPc;
