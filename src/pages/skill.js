import React,{useState} from 'react';
import { Divider,Row,Col} from 'antd';

import db from '../db.js'
import dbL from '../dbL.js'
import t from '../components/t.js'

import {SkillButton,SkillCheckbox} from '../components/skill-detail.js'
// const { Search } = Input
// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'
const ua = dbL.get('ua').value();

const Skill = (props) =>{
  // 所有技能列表
  const allSkillList = db.get('skills').orderBy('db_id').value()

  const [skillList,setSkillList] = useState(allSkillList)

  // init supportMode
  localStorage.getItem('supportMode')===null&&localStorage.setItem('supportMode',0)

  const rareLabel={'ノーマル':'普通','レア':'金色 稀有','固有':'独特'}

  const headerStyle = {
    backgroundColor:'#1e90ffA0',
    height:48,
    borderRadius:5,
    margin:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
  const headerTextStyle = {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 600,
    color:'#f5f5f5',
    textShadow: "0 2px #33333370",
  }

  const onSkillCheckboxUpdate = (skillList)=>{
    setSkillList(skillList)
  }

  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height,setHeight] = React.useState(window.innerHeight);
    React.useEffect(() => {
      const handleWindowResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return {height};
  };

  const dynamicListHeight = useViewport().height - 104 - 78;

  return(<>
    <div style={{display:'flex',justifyContent:'center',paddingTop:4}}>
      <div style={{maxWidth:1200}}>
        <Row>
          <Col span={6}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>{t('筛选')}</text></div></Col>
          <Col span={18}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>{t('技能列表')}</text></div></Col>
          <Col span={6}>
            <div style={{height:dynamicListHeight,overflowY:'scroll',
            display:'flex',flexDirection:'column'}}>
              <SkillCheckbox onUpdate={onSkillCheckboxUpdate}></SkillCheckbox>
            </div>
          </Col>
          <Col span={18}>
            <div style={{height:dynamicListHeight,overflowY:'scroll',overflowX:'hidden'}}>
              {['ノーマル','レア','固有'].map(rare=>
                <Row gutter={[8,8]} key={rare}>
                  <Divider>{rareLabel[rare]}</Divider>
                  { skillList.filter(item=>item.rare === rare).map(skill=>
                    <Col  xxl={6} lg={6} sm={12} xs={12}>
                      <SkillButton usedInList={true} skill={skill} key={skill.id}></SkillButton>
                    </Col>
                  )}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </>)
}

export default Skill

