import React,{useState} from 'react';
import shortid from 'shortid'
import db from '../db.js'
import t from '../components/t.js'
import { Divider,Row,Col,Modal,Button,Drawer,Table, Popover,Popconfirm,Tooltip} from 'antd';
import {EditOutlined} from '@ant-design/icons'

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {BuffButton} from '../components/buff.js'
import {RaceSchedule} from '../components/race.js'


import Race from './race.js'
import Player from './player.js'
import Support from './support.js'


const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'


const Nurturing = () =>{
  const [needSelect,setNeedSelect] = useState(false)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [supportIndex, setSupportIndex] = useState(1);

  const [isRaceVisible, setIsRaceVisible] = useState(false);

  const selected = db.get('selected').value()
  const [supports, setSupports] = useState(selected.supports);
  const [player, setPlayer] = useState(selected.player);
  const [selectedRaceList,setSelectedRaceList] = useState(selected.selectedRaceList||[])

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
    setSelectedRaceList(data);

    // save
    selected.selectedRaceList = data
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
  const dynamicCardHeight = Math.floor(dynamicContentHeight / 2)
  const dynamicCardWidth = Math.floor(dynamicCardHeight * 3 / 4)
  const dynamicCardBoxWidth = dynamicCardWidth * 3

  return(
    <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{height:dynamicContentHeight,overflowY:'auto'}}>
        <Button className='add-player' type={'primary'} onClick={showPlayer}>{t('选择马娘')}</Button>
        <Button onClick={showSupport2}>{t('支援卡查询')}</Button>
        <Button onClick={showRace}>{t('选择关注赛事')}</Button>
        <Popover width={'100%'} content={
          <>
            <Button onClick={()=>saveDeck()}>{t('保存为新卡组')}</Button>
            {decks.map(deck=>
              <Row key={deck.id}>
                {deck.imgUrls.map(imgUrl=>
                  <Col span={3} key={imgUrl}>
                    <img src={cdnServer+imgUrl} alt={imgUrl} width={'100'}></img>
                  </Col>
                )}
                <Col span={3}>
                  <Button type="primary" onClick={()=>loadDeck(deck)}>{t('读取卡组')}</Button>
                  <Popconfirm title={t("确认覆盖？")} onConfirm={()=>saveDeck(deck)}>
                    <Button danger type="dashed">{t('覆盖卡组')}</Button>
                  </Popconfirm>
                  <Popconfirm title={t("确认删除？")} onConfirm={()=>deleteDeck(deck)}>
                    <Button danger type="dashed">{t('删除卡组')}</Button>
                  </Popconfirm>
                </Col>
              </Row>
            )}
          </>
        }><Button>{t('我的卡组')}</Button></Popover>
        <BuffButton></BuffButton>
        <Divider style={{margin:'4px 0'}}></Divider>
        {player.id&&<>
          <img src={cdnServer+player.imgUrl} alt={player.imgUrl} width='20%'
            style={{float:'left',marginRight:'8px'}}></img>
          <EventList eventList={player.eventList} pid={player.id} type='multi'></EventList>
          <RaceSchedule raceList={player.raceList} selectedRaceList={selectedRaceList}></RaceSchedule>
          <Divider style={{margin:'4px 0'}}></Divider>
          <SkillList skillList={player.skillList}></SkillList>
        </>}



      </div>

      <div style={{flex:`0 0 ${dynamicCardBoxWidth}px`,display:'flex',flexWrap:'wrap'}}>
        {[0,1,2,3,4,5].map(index=>
            supports[index]&&supports[index].id?
              <div style={{
                  width:dynamicCardWidth,
                  height:dynamicCardHeight,
                  backgroundImage:`url(${cdnServer+supports[index].imgUrl})`,
                  backgroundRepeat:'no-repeat',
                  backgroundSize:'cover'}}>
                <div style={{
                  backgroundColor:'rgba(0,0,0,0.2)',
                  height:'100%',
                  padding:'10px'}}>
                <Tooltip title={t('选择支援卡')}>
                  <Button shape="circle" icon={<EditOutlined />} onClick={()=>showSupport(index)}/>
                </Tooltip>
                <EventList eventList={supports[index].eventList} pid={supports[index].id} type='multi'></EventList>
                <Divider style={{margin:'8px 0'}}></Divider>
                <SkillList skillList={[...new Set(supports[index].skillList)]} ></SkillList>
                </div>
              </div>
            :<Button onClick={()=>showSupport(index)}>{t('选择支援卡')}</Button>
        )}
      </div>

      <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} width={'80%'}>
        <Player onSelect={handleSelectPlayer}></Player>
      </Modal>
      <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} width={'80%'}>
        <Support onSelect={needSelect?handleSelectSupport:null}></Support>
      </Modal>
      <Modal visible={isRaceVisible} onOk={closeRace} onCancel={closeRace} width={'80%'}>
        <Race onSelect={needSelect?handleSelectRace:null}></Race>
      </Modal>
    </div>
  )
}

export default Nurturing


