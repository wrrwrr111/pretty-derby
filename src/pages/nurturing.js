import React,{useState} from 'react';
import shortid from 'shortid'
import db from '../db.js'
import t from '../components/t.js'

import { Divider,Row,Col,Modal,Button,Drawer,Table, Popover,Popconfirm} from 'antd';

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {BuffButton} from '../components/buff.js'
import {RaceSchedule,RaceTimeline} from '../components/race.js'

import Race from './race.js'
import Player from './player.js'
import Support from './support.js'

const {Column} = Table

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/'


const NurturingSupport = (props)=>{
  return (
    <Row>
          <Col span={4}>
            <img src={cdnServer+props.data.imgUrl} alt={props.data.name} width={'100%'}></img>
          </Col>
          <Col span={20}>
            <SkillList skillList={props.data.skillList} ></SkillList>
          </Col>
          <Col span={24}>
            <EventList eventList={props.data.eventList} pid={props.data.id}></EventList>
          </Col>
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
  const [filterRace,setFilterRace] = useState(selected.filterRace||[])

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
  const showRace = ()=>{
    setNeedSelect(true)
    setIsRaceVisible(true);
  }
  const closeRace = () => {
    setIsRaceVisible(false);
  };
  const handleSelectRace = (data)=>{
    setFilterRace(data);

    // save
    selected.filterRace = data
    db.get('selected').assign(selected).write()
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

  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height,setHeight] = React.useState(window.innerHeight);
    React.useEffect(() => {
      const handleWindowResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    console.log('currentWidth::',height);
    return {height};
  };

  const dynamicContentHeight = useViewport().height -128
  return(
    <Row className='nurturing-box' gutter={[32,8]}>

      <Col span={9} style={{height:dynamicContentHeight,overflowY:'auto'}}>
        <Button type={'primary'} onClick={showPlayer}>{t('选择马娘')}</Button>
        <Button onClick={showSupport2}>{t('支援卡查询')}</Button>
        <Button onClick={showRace}>{t('选择关注赛事')}</Button>
        <Popover width={'100%'} content={
          <>
            <Button onClick={()=>saveDeck()}>{t('保存为新卡组')}</Button>
            {decks.map(deck=>
              <Row key={deck.id}>
                {deck.imgUrls.map(imgUrl=>
                  <Col span={3} key={imgUrl}>
                    <img src={cdnServer+imgUrl} width={'100'}></img>
                  </Col>
                )}
                <Col span={3}>
                  <Button type="primary" onClick={()=>loadDeck(deck)}>{t('读取卡组')}</Button>
                  <Popconfirm title="确认覆盖？" onConfirm={()=>saveDeck(deck)}>
                    <Button danger type="dashed">{t('覆盖卡组')}</Button>
                  </Popconfirm>
                  <Popconfirm title="确认删除？" onConfirm={()=>deleteDeck(deck)}>
                    <Button danger type="dashed">{t('删除卡组')}</Button>
                  </Popconfirm>
                </Col>
              </Row>
            )}
          </>
        }><Button>{t('我的卡组')}</Button></Popover>
        <BuffButton></BuffButton>
        <Divider></Divider>
        <Row>
          <Col span={4}>
            <img src={player.id?cdnServer+player.imgUrl:null} width='100%'></img>
          </Col>
          <Col span={20}>
            <SkillList skillList={player.id?player.skillList:[]}></SkillList>
          </Col>
        </Row>
        <Divider></Divider>
      {player.id&&<>
          <EventList eventList={player.eventList} pid={player.id}></EventList>
          <Divider style={{margin:'4px 0'}}>{t('比赛')}</Divider>
          <RaceTimeline raceList={player.raceList} filterRace={filterRace}></RaceTimeline>
        </>}
      </Col>
      <Col sm={15} xs={24}>
        <Row gutter={[16,16]}>
        {[0,1,2,3,4,5].map(index=>
          <Col sm={8} xs={24} key={index}>
            <Button onClick={()=>showSupport(index)}>{t('选择支援卡')}</Button>
            {supports[index]&&supports[index].id &&<NurturingSupport data={supports[index]} ></NurturingSupport>}
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
