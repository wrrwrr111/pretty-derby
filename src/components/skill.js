import React from 'react';
import db from '../db.js'

import { Row,Col,Popover,Button,Image } from 'antd';
import t from './t.js'
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const ua = db.get('ua').value();


const SkillList = (props)=>{
  const skillList = props.skillList

  return (
    <Row gutter={0}>
      {skillList.map((skillId,index)=>
        <Col span={12} key={index}>
          <SkillButton id={skillId} usedInList={true}>
        </SkillButton>
      </Col>)}
    </Row>
  )
}
const skillType={
  1:'速度属性',
  2:'耐力属性',
  3:'力量属性',
  4:'毅力属性',
  5:'智力属性',
  6:'体力',
  7:'体力消耗',
  8:'视野',
  9:'体力恢复',
  10:'出栏时机',
  14:'掛かり结束时间',
  21:'瞬时速度',
  27:'目标速度',
  28:'走位速度',
  31:'加速度',
}
const SkillButton = (props)=>{
  const skill = props.skill || db.get('skills').find({id:props.id}).value()
  const inListStyleOverride = {
    borderRadius:'8px',
    color:'#303030',
    width:'96%',
    justifyContent:'flex-start'
  }
  const skillNameStyle = {
    width:`calc(96% - 34px)`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign:'justify'
  }
    return(
      <Popover
        trigger={ua==='mo'?'click':'hover'}
        content={<>
      <p>{t('技能名称')+ ':  ' +t(skill.name)}</p>
      <p>{t('技能描述')+ '： ' +skill.describe}</p>
      <p>{t('技能描述')+ '： ' +t(skill.describe)}</p>
      <p>{skill.condition}</p>
      <p>{t('触发条件')+ '： ' +t(skill.condition)}</p>
      {/* <p>{t('技能效果')+ '： ' +skill.ability_value/10000}</p> */}
      <p>{`${t('技能效果')}：\xa0
        ${skill.ability.map(ability=>skillType[ability.type]+' '+ability.value/10000)}`}</p>
      <p>{`${t('持续时间')}： ${skill.ability_time/10000}s*${t('赛道长度')}/1000`}</p>
      <p>{`${t('冷却时间')}： ${skill.cooldown/10000}s*${t('赛道长度')}/1000`}</p>
      {/* <p>技能效果 = (技能数值 / 100)%</p> */}
      {/* <p>持续时间 = 基础持续时间 * 赛道长度 / 1000</p> */}
      {/* <p>冷却时间 = 基础冷却时间 * 赛道长度 / 1000</p> */}
      </>} title={skill.name}
      >
        <Button type={'primary'} className={'skill-btn skill-btn-'+skill.rarity} style={props.usedInList?{...inListStyleOverride}:{}} onClick={()=>props.onClick&&props.onClick(skill)}>
          <div style={props.usedInList?
            {display:'flex',position:'absolute',top:4,left:8,width:'100%'}:{width:'100%'}}>
          <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
          <div style={{...skillNameStyle}}>{`\xa0\xa0${skill.name}`}</div>
          </div>
        </Button>
      </Popover>
    )
}

export {SkillList,SkillButton}
