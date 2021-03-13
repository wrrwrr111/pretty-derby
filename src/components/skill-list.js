import React from 'react';
import db from '../db.js'

import { Row,Popover,Button,Image } from 'antd';
import t from './t.js'
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const SkillList = (props)=>{
  const skillList = props.skillList

  return (
    <Row gutter={[8,8]}>
      {skillList.map((skillId)=><SkillBox key={skillId} id={skillId}></SkillBox>)}
      </Row>
  )
}
const SkillBox = (props)=>{
  const skill = db.get('skills').find({id:props.id}).value()

    return(
      <Popover content={<>
      <p>{t(skill.name)}</p>
      <p>{skill.describe}</p>
      <p>{t(skill.describe)}</p>
      {/* <p>{skill.condition}</p> */}
      <p>{t(skill.condition)}</p>
      </>} title={skill.name} className='skill-button'>
        <Button size={'large'} className={'skill-button-'+skill.rare}>
          <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
          {skill.name}
        </Button>
      </Popover>
    )
}

export  default SkillList
