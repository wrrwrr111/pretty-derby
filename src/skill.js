import React,{useState} from 'react';
import { Divider,Row,Popover,Image,Button,Checkbox,Modal,PageHeader} from 'antd';

import db from './db.js'
import Support from './support.js'
import Player from './player.js'
import t from './components/t.js'
const CheckboxGroup = Checkbox.Group

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const Skill = () =>{
  const allSkillList = db.get('skills').orderBy('db_id').value()
  const allSupportList = db.get('supports').value()
  const allPlayerList = db.get('players').value()
  const [skillList,setSkillList] = useState(allSkillList)
  const [skillSupportList,setSkillSupportList] = useState(allSupportList)
  const [skillPlayerList,setSkillPlayerList] = useState(allPlayerList)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 点击技能出现的弹框标题
  const [skillName, setSkillName] = useState('');

  const [checkedList1, setCheckedList1] = useState([]);
  const [checkedList2, setCheckedList2] = useState([]);

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
  const onChange1=(checkedValues)=>{
    setCheckedList1(checkedValues)
    updateSkillList(checkedValues,checkedList2)

  }
  const onChange2 = (checkedValues)=>{
    setCheckedList2(checkedValues)
    updateSkillList(checkedList1,checkedValues)
  }
  const updateSkillList = (check1,check2)=>{
    console.log(check1,check2)
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
          if(skill.icon_id){
            if(skill.icon_id[0] == value[0] && skill.icon_id[3] == value[3] ){
              flag = 1
            }
          }
        })
        return flag
      })
    }
    setSkillList(tempSkillList)
    // //更新support
    // if(tempSkillList.length === allSkillList.length){
    //   setSupportList(allSupportList)
    // }else{
    //   let tempSupportList = allSupportList.filter(support=>{
    //     let flag = 0;
    //     tempSkillList.forEach(skill=>{
    //       if(support.skillList.indexOf(skill.id)!==-1)
    //       flag = 1
    //     })
    //     return flag
    //   })
    //   setSupportList(tempSupportList)
    // }
  }
  const resetCheckbox=()=>{
    setCheckedList1([])
    setCheckedList2([])
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
  const rareLabel={'ノーマル':'普通','レア':'金色 稀有','固有':'独特'}
  return(<>
  <Button onClick={resetCheckbox}>重置</Button>
  <CheckboxGroup options={checkOptions1} value={checkedList1} onChange={onChange1} />
  <CheckboxGroup options={checkOptions2} value={checkedList2} onChange={onChange2}
  style={{width:'80%'}} />
    {['ノーマル','レア','固有'].map(rare=>
      <Row gutter={[8,8]} key={rare}>
      <Divider>{rareLabel[rare]}</Divider>
      { skillList.filter(item=>item.rare === rare).map(skill=>
        <Popover content={<>
          <p>{t(skill.name)}</p>
          <p>{skill.describe}</p>
          <p>{t(skill.describe)}</p>
          <p>{skill.condition}</p>
          </>
        } title={skill.name} key={skill.id} className={'skill-button'}>
          <Button size={'large'} className={'skill-button-'+rare} onClick={()=>showModal(skill)}>
          <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
          {skill.name}
          </Button>
        </Popover>
        )
      }
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'80%'}>
        <PageHeader title={skillName}>{t(skillName)}</PageHeader>
        <Support supportList={skillSupportList} ></Support>
        <Player playerList={skillPlayerList} ></Player>
      </Modal>
      </Row>
    )}
  </>)
}

export default Skill

