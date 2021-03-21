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
      </>} title={skill.name} className='skill-button'>
        <Button size={'large'} className={'skill-button-'+skill.rare} onClick={()=>props.onClick&&props.onClick(skill)}>
          <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
          {skill.name}
        </Button>
      </Popover>
    )
}

export {SkillList,SkillButton}
