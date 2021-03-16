import React,{useState} from 'react';
import db from '../db.js'

import { Divider,Row,Col,Modal,Button,Drawer,Table} from 'antd';
import { Flex } from 'antd-mobile';

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'

import Race from './race.js'
import Player from './player.js'
import Support from './support.js'

const {Column} = Table

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'


// 培育界面 马娘赛程
const RaceList = (props) =>{
  return (
    <Row className={'race-row'}>
      {
        props.raceList.map((race,index)=>{
          // 忽略出道战
          if(race[1][2]){
            return(
          <Col span={12} key={index}>
            <Row className={'race-row-'+index%4}>
              <Col span={4} className={'race-name'} >
                <p>{race[0]}</p>
              </Col>
              <Col span = {20} className={'race-detail'}>
              {race[1].map((item,index)=>
                  <p key={index}>{item}</p>
                  )}
              </Col>
            </Row>
          </Col>
            )
          }else{
            return null
          }
        }
      )}
    </Row>
  )
}
const Nurturing = () =>{
  const [needSelect,setNeedSelect] = useState(false)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [supportIndex, setSupportIndex] = useState(1);

  const [isRaceVisible, setIsRaceVisible] = useState(false);

  const selected = db.get('selected').value()
  const [supports, setSupports] = useState(selected.supports);
  const [player, setPlayer] = useState(selected.player);
  const [races,setRaces] = useState(selected.races)
  const [skillShow,setSkillShow] = useState(true)

  const [visible, setVisible] = useState(false);



  const showPlayer = () => {
    setIsPlayerVisible(true);
  };
  const closePlayer = () => {
    setIsPlayerVisible(false);
  };
  const handleSelectPlayer = (data)=>{
    setIsPlayerVisible(false);
    setPlayer(data)

    // save
    selected.player = data
    db.get('selected').assign(selected).write()
  }

  const showSupport = (index) => {
    setNeedSelect(true)
    setIsSupportVisible(true);
    setSupportIndex(index)
  };
  const showSupport2 = (index) => {
    setNeedSelect(false)
    setIsSupportVisible(true);
    setSupportIndex(index)
  };

  const closeSupport = () => {
    setIsSupportVisible(false);
  };
  const handleSelectSupport = (data)=>{
    let newData= {}
    newData[supportIndex] = data
    setSupports(Object.assign({},supports,newData))
    setIsSupportVisible(false);

    // save
    selected.supports[supportIndex] = data
    db.get('selected').assign(selected).write()
  }
  const showRace = ()=>{
    setNeedSelect(true)
    setIsRaceVisible(true);
  }
  const closeRace = () => {
    setIsRaceVisible(false);
  };
  const handleSelectRace = (data)=>{
    setRaces(data);

    // save
    selected.races = data
    db.get('selected').assign(selected).write()
  }
  const showDrawer = ()=>{
    setVisible(true)
  }
  const onDrawerClose = (data)=>{
    setVisible(false)
  }
  const changeSkillShow =()=>{
    setSkillShow(!skillShow)
  }
  return(
    <>
    <Flex>
      <Flex.Item>
        <Flex wrap='wrap'>
          <Button type={'primary'} onClick={showPlayer}>选择马娘</Button>
          <Button onClick={showSupport2}>辅助卡查询</Button>
          <Button onClick={showRace}>选择关注赛事</Button>
          <Button onClick={showDrawer}>查看关注赛事</Button>
          <Button onClick={changeSkillShow}>是否显示技能</Button>
        </Flex>
        <Divider>赛程</Divider>
        <RaceList raceList={player.id?player.raceList:[]}></RaceList>
        <Divider></Divider>
        <Flex wrap='wrap'>
          <img src={cdnServer+player.imgUrl} alt={player.name} width={'20%'} flex='0 0 auto'></img>
          {skillShow&&
          <Flex.Item style={{flex:'1 0 auto',width:'78%'}}>
            <SkillList skillList={player.id?player.skillList:[]}></SkillList>
          </Flex.Item>
          }
          <Flex.Item>
            <EventList eventList={player.id?player.eventList:[]} pid={player.id} type='multi'></EventList>
          </Flex.Item>
        </Flex>
        <Drawer
        title="关注赛事 (可以按esc退出)"
        onClose={onDrawerClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
        closable={true}
        placement="left"
        mask={false}
        maskClosable={false}
        width='100%'
        >
        {/* {races.map(race=>
          <p>{race.name}</p>
        )} */}
        <Table dataSource={races} pagination={false}>
        {/* ["name", "date", "class","grade","ground","distanceType"] */}
          <Column title="名称" dataIndex="name" key="name" />
          <Column title="时间" dataIndex="date" key="date" />
          <Column title="级别" dataIndex="grade" key="grade" />
          <Column title="地形" dataIndex="ground" key="ground" />
          <Column title="类型" dataIndex="distanceType" key="distanceType" />
        </Table>
      </Drawer>
      </Flex.Item>
    </Flex>
    <Divider></Divider>
      {[1,2,3,4,5,6].map(index=>
        <Flex wrap='wrap' key={index}>
      {supports[index].id ?<>
        <Flex.Item style={{flex:'1 0 auto',width:'20%'}}>
          <Button onClick={()=>showSupport(index)}>选择辅助卡</Button>
          <img src={cdnServer+supports[index].imgUrl} alt={supports[index].name} width='100%'></img>
        </Flex.Item>
          {skillShow&&
          <Flex.Item style={{flex:'1 0 auto',width:'78%'}}>
            <SkillList skillList={supports[index].skillList} ></SkillList>
          </Flex.Item>
          }
          <Flex.Item style={{flex:'1 0 auto',width:'78%'}}>
            <EventList eventList={supports[index].eventList} pid={supports[index].id} type={'multi'}></EventList>
          </Flex.Item>
          </>:
        <Button onClick={()=>showSupport(index)}>选择辅助卡</Button>}
      <Divider></Divider>
      </Flex>
      )}
      <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} width={'80%'}>
        <Player onSelect={handleSelectPlayer}></Player>
      </Modal>
      <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} >
        <Support onSelect={needSelect?handleSelectSupport:null}></Support>
      </Modal>
      <Modal visible={isRaceVisible} onOk={closeRace} onCancel={closeRace} width={'100%'}>
        <Race onSelect={needSelect?handleSelectRace:null} type='medium'></Race>
      </Modal>
    </>
  )
}

export default Nurturing
