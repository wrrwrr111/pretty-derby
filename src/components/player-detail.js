import React from 'react';

import { Divider,Image} from 'antd';
import db from '../db.js'
import t from './t.js'

import {EventList} from './event.js'
import {SkillList} from './skill.js'
import RaceList from './player-race.js'
// import {EffectTable} from './effect.js'

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const PlayerDetail = (props) =>{
  const id = props.playerId!==undefined?props.playerId:props.match.params.id
  // 是否育成 育成顺序样式不同
  const isNur = props.isNur!==undefined?props.isNur:props.match.params.nur
  console.log(props.playerId,id,isNur)
  const data = db.get('players').find({id}).value()
  return(
    isNur?<>
      <div style={{height:64,display:'flex'}}>
          <Image src={cdnServer+data.imgUrl} width={64} height={64} resizemode={'cover'}></Image>
          <div style={{display:'flex',height:64,flexDirection:'column',justifyContent:'space-between'}}>
            <div style={{fontSize:20,fontWeight:700}}>{t(data.name)}</div>
            <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{t(data.charaName)}</div>
          </div>
      </div>
      <Divider>事件</Divider>
      <EventList eventList={data.eventList} pid={data.id} ></EventList>
      <Divider>赛程</Divider>
      <RaceList raceList={data.raceList}></RaceList>
      <Divider>技能</Divider>
      <SkillList skillList={data.skillList}></SkillList>
    </>:<>
      <div style={{height:144,display:'flex'}}>
        <Image src={cdnServer+data.imgUrl} width={128} height={128} resizemode={'cover'}></Image>
        <div style={{display:'flex',height:128,padding:24,flexDirection:'column',justifyContent:'space-between'}}>
          <div style={{fontSize:20,fontWeight:700}}>{t(data.charaName)}</div>
          <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{data.charaName}</div>
          <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{t(data.name)}</div>
          <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{data.name}</div>
        </div>
      </div>
      <Divider>适应</Divider>
      <AdaptBox player={data}></AdaptBox>
      <Divider>成长</Divider>
      <GrowBox player={data}></GrowBox>
      <Divider>技能</Divider>
      <SkillList skillList={data.skillList}></SkillList>
      <Divider>事件</Divider>
      <EventList eventList={data.eventList} pid={data.id} ></EventList>
      <Divider>赛程</Divider>
      <RaceList raceList={data.raceList}></RaceList>
    </>
  )
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
  // {[`草地/芝\xa0`,coloredGradeText(props.player.grass)]}
  return(
    <div style={{borderRadius:'8px',borderStyle:'solid',borderWidth:'thin',borderColor:'gray'}}>
      <table {...tableStyle} >
        <tbody>
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
        </tbody>
      </table>
    </div>
  )
}
export default PlayerDetail

