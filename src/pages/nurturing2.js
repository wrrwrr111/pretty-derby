import React,{useState} from 'react';
import shortid from 'shortid'
import db from '../db.js'

import { Divider,Row,Col,Modal,Button,Drawer,Table, Popover,Popconfirm,Tooltip} from 'antd';
import {EditOutlined} from '@ant-design/icons'

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {BuffButton} from '../components/buff.js'

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

  const [decks,setDecks] = useState(db.get('myDecks').value())
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

  // 卡组相关操作
  const saveDeck = (deck)=>{
    let tmpDeck = {
      imgUrls:[],
      supportsId:[],
    }
    if(player.id){
      tmpDeck.playerId = player.id
      tmpDeck.imgUrls.push(player.imgUrl)
    }
    [0,1,2,3,4,5].map(index=>{
      if(supports[index]&&supports[index].id){
        tmpDeck.imgUrls.push(supports[index].imgUrl)
        tmpDeck.supportsId.push(supports[index].id)
      }else{
        tmpDeck.supportsId.push(null)
      }
    })
    if(deck){
      //update
      db.get('myDecks').find({id:deck.id}).assign(tmpDeck).write()
    }else{
      //
      tmpDeck.id = shortid.generate()
      db.get('myDecks').push(tmpDeck).write()
    }
    setDecks([...db.get('myDecks').value()])
  }
  const loadDeck = (deck)=>{
    selected.supports={0:{},1:{},2:{},3:{},4:{},5:{}}
    selected.player={}
    if(deck.playerId){
      selected.player = db.get('players').find({id:deck.playerId}).value()
    }
    setPlayer(selected.player)
    deck.supportsId.map((id,index)=>{
      if(id){
        selected.supports[index]=db.get('supports').find({id:id}).value()
      }
    })
    setSupports({...selected.supports})
    db.get('selected').assign(selected).write()
  }
  const deleteDeck = (deck)=>{
    db.get('myDecks').remove({id:deck.id}).write()
    setDecks([...db.get('myDecks').value()])
  }


  return(
    <Row className='nurturing-box' gutter={[16,16]}>
      <Col sm={8} xs={24}>
        <Button type={'primary'} onClick={showPlayer}>选择马娘</Button>
        <Button onClick={showSupport2}>辅助卡查询</Button>
        <Button onClick={showRace}>选择关注赛事</Button>
        <Button onClick={showDrawer}>查看关注赛事</Button>
        <Popover width={'100%'} content={
          <>
            <Button onClick={()=>saveDeck()}>保存为新卡组</Button>
            {decks.map(deck=>
              <Row key={deck.id}>
                {deck.imgUrls.map(imgUrl=>
                  <Col span={3} key={imgUrl}>
                    <img src={cdnServer+imgUrl} width={'100'}></img>
                  </Col>
                )}
                <Col span={3}>
                  <Button type="primary" onClick={()=>loadDeck(deck)}>读取卡组</Button>
                  <Popconfirm title="确认覆盖？" onConfirm={()=>saveDeck(deck)}>
                    <Button danger type="dashed">覆盖卡组</Button>
                  </Popconfirm>
                  <Popconfirm title="确认删除？" onConfirm={()=>deleteDeck(deck)}>
                    <Button danger type="dashed">删除卡组</Button>
                  </Popconfirm>
                </Col>
              </Row>
            )}
          </>
        }><Button>卡组</Button></Popover>
        <BuffButton></BuffButton>
        <Divider style={{margin:'4px 0'}}></Divider>
        <img src={player.id?cdnServer+player.imgUrl:null} width='20%' style={{float:'left'}}></img>
        <EventList eventList={player.eventList} pid={player.id} type='multi'></EventList>
        <RaceList raceList={player.id?player.raceList:[]}></RaceList>
        <SkillList skillList={player.id?player.skillList:[]}></SkillList>
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
        <Table dataSource={races} pagination={false}>
          <Column title="名称" dataIndex="name" key="name" />
          <Column title="时间" dataIndex="date" key="date" />
          <Column title="级别" dataIndex="grade" key="grade" />
          <Column title="类型" dataIndex="distanceType" key="distanceType" />
        </Table>
      </Drawer>

      </Col>

      <Col sm={16} xs={24}>
        <Row gutter={[16,16]}>
        {[0,1,2,3,4,5].map(index=>
          <Col sm={8} xs={24} key={index} style={{}}>
            {supports[index]&&supports[index].id?
            <>
              <img src={cdnServer+supports[index].imgUrl} alt={supports[index].name} width={'100%'}
               ></img>
              <div style={{position:'absolute',padding:'12px',
                          top:'0',left:'0',
                          width:'100%',height:'100%',
                          overflow:'auto'}} className='support-card'>
                <Tooltip title="选择辅助卡">
                  <Button shape="circle" icon={<EditOutlined />} onClick={()=>showSupport(index)}/>
                </Tooltip>
                <EventList eventList={supports[index].eventList} pid={supports[index].id} type='multi'></EventList>
                <Divider style={{margin:'8px 0'}}></Divider>
                <SkillList skillList={[...new Set(supports[index].skillList)]} ></SkillList>
              </div>
            </>
            :<Button onClick={()=>showSupport(index)}>选择辅助卡</Button>
            }
          </Col>
        )}
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


