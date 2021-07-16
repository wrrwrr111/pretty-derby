import React,{useEffect, useState} from 'react';
import shortid from 'shortid'
import db from '../db.js'
import dbL from '../dbL.js'
import t from '../components/t.js'
import axios from "axios";

import { Divider,Row,Col,Modal,Button,Tag,message, Popover,Popconfirm,Checkbox} from 'antd';
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/'

const MyDecks = (props)=>{
  const [decks,setDecks] = useState(dbL.get('myDecks').value())
  // 卡组相关操作
  const saveDeck = (deck)=>{
    let tmpDeck = {
      imgUrls:[],
      supportsId:[],
      tags:[],
    }
    if(props.player.id){
      tmpDeck.playerId = props.player.id
      tmpDeck.imgUrls.push(props.player.imgUrl)
    }
    [0,1,2,3,4,5].forEach(index=>{
      if(props.supports[index]&&props.supports[index].id){
        tmpDeck.imgUrls.push(props.supports[index].imgUrl)
        tmpDeck.supportsId.push(props.supports[index].id)
      }else{
        tmpDeck.supportsId.push(null)
      }
    })
    if(deck){
      //update
      dbL.get('myDecks').find({id:deck.id}).assign(tmpDeck).write()
    }else{
      //
      tmpDeck.id = shortid.generate()
      dbL.get('myDecks').push(tmpDeck).write()
    }
    setDecks([...dbL.get('myDecks').value()])
  }

  const deleteDeck = (deck)=>{
    dbL.get('myDecks').remove({id:deck.id}).write()
    setDecks([...dbL.get('myDecks').value()])
  }
  const shareDeck = async (deck) =>{
    //判断表格
    // if(deck.playerId)
    const formData = {
      ...deck,
      id:deck.playerId+deck.supportsId.sort((a,b)=>a.localeCompare(b)).join("")
    }
    console.log(formData)
    const res = await axios.post("https://urarawin.com/api/addDeck", formData);
    const data = res.data
    data&&message.info(data.msg);

  }

  const labels = ['短距離','マイル','中距離','長距離','ダート','逃げ','先行','差し','追込',
                  '高速度','高耐力','高力量','高根性 ','高智力','竞技场前排','萌新之友']
  const onChangeTag =  (values,deck)=>{
    dbL.get('myDecks').find({id:deck.id}).assign({tags:values}).write()
    setDecks([...dbL.get('myDecks').value()])
  }

  return <Popover width={'100%'}  overlayStyle={{maxHeight:800,overflow:'auto'}}
  content={
    <>
          <Button onClick={()=>saveDeck()}>{t('保存为新卡组')}</Button>
          {decks.map(deck=>
            <>
            <Row>
              <Checkbox.Group options={labels} defaultValue={deck.tags||[]}
                    onChange={(values)=>onChangeTag(values,deck)}/>
            </Row>
            <Row key={deck.id}>
              {deck.imgUrls.map(imgUrl=>
                <Col span={3} key={imgUrl}>
                  <img src={cdnServer+imgUrl} alt={imgUrl} width={'100'}></img>
                </Col>
              )}
              <Col span={3}>
                <Button type="primary" onClick={()=>props.loadDeck(deck)}>{t('读取卡组')}</Button>
                <Popconfirm title={t("确认覆盖？")} onConfirm={()=>saveDeck(deck)}>
                  <Button danger type="dashed">{t('覆盖卡组')}</Button>
                </Popconfirm>
                <Popconfirm title={t("确认删除？")} onConfirm={()=>deleteDeck(deck)}>
                  <Button danger type="dashed">{t('删除卡组')}</Button>
                </Popconfirm>
                <Popconfirm title={t("确认分享？")} onConfirm={()=>shareDeck(deck)}>
                  <Button>分享卡组</Button>
                </Popconfirm>
              </Col>
            </Row>
          </>)}
        </>
      }><Button>{t('我的卡组')}</Button>
  </Popover>
}

const RecommendDecks = (props)=>{
  // const [recommendDecks,setRecommendDecks] = useState(res.data||[])
  const [recommendDecks,setRecommendDecks] = useState([])
  const [playerId,setPlayerId] = useState('')
  const searchDeck = async () =>{
    if(playerId!==props.player.id){
      const formData = props.player? {playerId:props.player.id}:{}
      const res = await axios.post("https://urarawin.com/api/searchDeck",formData)
      setRecommendDecks(res.data||[])
      setPlayerId(props.player.id)
    }
  }
  const deleteDeck = async (deck)=>{
    const res = await axios.post("https://urarawin.com/api/deleteDeck",deck)
    searchDeck()
  }
  return <Popover width={'100%'} onVisibleChange = {searchDeck} overlayStyle={{maxHeight:800,overflow:'auto'}}
  content={
    recommendDecks.map(deck=>
      <>
        <Row>
          {deck.tags&&deck.tags.map(tag=><Tag>{tag}</Tag>)}
        </Row>
        <Row key={deck.id}>
          {deck.imgUrls.map(imgUrl=>
            <Col span={3} key={imgUrl}>
              <img src={cdnServer+imgUrl} alt={imgUrl} width={'100'}></img>
            </Col>
          )}
          <Col span={3}>
            <Button type="primary" onClick={()=>props.loadDeck(deck)}>{t('读取卡组')}</Button>
            {/* <Button type="primary" onClick={()=>deleteDeck(deck)}>{t('删除卡组')}</Button> */}
          </Col>
        </Row>
      </>
        )
    }>
      <Button>{t('推荐卡组')}</Button>
  </Popover>
}

export{MyDecks,RecommendDecks}
