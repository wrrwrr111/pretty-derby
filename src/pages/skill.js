import React,{useState} from 'react';
import { Divider,Row,Col,Button,Checkbox,Modal,Tooltip,PageHeader,Switch,Input} from 'antd';

import db from '../db.js'
import Support from './support.js'
import Player from './player.js'
import t from '../components/t.js'
import {SkillButton} from '../components/skill.js'
const CheckboxGroup = Checkbox.Group
const { Search } = Input
// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const Skill = () =>{
  // 所有技能列表
  const allSkillList = db.get('skills').orderBy('db_id').value()
  const allSupportList = db.get('supports').value()
  const allPlayerList = db.get('players').value()
  const mySupports = db.get('mySupports').value()
  let mySkillList = new Set()
  mySupports.forEach(supportId=>{
    let support = db.get('supports').find({id:supportId}).value()
    support.skillList.forEach(skillId=>{
      mySkillList.add(skillId)
    })
  })

  const [skillList,setSkillList] = useState(allSkillList)
  const [skillSupportList,setSkillSupportList] = useState(allSupportList)
  const [skillPlayerList,setSkillPlayerList] = useState(allPlayerList)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 点击技能出现的弹框标题
  const [skillName, setSkillName] = useState('');

  const [checkedList1, setCheckedList1] = useState([]);
  const [checkedList2, setCheckedList2] = useState([]);
  const [checkedList3, setCheckedList3] = useState([]);
  // init supportMode
  localStorage.getItem('supportMode')===null&&localStorage.setItem('supportMode',0)
  const [mode,setMode] = useState(parseInt(localStorage.getItem('supportMode')))
  const checkOptions1 = [
    {label:'通用',value:'normal'},
    {label:'短距',value:'＜短距離＞'},
    {label:'英里',value:'＜マイル＞'},
    {label:'中距',value:'＜中距離＞'},
    {label:'长距',value:'＜長距離＞'},
    {label:'逃',value:'＜作戦・逃げ＞'},
    {label:'先',value:'＜作戦・先行＞'},
    {label:'差',value:'＜作戦・差し＞'},
    {label:'追',value:'＜作戦・追込＞'}
  ]
  const checkOptions2 =[
    {label:'速度被动',value:'10011'},
    {label:'耐力被动',value:'10021'},
    {label:'力量被动',value:'10031'},
    {label:'毅力被动',value:'10041'},
    {label:'智力被动',value:'10051'},
    {label:'速度提高',value:'20011'},
    {label:'耐力恢复',value:'20021'},
    // {label:'20031',value:'20031'},
    {label:'加速度提高',value:'20041'},
    {label:'切换跑道',value:'20051'},
    {label:'起步',value:'20061'},
    // {label:'20071',value:'20071'},
    // {label:'20081',value:'20081'},
    {label:'视野',value:'20091'},
    {label:'降速(debuff)',value:'30011'},
    {label:'安定(debuff)',value:'30041'},
    {label:'疲劳(debuff)',value:'30051'},
    {label:'视野(debuff)',value:'30071'}
  ]
  const checkOptions3 = [
    {label:'普通',value:'ノーマル'},
    {label:'稀有',value:'レア'},
    {label:'独特',value:'固有'}
  ]

  const onChange1=(checkedValues)=>{
    setCheckedList1(checkedValues)
    updateSkillList(checkedValues,checkedList2,checkedList3)
    
  }
  const onChange2 = (checkedValues)=>{
    setCheckedList2(checkedValues)
    updateSkillList(checkedList1,checkedValues,checkedList3)
  }
  const onChange3 = (checkedValues)=>{
    setCheckedList3(checkedValues)
    updateSkillList(checkedList1,checkedList2,checkedValues)
  }
  const updateSkillList = (check1,check2,check3)=>{
    let tempSkillList = allSkillList
    if(check1.length){
      tempSkillList = tempSkillList.filter(skill=>{
        let flag = 0;
        check1.forEach(value=>{
          if(skill.describe){
            if(value==='normal' && skill.describe.indexOf('＜') === -1 && skill.describe.indexOf('＞') === -1){
              flag = 1
            }else if(skill.describe.indexOf(value)!==-1){
              flag = 1
            }
          }
        })
        return flag
      })
    }
    if(check2.length){
      tempSkillList = tempSkillList.filter(skill=>{
        let flag = 0;
        check2.forEach(value=>{
          let str = skill.icon_id +''
          if(str){
            if(str[0] === value[0] && str[3] === value[3] ){
              flag = 1
            }
          }
        })
        return flag
      })
    }
    if(check3.length){
      tempSkillList = tempSkillList.filter(skill=>{
        let flag = 0;
        check3.forEach(value=>{
          if(skill.rare === value){
            flag = 1
          }
        })
        return flag
      })
    }
    setSkillList(tempSkillList)
  }
  const resetCheckbox=()=>{
    setCheckedList1([])
    setCheckedList2([])
    setCheckedList3([])
    setSkillList(allSkillList)
  }

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
  const changeMode = ()=>{
    localStorage.setItem('supportMode',1-mode)
    setMode(1-mode)
  }
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

  const onSearch = (searchText) => {
    const fullSkillList = allSkillList; 
    const tempSkillList = fullSkillList.filter(item => (item.name).indexOf(searchText) > -1);
    setCheckedList1([])
    setCheckedList2([])
    setCheckedList3([])
    setSkillList(tempSkillList)
  };
  
  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height,setHeight] = React.useState(window.innerHeight);
    React.useEffect(() => {
      const handleWindowResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    console.log('currentWidth::',height);
    return {height};
  };

  const dynamicListHeight = useViewport().height - 128 - 90;
  return(<>
    <div style={{display:'flex',justifyContent:'center',paddingTop:40}}>
      <div style={{maxWidth:800}}>
        <Row>
          <Col span={6}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>筛选</text></div></Col>
          <Col span={18}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>技能列表</text></div></Col>
          <Col span={6}>
            <div style={{height:dynamicListHeight,overflowY:'scroll',display:'flex',flexDirection:'column'}}>
              <div style={{height:16}}/>
              <Button type={'danger'} onClick={resetCheckbox} style={{width:'100%'}}>重置</Button>
              <Divider/>
              <div>
                <Tooltip title="可以在支援卡页面配置">
                <span style={{ margin: '0 10px 0 0',lineHeight: '32px'}}>显示拥有支援卡</span>
                  <Switch checked={mode} onChange={changeMode} />
                </Tooltip>
              </div>
              <div>
                <span style={{ margin: '0 10px 0 0',lineHeight: '32px'}}>技能搜索</span>
                <Search
                  placeholder="输入技能名称"
                  enterButton="搜索"
                  size="middle"
                  style={{ width: '100%' }}
                  onSearch={onSearch}
                />
              </div>
              <Divider/>
              <CheckboxGroup options={checkOptions1} value={checkedList1} onChange={onChange1} />
              <Divider/>
              <CheckboxGroup options={checkOptions2} value={checkedList2} onChange={onChange2} />
              <Divider/>
              <CheckboxGroup options={checkOptions3} value={checkedList3} onChange={onChange3} />
            </div>
          </Col>
          <Col span={18}>
            <div style={{height:dynamicListHeight,overflowY:'scroll',overflowX:'hidden'}}>
              {['ノーマル','レア','固有'].map(rare=>
                <Row gutter={[8,8]} key={rare}>
                  <Divider>{rareLabel[rare]}</Divider>
                  { skillList.filter(item=>mode?mySkillList.has(item.id)&&(item.rare === rare):item.rare === rare).map(skill=>
                    <Col span={12}>
                      <SkillButton usedInList={true} skill={skill} key={skill.id} onClick={showModal}></SkillButton>
                    </Col>
                  )
                  }
                  <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'80%'}>
                    <PageHeader title={skillName}>{t(skillName)}</PageHeader>
                    <Support supportList={skillSupportList} ></Support>
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

