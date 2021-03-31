import React,{useState} from 'react';
import db from '../db.js'
import t from '../components/t.js'
import { Divider,Row,Col,Image,Modal,Checkbox,Card} from 'antd';

import {EventList} from '../components/event_v2.js'
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
      <Modal title={'角色详情'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={()=>(null)}
             width={800} >
        <div style={{height:144,display:'flex'}}>
          <Image src={cdnServer+props.data.imgUrl} preview={false} width={128} height={128} resizeMode={'cover'}></Image>
          <div style={{display:'flex',height:128,padding:24,flexDirection:'column',justifyContent:'space-between'}}>
            <text style={{fontSize:20,fontWeight:700}}>{t(props.data.name)}</text>
            <text style={{fontSize:20,fontWeight:700,color:'gray'}}>{props.data.name}</text>
          </div>
        </div>
        <Divider>适应</Divider>
        <AdaptBox2 player={props.data}></AdaptBox2>
        <Divider>成长</Divider>
        <GrowBox2 player={props.data}></GrowBox2>
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


const AdaptBox2 = (props)=>{

  const tableStyle = {
    width:"100%",
    cellPadding:4,
  }
  const cellStyle = {
    width:'20%',
    height:'32px',
    fontSize: 16,
    textAlign: 'flex-start',
    paddingLeft:16,
    fontWeight: 500,
    borderWidth:'thin',
    borderStyle:'none solid solid none',
    borderColor:'gray',
  }
  const headerCellStyle = {
    width:'20%',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 600,
    color:'#f5f5f5',
    textShadow: "0 2px #33333370",
    backgroundColor:'#32cd32C0',
    borderWidth:'thin',
    borderStyle:'none solid solid none',
    borderColor:'gray',
  }
  const adaptTextWrapperStyle = {paddingRight:16,display:'flex',width:'100%',alignItems:'center',justifyContent:'space-between'}

  const coloredGradeText = (text)=>{
    let color = 'gray';
    switch (text) {
      case 'S':
        color = '#FFD700';
        break
      case 'A':
        color = '#FFA500';
        break
      case 'B':
        color = '#BA55D3';
        break
      case 'C':
        color = '#90EE90';
        break
      case 'D':
        color = '#87CEEB';
        break
      default:
        color = 'gray'
    }
    return <text style={{fontSize:22,fontWeight:700,textShadow: "0 2px #33333370",color:color}}>{text}</text>
  }
  // {[`草地/芝\xa0`,coloredGradeText(props.player.grass)]}
  return(
    <div style={{borderRadius:'8px',borderStyle:'solid',borderWidth:'thin',borderColor:'gray'}}>
      <table {...tableStyle} >
        <tr>
          <td style={{ ...headerCellStyle ,borderRadius:"8px 0 0 0",fontWeight:700,fontSize:18}}>场地适应</td>
          <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`草地/芝`,coloredGradeText(props.player.grass)]}</div></td>
          <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`泥地/ダート`,coloredGradeText(props.player.dirt)]}</div></td>
          <td style={{ ...cellStyle }}>{`\xa0`}</td>
          <td style={{ ...cellStyle ,borderRadius:"0 8px 0 0",borderStyle:'none none solid none'}}>{`\xa0`}</td>
        </tr>
        <tr>
          <td style={{ ...headerCellStyle ,fontWeight:700,fontSize:18}}>赛程适应</td>
          <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`短距离`,coloredGradeText(props.player.shortDistance)]}</div></td>
          <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`英里`,coloredGradeText(props.player.mile)]}</div></td>
          <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`中距离`,coloredGradeText(props.player.mediumDistance)]}</div></td>
          <td style={{ ...cellStyle ,borderRadius:"0 0 8px 0",borderStyle:'none none solid none'}}><div style={adaptTextWrapperStyle}>{[`长距离`,coloredGradeText(props.player.longDistance)]}</div></td>
        </tr>
        <tr>
          <td style={{ ...headerCellStyle ,borderRadius:"0 0 0 8px",borderStyle:'none solid none none',fontWeight:700,fontSize:18}}>脚质适应</td>
          <td style={{ ...cellStyle ,borderStyle:'none solid none none'}}><div style={adaptTextWrapperStyle}>{[`逃脱/逃げ`,coloredGradeText(props.player.escape)]}</div></td>
          <td style={{ ...cellStyle ,borderStyle:'none solid none none'}}><div style={adaptTextWrapperStyle}>{[`先行`,coloredGradeText(props.player.leading)]}</div></td>
          <td style={{ ...cellStyle ,borderStyle:'none solid none none'}}><div style={adaptTextWrapperStyle}>{[`插入/差し`,coloredGradeText(props.player.insert)]}</div></td>
          <td style={{ ...cellStyle ,borderRadius:"0 0 8px 0",borderStyle:'none none none none'}}><div style={adaptTextWrapperStyle}>{[`追击/追込`,coloredGradeText(props.player.tracking)]}</div></td>
        </tr>
      </table>
    </div>
  )


}

const GrowBox2= (props)=>{
  const tableStyle = {
    width:"100%",
    cellPadding:4,
  }
  const headerCellStyle = {
    width:'20%',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 600,
    color:'#f5f5f5',
    textShadow: "0 2px #33333370",
    backgroundColor:'#32cd32C0',
    borderWidth:'thin',
    borderStyle:'none solid solid none',
    borderColor:'gray',
  }
  const cellStyle = {
    width:'20%',
    height:'40px',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
    borderWidth:'thin',
    borderStyle:'none solid none none',
    borderColor:'gray',
  }

  return(
    <div style={{borderRadius:'8px',borderStyle:'solid',borderWidth:'thin',borderColor:'gray'}}>
      <table {...tableStyle} >
        <tr>
          <th style={{ ...headerCellStyle ,borderRadius:"8px 0 0 0"}}>速度/スピード</th>
          <th style={{ ...headerCellStyle }}>耐力/スタミナ</th>
          <th style={{ ...headerCellStyle }}>力量/パワー</th>
          <th style={{ ...headerCellStyle }}>毅力/根性</th>
          <th style={{ ...headerCellStyle ,borderRadius:"0 8px 0 0",borderStyle:'none none solid none'}}>智慧/賢さ</th>
        </tr>
        <tr>
          <td style={{ ...cellStyle ,borderRadius:"0 0 0 8px"}}>{props.player.speedGrow}</td>
          <td style={{ ...cellStyle }}>{props.player.staminaGrow}</td>
          <td style={{ ...cellStyle }}>{props.player.powerGrow}</td>
          <td style={{ ...cellStyle }}>{props.player.gutsGrow}</td>
          <td style={{ ...cellStyle ,borderRadius:"0 0 8px 0",borderStyle:'none none none none'}}>{props.player.wisdomGrow}</td>
        </tr>
      </table>
    </div>
  )

}


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
      <Row justify="space-around">
        <Col span={22}>
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
          }
        </Col>
      </Row>
    )
  }
}
Player.defaultProps={
  playerList:db.get('players').value()
}

export default Player
