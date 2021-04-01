import React from 'react';
import db from '../db.js'

import { Row,Col,Popover,Button,Image } from 'antd';
import t from './t.js'
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

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
      <Popover content={<>
      <p>{'技能名称： '+t(skill.name)}</p>
      <p>{'技能描述： '+skill.describe}</p>
      <p>{'技能描述： '+t(skill.describe)}</p>
      <p>{skill.condition}</p>
      <p>{'触发条件： '+t(skill.condition)}</p>
      <p>{'技能效果： '+skill.ability_value/10000}</p>
      <p>{'持续时间： ' + skill.ability_time/10000 +'s * 赛道长度/1000'}</p>
      <p>{'冷却时间： ' + skill.cooldown/10000 + 's * 赛道长度/1000'}</p>
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
