import React,{useState} from 'react';
import { HashRouter as Router, Route ,Link} from 'react-router-dom';
import {Row,Col,Image,Layout,Menu,Button,Popover,Popconfirm} from 'antd'
import {message} from 'antd'
import 'antd/dist/antd.css';
import './index.css'


import db from './db.js'

import Race from './pages/race.js'
import Player from './pages/player.js'
import Support from './pages/support.js'
import Nurturing from './pages/nurturing.js'
import Nurturing2 from './pages/nurturing2.js'
import Skill from './pages/skill.js'
import Seed from './pages/seed.js'

import IntroIndex from './components/intro.js'

const { Header, Content, Footer } = Layout;
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const AppPc = ()=>{
  let lan = db.get('lan').value()
  const [langText,setLangText] = useState(lan==='zh'?'English':'中文')
  const changeLan=()=>{
    if(lan === 'zh'){
      lan = 'en'
      db.set('lan','en').write()
      setLangText('中文')
      message.info('Refresh the website ')
    }else{
      lan = 'zh'
      db.set('lan','zh').write()
      setLangText('English')
      message.info('刷新页面')
    }
  }
  const resetNur =()=>{
    db.set('selected',{
      supports:{0:{},1:{},2:{},3:{},4:{},5:{}},
      player:{},
      races:[]
    }).write()
    db.set('myDecks',[]).write()
  }
  const resetIntro = ()=>{
    localStorage.setItem('introV',null)
  }
  db.set('ua','pc').write();
  //隐藏主要的overflow
  const dom = document.getElementsByTagName("body");
  dom[0].style.overflowY = "scroll";

  return (
      // <UserAgentProvider ua={window.navigator.userAgent}>
<Router>
    <IntroIndex></IntroIndex>
    <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1" className='menu-player'><Link to='/'>角色</Link></Menu.Item>
        <Menu.Item key="2" className='menu-support'><Link to='/support'>支援卡</Link></Menu.Item>
        <Menu.Item key="3" className='menu-skill'><Link to='/skill'>技能</Link></Menu.Item>
        <Menu.Item key="4" className='menu-race'><Link to='/race'>比赛</Link></Menu.Item>
        <Menu.Item key="5" className='menu-nurturing'><Link to='/nurturing'>育成</Link></Menu.Item>
        <Menu.Item key="7" className='menu-nurturing2'><Link to='/nurturing2'>育成new</Link></Menu.Item>
        <Menu.Item key="6" className='menu-seed'><Link to='/seed'>种🐎</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ paddingTop:'64px'}} >
      <Route exact path="/" component={Player}/>
      <Route path="/support" component={Support}/>
      <Route path="/skill" component={Skill}/>
      <Route path="/nurturing" component={Nurturing}/>
      <Route path="/nurturing2" component={Nurturing2}/>
      <Route path="/seed" component={Seed}/>
      <Route path="/race" component={Race}/>
    </Content>
  <Footer style={{padding:'12px'}}>
    <Row gutter={[16,16]}>
      <Col span={2}>
        <Button onClick={changeLan}>{langText}</Button>
      </Col>
      <Col span={2}>
        <Popover content={<p>点击后刷新</p>}>
          <Button className='reset-intro' placement="bottom" onClick={resetIntro}>重置引导</Button>
         </Popover>
      </Col>
      <Col span={3}>
        <Popconfirm title="确认初始化？" onConfirm={resetNur}>
          <Popover content={<p>初始化育成页面</p>}>
            <Button className='reset-nur' placement="bottom">初始化育成</Button>
          </Popover>
        </Popconfirm>
      </Col>
      <Col span={11}></Col>
      <Col span={2}>
      <Popover content={<><Image src={cdnServer+'img/z.jpg'} width={200}></Image><p>支付宝</p></>}>
          <Button placement="bottom">捐助</Button>
        </Popover>
      </Col>
      <Col span={2}>
        <iframe title="GitHub" src="https://ghbtns.com/github-btn.html?user=wrrwrr111&repo=pretty-derby&type=star&count=true&size=large&v=2" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </Col>
      <Col span={2}>
      <Popover content={<Image src={cdnServer+'img/q.jpg'} width={300}></Image>}>
        <a target="_blank" rel="noreferrer" href="https://qm.qq.com/cgi-bin/qm/qr?k=f2Q2MIqkkxiiYq-sfRYmI7E4v17-r3V2&jump_from=webapi">
          <img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="轻 松 赛 马" title="轻 松 赛 马" />
        </a>
      </Popover>
      </Col>
    </Row>
  </Footer>
  </Layout>
</Router>
      // </UserAgentProvider>
  )
}

export default AppPc
