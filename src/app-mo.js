import React from 'react';
import { HashRouter as Router, Route ,Link} from 'react-router-dom';


import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.min.css';


import Race from './pages/race.js'
import Player from './pages/player.js'
import Support from './pages/support.js'
import NurturingMO from './pages/nurturing-mo.js'
import Skill from './pages/skill.js'
import SeedMo from './pages/seed-mo.js'


class App1 extends React.Component {
  state = {
    open: false,
    title:'urara win'
  }
  onOpenChange=()=>{
    this.setState({open: !this.state.open})
  }
  onSelect = (label) => {
    this.setState({title:label});
    this.onOpenChange()
  }
  render() {
    const routers = [{path:'/',label:'角色'},
    {path:'/support',label:'支援卡'},
    {path:'skill',label:'技能'},
    {path:'race',label:'比赛'},
    {path:'nurturing',label:'育成'},
    {path:'seed',label:'种🐎'}]
    const linkList=(<List>
      {routers.map(item=>
        <Link to={item.path} key={item.path}  onClick={()=>this.onSelect(item.label)}>
          <List.Item >{item.label}</List.Item>
        </Link>
      )}
    </List>)

    return (
    <Router>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>{this.state.title}</NavBar>
      <Drawer
        className="my-drawer"
        style={{
          minHeight: document.documentElement.clientHeight,
          position: 'relative',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch'}}
        enableDragHandle={true}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center',paddingTop:20}}
        // dragHandleStyle={{width:0}}
        sidebar={linkList}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
          <Route exact path="/" component={Player}/>
          <Route path="/support" component={Support}/>
          <Route path="/skill" component={Skill}/>
          <Route path="/nurturing" component={NurturingMO}/>
          <Route path="/seed" component={SeedMo}/>
          <Route path="/race" component={Race}/>
      </Drawer>
    </Router>);
  }
}
export default App1


