import React,{useState} from 'react';
import db from '../db.js'
import t from '../components/t.js'
import { Divider,Row,Col,Image,Modal,Checkbox,Card} from 'antd';

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'

const CheckboxGroup = Checkbox.Group

// todo 提取出来
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const PlayerCard = (props)=>{
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if(props.onSelect){
      props.onSelect(props.data)
    }else{
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card cover={
        <Image src={cdnServer+props.data.imgUrl} preview={false} onClick={showModal} width={'100%'}></Image>

      }>
        <Card.Meta title={t(props.data.name)} ></Card.Meta>
      </Card>
      <Modal title={props.data.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        width={800} >
        <span>{t(props.data.name)}</span>
        <Divider>适应</Divider>
        <AdaptBox player={props.data}></AdaptBox>
        <Divider>成长</Divider>
        <GrowBox player={props.data}></GrowBox>
        <Divider>技能</Divider>
        <SkillList skillList={props.data.skillList}></SkillList>
        <Divider>事件</Divider>
        <EventList eventList={props.data.eventList} pid={props.data.id}></EventList>
      </Modal>
    </>
  )
}
const AdaptBox = (props)=>
  <Row  gutter={[8, 8]}>
    <Col span = {6}>草地/芝</Col>
    <Col span = {6}>泥地/ダート</Col>
    <Col span = {6}></Col>
    <Col span = {6}></Col>
    <Col span = {6}>{props.player.grass}</Col>
    <Col span = {6}>{props.player.dirt}</Col>
    <Col span = {6}></Col>
    <Col span = {6}></Col>

    <Col span = {6}>短距离</Col>
    <Col span = {6}>英里/マイル</Col>
    <Col span = {6}>中距离</Col>
    <Col span = {6}>长距离</Col>
    <Col span = {6}>{props.player.shortDistance}</Col>
    <Col span = {6}>{props.player.mile}</Col>
    <Col span = {6}>{props.player.mediumDistance}</Col>
    <Col span = {6}>{props.player.longDistance}</Col>

    <Col span = {6}>逃脱/逃げ</Col>
    <Col span = {6}>先行</Col>
    <Col span = {6}>插入/差</Col>
    <Col span = {6}>追击/追込</Col>
    <Col span = {6}>{props.player.escape}</Col>
    <Col span = {6}>{props.player.leading}</Col>
    <Col span = {6}>{props.player.insert}</Col>
    <Col span = {6}>{props.player.tracking}</Col>
  </Row>

const GrowBox = (props)=>
  <Row gutter={[8, 8]}>
    <Col span = {4}>速度/スピード</Col>
    <Col span = {4}>耐力/スタミナ</Col>
    <Col span = {4}>力量/パワー</Col>
    <Col span = {4}>毅力/根性</Col>
    <Col span = {5}>智慧/賢さ</Col>

    <Col span = {4}>{props.player.speedGrow}</Col>
    <Col span = {4}>{props.player.staminaGrow}</Col>
    <Col span = {4}>{props.player.powerGrow}</Col>
    <Col span = {4}>{props.player.gutsGrow}</Col>
    <Col span = {5}>{props.player.wisdomGrow}</Col>
  </Row>
//todo filter
class Player extends React.Component{
  constructor(props){
    super(props)
    this.state = {list:props.playerList}
  }
  componentDidUpdate(prevProps){
    if(this.props.playerList !== prevProps.playerList){
      this.setState({list:this.props.playerList})
    }
  }
  render(){
    return(
      <>
        {
          ['3','2','1'].map(rare=>(
            <Row gutter={[16,16]} key={rare}>
            <Divider>{rare}星</Divider>
          {this.state.list.filter(item=>item.rare===rare).map(player=>
            <Col xxl={2} lg={3} sm={6} xs={6} key={player.id}>
              <PlayerCard data={player} onSelect={this.props.onSelect}></PlayerCard>
            </Col>)
          }
          </Row>
          ))
        }</>
    )
  }
}
Player.defaultProps={
  playerList:db.get('players').value()
}

export  default Player
