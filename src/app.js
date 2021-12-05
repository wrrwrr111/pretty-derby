import React, { useEffect } from "react";

import CacheRoute, { CacheSwitch } from "react-router-cache-route";

import ReactTooltip from "react-tooltip";

import Race from "./pages/race.js";
import Player from "./pages/player.js";
import Support from "./pages/support.js";
import Nurturing2 from "./pages/nurturing2.js";
import Skill from "./pages/skill.js";
import Seed from "./pages/seed.js";

import NurturingMO from "./pages-mo/nurturing.js";
import SeedMo from "./pages-mo/seed.js";

import SupportDetail from "./components/support/SupportDetail";
import PlayerDetail from "./components/player/PlayerDetail";
import SkillDetail from "./components/skill/SkillDetail";
import { BuffList } from "./components/buff.js";


const AppPc = () => {
  return (
    <>
      <CacheSwitch>
        <CacheRoute exact path="/" component={Player} />
        <CacheRoute path="/support" component={Support} />
        <CacheRoute path="/skill" component={Skill} />
        <CacheRoute path={["/nur", "/Nurturing2"]} component={Nurturing2} />
        <CacheRoute path={["/mo/nur", "/NurturingMO"]} component={NurturingMO} />
        <CacheRoute className="flex-auto w-full" path="/seed" component={Seed} />
        <CacheRoute className="flex-auto w-full" path="/SeedMo" component={SeedMo} />
        <CacheRoute className="flex-auto w-full" path="/race" component={Race} />
        <CacheRoute
          path={["/support-detail/:id", "/support-detail/:id/:nur"]}
          component={SupportDetail}
        />
        <CacheRoute
          path={["/player-detail/:id", "/player-detail/:id/:nur"]}
          component={PlayerDetail}
        />
        <CacheRoute path="/skill-detail/:id" component={SkillDetail} />
        <CacheRoute path="/buff" component={BuffList} />
      </CacheSwitch>
      <ReactTooltip className="z-max" html={true} />
    </>
  );
};

export default AppPc;
