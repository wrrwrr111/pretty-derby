import React, { useEffect } from "react";

import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { Route } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import Race from "@/pages/race";
import Player from "@/pages/player";
import Support from "@/pages/support";
import Nurturing from "@/pages/nurturing/index";
import Skill from "@/pages/skill";
import Seed from "@/pages/seed";
import NotFound from "@/pages/404";

import NurturingMO from "@/pages/nurturingMo";
import SeedMo from "@/pages/seedMo";

import SupportDetailPage from "@/pages/support/detail";
import PlayerDetailPage from "@/pages/player/detail";
import SkillDetailPage from "@/pages/skill/detail";
import { BuffList } from "./components/buff.js";
const AppPc = () => {
  return (
    <>
      <CacheSwitch>
        <CacheRoute exact path="/" component={Player} />
        <CacheRoute path="/support" component={Support} />
        <CacheRoute path="/skill" component={Skill} />
        <CacheRoute path={["/nurturing"]} component={Nurturing} />
        <CacheRoute path={["/nurturingMo"]} component={NurturingMO} />
        <CacheRoute className="" path="/seed" component={Seed} />
        <CacheRoute className="" path="/SeedMo" component={SeedMo} />
        <CacheRoute className="" path="/race" component={Race} />
        <CacheRoute
          path={["/support-detail/:id", "/support-detail/:id/:nur"]}
          component={SupportDetailPage}
        />
        <CacheRoute
          path={["/player-detail/:id", "/player-detail/:id/:nur"]}
          component={PlayerDetailPage}
        />
        <CacheRoute path="/skill-detail/:id" component={SkillDetailPage} />
        <CacheRoute path="/buff" component={BuffList} />
        <Route component={NotFound}></Route>
      </CacheSwitch>
      <ReactTooltip className="z-max !hidden md:!inline-block" html={true} />
    </>
  );
};

export default AppPc;
