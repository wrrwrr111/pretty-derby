import React,{useState} from 'react';
import db from '../db.js'

import { Divider,Row,Col,Modal,Button,Drawer,Table} from 'antd';

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {BuffButton} from '../components/buff.js'

import Race from './race.js'
import Player from './player.js'
import Support from './support.js'

const {Column} = Table

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'


const NurturingSupport = (props)=>{
  return (
    <>
          <Col span={12}>
            <img src={cdnServer+props.data.imgUrl} alt={props.data.name} width={'50%'}></img>
          </Col>
          <Col span={24}>
            <SkillList skillList={props.data.possessionSkill} ></SkillList>
          </Col>
          <Col span={24}>
            <SkillList skillList={props.data.trainingEventSkill}></SkillList>
          </Col>
          <Col span={24}>
            <EventList eventList={props.data.eventList} pid={props.data.id}></EventList>
          </Col>
    </>
  )
}
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

  return(
    <Row className='nurturing-box' gutter={[16,16]}>

      <Col span = {9}>
        <Button type={'primary'} onClick={showPlayer}>选择马娘</Button>
        <Button onClick={showSupport2}>辅助卡查询</Button>
        <BuffButton></BuffButton>
        <Button onClick={showRace}>选择关注赛事</Button>
        <Button onClick={showDrawer}>查看关注赛事</Button>
        <Divider></Divider>
        <SkillList skillList={player.id?player.skillList:[]}></SkillList>
        <Divider></Divider>
        <RaceList raceList={player.id?player.raceList:[]}></RaceList>
        <Drawer
        title="关注赛事"
        onClose={onDrawerClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
        closable={true}
        placement="left"
        mask={true}
        maskClosable={true}
        width={'95%'}
      >
        {/* {races.map(race=>
          <p>{race.name}</p>
          )} */}
        <Table dataSource={races} pagination={false}>
          <Column title="名称" dataIndex="name" key="name" />
          <Column title="时间" dataIndex="date" key="date" />
          <Column title="级别" dataIndex="grade" key="grade" />
          <Column title="类型" dataIndex="distanceType" key="distanceType" />
        </Table>
      </Drawer>
      </Col>
      <Col span = {5}>
        <Row>
          <Col span={12}>
            <Button onClick={()=>showSupport(1)}>选择辅助卡</Button>
          </Col>
          {supports[1].id &&<NurturingSupport data={supports[1]} ></NurturingSupport>}
        </Row>
      </Col>
      <Col span = {5}>
        <Row>
          <Col span={12}>
            <Button onClick={()=>showSupport(2)}>选择辅助卡</Button>
          </Col>
          {supports[2].id &&<NurturingSupport data={supports[2]} ></NurturingSupport>}
        </Row>
      </Col>
      <Col span = {5}>
        <Row>
          <Col span={12}>
            <Button onClick={()=>showSupport(3)}>选择辅助卡</Button>
          </Col>
          {supports[3].id &&<NurturingSupport data={supports[3]} ></NurturingSupport>}
        </Row>
      </Col>

      <Col span = {9}>
        {player.id&&
          <EventList eventList={player.eventList} pid={player.id}></EventList>
        }
      </Col>
      <Col span = {5}>
      <Row>
          <Col span={12}>
            <Button onClick={()=>showSupport(4)}>选择辅助卡</Button>
          </Col>
          {supports[4].id &&<NurturingSupport data={supports[4]}></NurturingSupport>}
        </Row>
      </Col>
      <Col span = {5}>
      <Row>
          <Col span={12}>
            <Button onClick={()=>showSupport(5)}>选择辅助卡</Button>
          </Col>
          {supports[5].id &&<NurturingSupport data={supports[5]}></NurturingSupport>}
        </Row>
      </Col>
      <Col span = {5}>
      <Row>
          <Col span={12}>
            <Button onClick={()=>showSupport(6)}>选择辅助卡</Button>
          </Col>
          {supports[6].id &&<NurturingSupport data={supports[6]} ></NurturingSupport>}
        </Row>
      </Col>
      <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} width={'80%'}>
        <Player onSelect={handleSelectPlayer}></Player>
      </Modal>
      <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} width={'80%'}>
        <Support onSelect={needSelect?handleSelectSupport:null}></Support>
      </Modal>
      <Modal visible={isRaceVisible} onOk={closeRace} onCancel={closeRace} width={'80%'}>
        <Race onSelect={needSelect?handleSelectRace:null}></Race>
      </Modal>
    </Row>
  )
}

export default Nurturing
