import React,{useState} from 'react';
import { Divider,Row,Col,Button,Checkbox,Modal,Tooltip,PageHeader,Switch,Input} from 'antd';

import db from '../db.js'
import t from '../components/t.js'

import Support from './support.js'
import Player from './player.js'
import {SkillButton,SkillCheckbox} from '../components/skill.js'
const { Search } = Input
// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const Skill = () =>{
  // 所有技能列表
  const allSkillList = db.get('skills').orderBy('db_id').value()
  const allSupportList = db.get('supports').value()
  const allPlayerList = db.get('players').value()

  const [skillList,setSkillList] = useState(allSkillList)
  const [skillSupportList,setSkillSupportList] = useState(allSupportList)
  const [skillPlayerList,setSkillPlayerList] = useState(allPlayerList)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 点击技能出现的弹框标题
  const [skillName, setSkillName] = useState('');

  // init supportMode
  localStorage.getItem('supportMode')===null&&localStorage.setItem('supportMode',0)

  const showModal = (skill) => {
    let tempSupportList = allSupportList.filter(support=>{
      let flag = 0;
      support.skillList.forEach(id=>{
        if (id===skill.id){
          flag = 1
        }
      })
      return flag
    })
    let tempPlayerList = allPlayerList.filter(player=>{
      let flag = 0;
      player.skillList.forEach(id=>{
        if (id===skill.id){
          flag = 1
        }
      })
      return flag
    })
    setSkillName(skill.name)
    setSkillSupportList(tempSupportList)
    setSkillPlayerList(tempPlayerList)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
                    <Col  xxl={6} lg={8} sm={12} xs={12}>
                      <SkillButton usedInList={true} skill={skill} key={skill.id} onClick={showModal}></SkillButton>
                    </Col>
                  )
                  }
                  <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'80%'}>
                    <PageHeader title={skillName}>{t(skillName)}</PageHeader>
                    <Support supportList={skillSupportList} filter={false}></Support>
                    <Player playerList={skillPlayerList} ></Player>
                  </Modal>
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

