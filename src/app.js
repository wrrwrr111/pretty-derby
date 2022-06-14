import React from "react";

import CacheRoute, { CacheSwitch } from "react-router-cache-route";
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
    <CacheSwitch>
      <Layout>
        <CacheRoute
          saveScrollPosition
          className="container mx-auto flex-auto"
          exact
          path="/"
          component={Player}
        />
        <CacheRoute
          saveScrollPosition
          className="container mx-auto flex"
          path="/support"
          component={Support}
        />
        <CacheRoute
          saveScrollPosition
          className="container mx-auto flex"
          path="/skill"
          component={Skill}
        />
        <CacheRoute saveScrollPosition path={["/nurturing"]} component={Nurturing} />
        <CacheRoute saveScrollPosition path={["/nurturingMo"]} component={NurturingMO} />
        <CacheRoute saveScrollPosition path="/seed" component={Seed} />
        <CacheRoute saveScrollPosition path="/SeedMo" component={SeedMo} />
        <CacheRoute saveScrollPosition path="/race" component={Race} />
        <CacheRoute
          saveScrollPosition
          path={["/support-detail/:id", "/support-detail/:id/:nur"]}
          component={SupportDetailPage}
        />
        <CacheRoute
          saveScrollPosition
          path={["/player-detail/:id", "/player-detail/:id/:nur"]}
          component={PlayerDetailPage}
        />
        <CacheRoute saveScrollPosition path="/skill-detail/:id" component={SkillDetailPage} />
        <CacheRoute saveScrollPosition path="/buff" component={BuffList} />
        {/* <CacheRoute saveScrollPosition component={NotFound}></CacheRoute> */}
        <ReactTooltip className="z-max !hidden md:!inline-block" html={true} />
      </Layout>
    </CacheSwitch>
  );
};

export default AppPc;
