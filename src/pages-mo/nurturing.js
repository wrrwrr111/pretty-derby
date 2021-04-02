import React,{useState} from 'react';
import {withRouter} from 'react-router-dom';
import shortid from 'shortid'
import db from '../db.js'

import { Divider,Row,Col,Modal,Button, Popconfirm,Popover,Tooltip} from 'antd';
import {EditOutlined} from '@ant-design/icons'

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {BuffButton} from '../components/buff.js'

// import Race from './race.js'
import Player from '../pages/player.js'
import Support from '../pages/support.js'


const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'



const Nurturing = (props) =>{
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

  const toSupportDetail = (id)=>{
    props.history.push(`/support-detail/${id}`)
  }
  const toPlayerDetail = (id)=>{
    props.history.push(`/player-detail/${id}/1`)
  }
  const toBuffList = (id)=>{
    props.history.push(`/buff`)
  }
  return(
    <Row className='nurturing-box' gutter={[16,16]}>
      <Col>
          <Button type={'primary'} onClick={showPlayer}>选择马娘</Button>
          <Button onClick={showSupport2}>支援卡查询</Button>
          <Button onClick={toBuffList}>BUFF查询</Button>
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
        {player.imgUrl&&
          <img src={cdnServer+player.imgUrl} alt={player.imgUrl} width='128'
          onClick={()=>toPlayerDetail(player.id)}></img>
        }
      </Col>

        <Row justify="space-around">
        {[0,1,2,3,4,5].map(index=>
          <Col span={7} key={index} style={{}}>
            <Button icon={<EditOutlined />} onClick={()=>showSupport(index)}>支援卡</Button>
            {supports[index]&&supports[index].id&&
              <img src={cdnServer+supports[index].imgUrl} alt={supports[index].name} width={'100%'}
              onClick={()=>toSupportDetail(supports[index].id)}></img>
            }
          </Col>
        )}
        </Row>
      <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} footer={null} width={'80%'}>
        <Player onSelect={handleSelectPlayer}></Player>
      </Modal>
      <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} footer={null} width={'80%'}>
        <Support onSelect={needSelect?handleSelectSupport:null} filter={false}></Support>
      </Modal>
    </Row>
  )
}

export default withRouter(Nurturing)


