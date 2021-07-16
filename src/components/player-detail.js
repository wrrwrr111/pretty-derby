import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

import { Divider,Image,Card,Modal,Table} from 'antd';
import db from '../db.js'
import dbL from '../dbL.js'
import t from './t.js'

import {EventList} from './event.js'
import {SkillList} from './skill-detail.js'
// import RaceList from './player-race.js'
import {RaceSchedule,RaceTimeline} from '../components/race.js'
// import {EffectTable} from './effect.js'
const ua = dbL.get('ua').value();
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const PlayerDetail = (props) =>{
  const id = props.playerId!==undefined?props.playerId:props.match.params.id
  // 是否育成 育成顺序样式不同
  const isNur = props.isNur!==undefined?props.isNur:parseInt(props.match.params.nur)
  const data = db.get('players').find({id}).value()
  const PlayerItem = () => <div style={{height:69,display:'flex'}}>
    <Image src={cdnServer+data.imgUrl} width={63} height={69} resizemode={'cover'}></Image>
    <div style={{display:'flex',height:64,flexDirection:'column',justifyContent:'space-between'}}>
      <div style={{fontSize:20,fontWeight:700}}>{data.name}</div>
      <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{t(data.name)}</div>
      <div style={{fontSize:20,fontWeight:700}}>{data.charaName}</div>
      <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{t(data.charaName)}</div>
    </div>
  </div>
  if(isNur){
    return <>
      <PlayerItem></PlayerItem>
      <Divider>{t("事件")}</Divider>
      <EventList eventList={data.eventList} pid={data.id} ></EventList>
      <Divider>{t("隐藏事件")}</Divider>
      <EventList eventList={data.hideEvent} pid={data.id} type='all'></EventList>
      <Divider>{t("赛程")}</Divider>
      {/* <RaceSchedule raceList={data.raceList}></RaceSchedule> */}
      <RaceTimeline raceList={data.raceList}></RaceTimeline>
      <Divider>{t("技能")}</Divider>
      <SkillList skillList={data.skillList}></SkillList>
    </>
  }else{
    return <>
    <PlayerItem></PlayerItem>
    <Divider>{t("适应")}</Divider>
    <AdaptBox player={data}></AdaptBox>
    <Divider>{t("成长")}</Divider>
    <GrowBox player={data}></GrowBox>
    <Divider>{t("技能")}</Divider>
    <SkillList skillList={data.skillList}></SkillList>
    <Divider>{t("事件")}</Divider>
    <EventList eventList={data.eventList} pid={data.id} ></EventList>
    <Divider>{t("隐藏事件")}</Divider>
    <EventList eventList={data.hideEvent} pid={data.id} type='all'></EventList>
    <Divider>{t("赛程")}</Divider>
    {/* <RaceSchedule raceList={data.raceList}></RaceSchedule> */}
    <RaceTimeline raceList={data.raceList}></RaceTimeline>
  </>
  }
}
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
  return <div style={{fontSize:22,fontWeight:700,textShadow: "0 2px #33333370",color:color}}>{text}</div>
}
const AdaptBox = (props)=>{

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


  // {[`草地/芝\xa0`,coloredGradeText(props.player.grass)]}
  return(
    <div style={{borderRadius:'8px',borderStyle:'solid',borderWidth:'thin',borderColor:'gray'}}>
      <table {...tableStyle} >
        <tbody>
          <tr>
            <td style={{ ...headerCellStyle ,borderRadius:"8px 0 0 0",fontWeight:700,fontSize:18}}>{t("场地适应")}</td>
            <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`${t("芝")}`,coloredGradeText(props.player.grass)]}</div></td>
            <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`${t("ダート")}`,coloredGradeText(props.player.dirt)]}</div></td>
            <td style={{ ...cellStyle }}>{`\xa0`}</td>
            <td style={{ ...cellStyle ,borderRadius:"0 8px 0 0",borderStyle:'none none solid none'}}>{`\xa0`}</td>
          </tr>
          <tr>
            <td style={{ ...headerCellStyle ,fontWeight:700,fontSize:18}}>{t("赛程适应")}</td>
            <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`${t("短距離")}`,coloredGradeText(props.player.shortDistance)]}</div></td>
            <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`${t("マイル")}`,coloredGradeText(props.player.mile)]}</div></td>
            <td style={{ ...cellStyle }}><div style={adaptTextWrapperStyle}>{[`${t("中距離")}`,coloredGradeText(props.player.mediumDistance)]}</div></td>
            <td style={{ ...cellStyle ,borderRadius:"0 0 8px 0",borderStyle:'none none solid none'}}><div style={adaptTextWrapperStyle}>{[`${t("長距離")}`,coloredGradeText(props.player.longDistance)]}</div></td>
          </tr>
          <tr>
            <td style={{ ...headerCellStyle ,borderRadius:"0 0 0 8px",borderStyle:'none solid none none',fontWeight:700,fontSize:18}}>{t("脚质适应")}</td>
            <td style={{ ...cellStyle ,borderStyle:'none solid none none'}}><div style={adaptTextWrapperStyle}>{[`${t("逃げ")}`,coloredGradeText(props.player.escape)]}</div></td>
            <td style={{ ...cellStyle ,borderStyle:'none solid none none'}}><div style={adaptTextWrapperStyle}>{[`${t("先行")}`,coloredGradeText(props.player.leading)]}</div></td>
            <td style={{ ...cellStyle ,borderStyle:'none solid none none'}}><div style={adaptTextWrapperStyle}>{[`${t("差し")}`,coloredGradeText(props.player.insert)]}</div></td>
            <td style={{ ...cellStyle ,borderRadius:"0 0 8px 0",borderStyle:'none none none none'}}><div style={adaptTextWrapperStyle}>{[`${t("追込")}`,coloredGradeText(props.player.tracking)]}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const GrowBox= (props)=>{
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
        <tbody>
          <tr>
            <th style={{ ...headerCellStyle ,borderRadius:"8px 0 0 0"}}>{t("スピード")}</th>
            <th style={{ ...headerCellStyle }}>{t("スタミナ")}</th>
            <th style={{ ...headerCellStyle }}>{t("パワー")}</th>
            <th style={{ ...headerCellStyle }}>{t("根性")}</th>
            <th style={{ ...headerCellStyle ,borderRadius:"0 8px 0 0",borderStyle:'none none solid none'}}>{t("賢さ")}</th>
          </tr>
          <tr>
            <td style={{ ...cellStyle ,borderRadius:"0 0 0 8px"}}>{props.player.speedGrow}</td>
            <td style={{ ...cellStyle }}>{props.player.staminaGrow}</td>
            <td style={{ ...cellStyle }}>{props.player.powerGrow}</td>
            <td style={{ ...cellStyle }}>{props.player.gutsGrow}</td>
            <td style={{ ...cellStyle ,borderRadius:"0 0 8px 0",borderStyle:'none none none none'}}>{props.player.wisdomGrow}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
const PlayerCard = (props)=>{
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const player = props.data
  const showName = props.name!==undefined?props.name:true
  const showPlayerDetail = () => {
    if(props.onSelect){
      props.onSelect(player)
    }else{
      if(ua==='mo'){
        history.push(`/player-detail/${player.id}/0`)
      }else{
        setIsModalVisible(true);
      }
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

      {showName?
      <Card cover={<Image src={cdnServer+player.imgUrl} preview={false} onClick={showPlayerDetail} width={'100%'}></Image>}>
        <Card.Meta title={t(player.name)} ></Card.Meta>
        <Card.Meta title={t(player.charaName)} ></Card.Meta>
      </Card>:
      <Image src={cdnServer+player.imgUrl} preview={false} onClick={showPlayerDetail} width={'100%'}></Image>
      }
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={800} >
        <PlayerDetail playerId={player.id} isNur={false}></PlayerDetail>
      </Modal>
    </>
  )
}
const PlayerTable = (props)=>{
  const adaptFilters = [
    { text: 'A', value: 'A' },
    { text: 'B', value: 'B' },
    { text: 'C', value: 'C' },
    { text: 'D', value: 'D' },
    { text: 'E', value: 'E' },
    { text: 'F', value: 'F' },
    { text: 'G', value: 'G' },
    ]
  const growFilters = [
    { text: '20%', value: '+20%' },
    { text: '10%', value: '+10%' },
    { text: '0%', value: '+0%' },
    ]
  const rares = {
    '1':'R',
    '2':'SR',
    '3':'SSR'
  }
  const titles={
    "芝":"grass",
    "ダート":"dirt",
    "短距離":"shortDistance",
    "マイル":"mile",
    "中距離":"mediumDistance",
    "長距離":"longDistance",
    "逃げ":"escape",
    "先行":"leading",
    "差し":"insert",
    "追込":"tracking",
    "スピード":"speedGrow",
    "スタミナ":"staminaGrow",
    "パワー":"powerGrow",
    "根性":"gutsGrow",
    "賢さ":"wisdomGrow"
  }
  const getColumn = (text,type)=>{
    if (type==='adapt'){
      return { title: t(text), dataIndex: titles[text], key: titles[text], width:80,
        render: (value) => coloredGradeText(value),
        filters:adaptFilters,onFilter: (value, record) => record[titles[text]] === value, }
    }else if(type==='grow'){
      return { title: t(text), dataIndex: titles[text], key: titles[text], width:100,
        render: (value) => coloredGradeText(value),
        filters:growFilters,onFilter: (value, record) => record[titles[text]] === value, }
    }
  }
  const columns = [{
    title: "角色",
    dataIndex: "imgUrl",
    key: "imgUrl",
    width:100,
    render: (text,record) => <PlayerCard data={record} onSelect={props.onSelect} name={false}></PlayerCard>,
  },
  { title: "称号", dataIndex: "name", key: "name", render: (value) => t(value) },
  { title: "角色名", dataIndex: "charaName", key: "charaName", render: (value) => t(value) },
  { title: "稀有度", dataIndex: "rare", key: "rare", render: (value) => rares[value] },
  getColumn("芝",'adapt'),
  getColumn("ダート",'adapt'),
  getColumn("短距離",'adapt'),
  getColumn("マイル",'adapt'),
  getColumn("中距離",'adapt'),
  getColumn("長距離",'adapt'),
  getColumn("逃げ",'adapt'),
  getColumn("先行",'adapt'),
  getColumn("差し",'adapt'),
  getColumn("追込",'adapt'),
  getColumn("スピード",'grow'),
  getColumn("スタミナ",'grow'),
  getColumn("パワー",'grow'),
  getColumn("根性",'grow'),
  getColumn("賢さ",'grow'),
]

return <Table columns={columns} dataSource={props.list.sort((a,b)=>b.rare-a.rare)} pagination={false} rowKey={"id"} scroll={{ y: window.innerHeight-200 }} />
}
export {PlayerDetail,PlayerCard,PlayerTable}

