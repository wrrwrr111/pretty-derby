import React from 'react';

import { Button, Divider, Image, Alert } from "antd";
import db from '../db.js'
import t from './t.js'

import {EventList} from './event.js'
import {SkillList} from './skill.js'
import {EffectTable,TestEffectTable} from './effect.js'

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'


const SupportDetail = (props) =>{
  const id = props.supportId || props.match.params.supportId
  const data = db.get('supports').find({id}).value()
  return(<>
    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',height:192,padding:16}}>
      <Image src={cdnServer+data.imgUrl} preview={false} width={128} />
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',height:'100%',padding:16}}>
        <div style={{fontSize:20,fontWeight:700}}>{t(data.name)}</div>
        <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{data.name}</div>
        <div style={{fontSize:20,fontWeight:700}}>{t(data.charaName)}</div>
        <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{data.charaName}</div>
      </div>
    </div>
    <EventList eventList={data.eventList} pid={data.id}></EventList>
    <Divider style={{margin:'4px 0'}}>培训技能</Divider>
    <SkillList skillList={data.trainingEventSkill}></SkillList>
    <Divider style={{margin:'4px 0'}}>自带技能</Divider>
    <SkillList skillList={data.possessionSkill}></SkillList>
    <Divider>育成效果</Divider>
    <TestEffectTable effects={data.effects} unique_effect={data.unique_effect} rarity={data.rarity}></TestEffectTable>
    <Alert message="中间数值为插值，存在误差" type="info" />
    <EffectTable effects={data.effects} rarity={data.rarity}></EffectTable>
  </>)
}

export default SupportDetail

