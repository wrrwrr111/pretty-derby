import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route ,Link} from 'react-router-dom';

import 'antd/dist/antd.css';
import { Row,Col,Image,Layout,Menu,Button,Popover} from 'antd'
import {message} from 'antd'
import './index.css'

// import db from './db.js'
// import EventList from './components/event-list.js'
// import SkillList from './components/skill-list.js'

import db from './db.js'

import Race from './race.js'
import Player from './player.js'
import Support from './support.js'
import Nurturing from './nurturing.js'
import Skill from './skill.js'
import Seed from './seed.js'

const { Header, Content, Footer } = Layout;

// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'
// https://purge.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/dbd.json
// https://purge.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/db.json

// https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/raw/master/public/img/players/0uJ0iropRbr.png

const App = ()=>{
  let lan = db.get('lan').value()
  console.log('!!!!!',lan)
  const [langText,setLangText] = useState(lan=='zh'?'English':'中文')
  const changeLan=()=>{
    if(lan=='zh'){
      lan='en'
      db.set('lan','en').write()
      setLangText('中文')
      message.info('Refresh the website ')
    }else{
      lan='zh'
      db.set('lan','zh').write()
      setLangText('English')
      message.info('刷新页面')
    }
    // window.opener.location.reload()
  }
  const reload =()=>{
    db.set('selected',{
      supports:{1:{},2:{},3:{},4:{},5:{},6:{}},
      player:{},
      races:[]
    }).write()
  }
  message.info('翻译目前为机翻版本，需要后期校正')
  return (
<Router>
    <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to='/'>角色</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/support'>支援卡</Link></Menu.Item>
        <Menu.Item key="3"><Link to='/skill'>技能</Link></Menu.Item>
        <Menu.Item key="4"><Link to='/race'>比赛</Link></Menu.Item>
        <Menu.Item key="5"><Link to='/nurturing'>育成</Link></Menu.Item>
        <Menu.Item key="6"><Link to='/seed'>种🐎</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '80px 50px' }}>
      <Route exact path="/" component={Player}/>
      <Route path="/support" component={Support}/>
      <Route path="/nurturing" component={Nurturing}/>
      <Route path="/skill" component={Skill}/>
      <Route path="/race" component={Race}/>
      <Route path="/seed" component={Seed}/>
    </Content>
  <Footer>
    <Row gutter={[16,16]}>
      <Col span={2}>
        <Button onClick={changeLan}>{langText}</Button>
      </Col>
      <Col span={2}>
        <Popover content={<p>育成界面出现问题时重置</p>}>
          <Button placement="bottom" onClick={reload}>清空育成</Button>
         </Popover>
      </Col>
      <Col span={16}></Col>
      <Col span={2}>
      <Popover content={<><Image src={'img/z.jpg'} width={200}></Image><p>支付宝</p></>}>
          <Button placement="bottom">捐助</Button>
        </Popover>
      </Col>
      <Col span={2}>
        <iframe title="GitHub" src="https://ghbtns.com/github-btn.html?user=wrrwrr111&repo=pretty-derby&type=star&count=true&size=large&v=2" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </Col>
      <Col span={2}>
      <Popover content={<Image src={'img/q.jpg'} width={300}></Image>}>
        <a target="_blank" rel="noreferrer" href="https://qm.qq.com/cgi-bin/qm/qr?k=f2Q2MIqkkxiiYq-sfRYmI7E4v17-r3V2&jump_from=webapi">
          <img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="轻 松 赛 马" title="轻 松 赛 马" />
        </a>
      </Popover>
      </Col>
    </Row>
  </Footer>
  </Layout>
</Router>
  )
}

ReactDOM.render((<App></App>),document.getElementById('root'),);
