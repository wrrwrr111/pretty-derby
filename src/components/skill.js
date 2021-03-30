import React from 'react';
import db from '../db.js'

import { Row,Popover,Button,Image } from 'antd';
import t from './t.js'
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const SkillList = (props)=>{
  const skillList = props.skillList

  return (
    <Row gutter={0}>
      {skillList.map((skillId)=><SkillButton key={skillId} id={skillId}></SkillButton>)}
      </Row>
  )
}
const SkillButton = (props)=>{
  const skill = props.skill || db.get('skills').find({id:props.id}).value()

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
        <Button className={'skill-btn skill-btn-'+skill.rarity} onClick={()=>props.onClick&&props.onClick(skill)}>
          <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
          {skill.name}
        </Button>
      </Popover>
    )
}

export {SkillList,SkillButton}
