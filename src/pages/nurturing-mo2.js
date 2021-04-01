import React,{useState} from 'react';
import shortid from 'shortid'
import db from '../db.js'

import { Divider,Row,Col,Modal,Button, Popconfirm,Popover,Tooltip} from 'antd';
import {EditOutlined} from '@ant-design/icons'

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {BuffButton} from '../components/buff.js'

// import Race from './race.js'
import Player from './player.js'
import Support from './support.js'


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

  // const [isRaceVisible, setIsRaceVisible] = useState(false);

  const selected = db.get('selected').value()
  const [supports, setSupports] = useState(selected.supports);
  const [player, setPlayer] = useState(selected.player);

  const [decks,setDecks] = useState(db.get('myDecks').value())



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
  // const showRace = ()=>{
  //   setNeedSelect(true)
  //   setIsRaceVisible(true);
  // }
  // const closeRace = () => {
  //   setIsRaceVisible(false);
  // };

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
    [0,1,2,3,4,5].forEach(index=>{
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
    deck.supportsId.forEach((id,index)=>{
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
      <Col>
          <Button type={'primary'} onClick={showPlayer}>选择马娘</Button>
          <Button onClick={showSupport2}>支援卡查询</Button>
          <BuffButton></BuffButton>
        <Popover width={'80%'} content={
          <>
            <Button onClick={()=>saveDeck()}>保存为新卡组</Button>
            {decks.map(deck=>
              <Row key={deck.id}>
                {deck.imgUrls.map(imgUrl=>
                  <Col span={3} key={imgUrl}>
                    <img src={cdnServer+imgUrl} alt={imgUrl}  width={'100'}></img>
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
          }><Button>卡组</Button>
        </Popover>

        <br></br>

      </Col>
        <Row justify="space-around">
          <Col span={4}>{
            player.imgUrl&&
            <img src={cdnServer+player.imgUrl} alt={player.imgUrl} width='100%'></img>
          }
          </Col>
          <Col span={4}>
            <Popover content={<EventList eventList={player.eventList} pid={player.id} type='multi'></EventList>}>
              <Button style={{width:'100%',height:'100%'}}>事件</Button>
            </Popover>
          </Col>
          <Col span={4}>
            <Popover content={<RaceList raceList={player.id?player.raceList:[]}></RaceList>}>
              <Button style={{width:'100%',height:'100%'}}>赛程</Button>
            </Popover>
          </Col>
          <Col span={4}>
            <Popover content={<SkillList skillList={player.id?player.skillList:[]}></SkillList>}>
              <Button style={{width:'100%',height:'100%'}}>技能</Button>
            </Popover>
          </Col>
        </Row>

        <Row justify="space-around">
        {[0,1,2,3,4,5].map(index=>
          <Col span={7} key={index} style={{}}>
            <Tooltip title="选择支援卡">
              <Button icon={<EditOutlined />} onClick={()=>showSupport(index)}>支援卡</Button>
            </Tooltip>
            {supports[index]&&supports[index].id&&

            <Popover mask={true} content={<>
              <EventList eventList={supports[index].eventList} pid={supports[index].id} type='multi'></EventList>
              <Divider style={{margin:'8px 0'}}></Divider>
              <SkillList skillList={[...new Set(supports[index].skillList)]} ></SkillList>
            </>}>
              <img src={cdnServer+supports[index].imgUrl} alt={supports[index].name} width={'100%'}></img>
            </Popover>
            }
          </Col>
        )}
        </Row>
      <Button size='large' style={{
        zIndex:10000,
        position:'fixed',
        right:10,
        bottom:10,
      }}>返回</Button>
      <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} width={'80%'}>
        <Player onSelect={handleSelectPlayer}></Player>
      </Modal>
      <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} width={'80%'}>
        <Support onSelect={needSelect?handleSelectSupport:null} filter={false}></Support>
      </Modal>
    </Row>
  )
}

export default Nurturing


