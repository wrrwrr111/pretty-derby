import "./i18n";

import { BrowserRouter as Router } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import ReactTooltip from "react-tooltip";

import Race from "@cra/pages/race";
import Player from "@cra/pages/player";
import Support from "@cra/pages/support";
import Nurturing from "@cra/pages/nurturing/index";
import Skill from "@cra/pages/skill";
import Seed from "@cra/pages/seed";
// import NotFound from "@cra/pages/404";

import NurturingMO from "@cra/pages/nurturingMo";
import SeedMo from "@cra/pages/seedMo";

import SupportDetailPage from "@cra/pages/support/detail";
import PlayerDetailPage from "@cra/pages/player/detail";
import SkillDetailPage from "@cra/pages/skill/detail";
import { BuffList } from "./components/buff";
import Layout from "./components/common/Layout";
const AppPc = () => {
  return (
    <Router>
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
          <CacheRoute
            saveScrollPosition
            path={["/nurturing"]}
            component={Nurturing}
          />
          <CacheRoute
            saveScrollPosition
            path={["/nurturingMo"]}
            component={NurturingMO}
          />
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
          <CacheRoute
            saveScrollPosition
            path="/skill-detail/:id"
            component={SkillDetailPage}
          />
          <CacheRoute saveScrollPosition path="/buff" component={BuffList} />
          {/* <CacheRoute saveScrollPosition component={NotFound}></CacheRoute> */}
          <ReactTooltip
            className="z-max !hidden md:!inline-block"
            html={true}
          />
        </Layout>
      </CacheSwitch>
    </Router>
  );
};

export default AppPc;
