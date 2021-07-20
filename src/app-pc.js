import React, { useState } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { Row, Col, Image, Layout, Menu, Button, Popover, Popconfirm } from 'antd'
import { message } from 'antd'
import 'antd/dist/antd.css';
import './index.css'


import db from './db.js'
import dbL from './dbL.js'
import t from './components/t.js'

import Race from './pages/race.js'
import Player from './pages/player.js'
import Support from './pages/support.js'
// import Nurturing from './pages/nurturing.js'
import Nurturing2 from './pages/nurturing2.js'
import Skill from './pages/skill.js'
import Seed from './pages/seed.js'

import LanButton from './components/lan-button'
import IntroIndex from './components/intro.js'

const { Header, Content, Footer } = Layout;
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/'

const AppPc = () => {

  const resetNur = () => {
    dbL.set('selected', {
      supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
      player: {},
      races: []
    }).write()
    // db.set('myDecks',[]).write()
  }
  const resetIntro = () => {
    localStorage.setItem('introV', null)
  }
  dbL.set('ua', 'pc').write();
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
            <Menu.Item key="1" className='menu-player'><Link to='/'>{t('角色')}</Link></Menu.Item>
            <Menu.Item key="2" className='menu-support'><Link to='/support'>{t('支援卡')}</Link></Menu.Item>
            <Menu.Item key="3" className='menu-skill'><Link to='/skill'>{t('技能')}</Link></Menu.Item>
            <Menu.Item key="4" className='menu-race'><Link to='/race'>{t('比赛')}</Link></Menu.Item>
            {/* <Menu.Item key="5" className='menu-nurturing'><Link to='/nurturing'>{t('育成')}</Link></Menu.Item> */}
            <Menu.Item key="7" className='menu-nurturing2'><Link to='/nurturing2'>{t('育成')}</Link></Menu.Item>
            <Menu.Item key="6" className='menu-seed'><Link to='/seed'>{t('种马分享')}</Link></Menu.Item>
            <LanButton style={{ float: 'right' }}></LanButton>
          </Menu>
        </Header>
        <Content style={{ paddingTop: '64px' }} >
          <CacheSwitch>
            <CacheRoute exact path="/" component={Player} />
            <CacheRoute path="/support" component={Support} />
            <CacheRoute path="/skill" component={Skill} />
            <CacheRoute path="/nurturing" component={Nurturing2} />
            <CacheRoute path="/nurturing2" component={Nurturing2} />
            <CacheRoute path="/seed" component={Seed} />
            <CacheRoute path="/race" component={Race} />
          </CacheSwitch>
        </Content>
        <Footer style={{ padding: '12px' }}>
          <Row gutter={[16, 16]}>
            <Col span={2}>
              <Button className='reset-intro' placement="bottom" onClick={resetIntro}>{t('重置引导')}</Button>
            </Col>
            <Col span={3}>
              <Popconfirm title={t('确认初始化？')} onConfirm={resetNur}>
                <Popover content={<p>{t('初始化育成页面')}</p>}>
                  <Button className='reset-nur' placement="bottom">{t('初始化育成')}</Button>
                </Popover>
              </Popconfirm>
            </Col>
            <Col span={11}></Col>
            <Col span={2}>
              <iframe title="GitHub" src="https://ghbtns.com/github-btn.html?user=wrrwrr111&repo=pretty-derby&type=star&count=true&size=large&v=2" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
            </Col>
            <Col span={2}>
              <Popover content={<><Image src={cdnServer + 'img/q.jpg'} width={300}></Image><p>{t('闲聊为主')}</p></>}>
                <a target="_blank" rel="noreferrer" href="https://qm.qq.com/cgi-bin/qm/qr?k=f2Q2MIqkkxiiYq-sfRYmI7E4v17-r3V2&jump_from=webapi">
                  <img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="轻 松 赛 马" title="轻 松 赛 马" />
                </a>
              </Popover>
            </Col>
            <Col span={2}>
              <Popover content={<Image src={cdnServer + 'img/weapp.jpg'} width={200}></Image>}>
                <Button placement="bottom" style={{ display: 'flex' }}>
                  <Image src={cdnServer + 'reimu.gif'} preview={false} width={24}></Image>
                  <div>{t('微信小程序')}</div>
                </Button>
              </Popover>
            </Col>
            <Col span={2}>
              <Popover content={<div style={{ display: 'flex' }}>
                <div style={{ margin: 20 }}>
                  <Image src={cdnServer + 'img/z.jpg'} width={200}></Image><p>{t('支付宝')}</p>
                </div>
                <div style={{ margin: 20 }}>
                  <Image src={cdnServer + 'img/w.jpg'} width={200}></Image><p>{t('微信')}</p>
                </div>
              </div>}>
                <Button placement="bottom" style={{ display: 'flex' }}>
                  <Image src={cdnServer + 'reimu.gif'} preview={false} width={24}></Image>
                  <div>{t('塞钱箱')}</div>
                </Button>
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
