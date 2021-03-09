import React,{useState} from 'react';
import { Divider,Row,Popover,Image,Button,Checkbox,Modal,PageHeader} from 'antd';

import db from './db.js'
import Support from './support.js'
import t from './components/t.js'
const CheckboxGroup = Checkbox.Group

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const Skill = () =>{
  const allSkillList = db.get('skills').value()
  const allSupportList = db.get('supports').value()
  const [skillList,setSkillList] = useState(allSkillList)
  const [supportList,setSupportList] = useState(allSupportList)
  const [skillSupportList,setSkillSupportList] = useState(allSupportList)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 点击技能出现的弹框标题
  const [skillName, setSkillName] = useState('');

  const [checkedList, setCheckedList] = useState([]);

  const plainOptions = [
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
  const onChange=(checkedValues)=>{
    setCheckedList(checkedValues)

    let tempSkillList = allSkillList
    if(checkedValues.length){

      tempSkillList = allSkillList.filter(skill=>{
        let flag = 0;
        checkedValues.forEach(value=>{
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
    setSkillList(tempSkillList)
    //更新support
    if(tempSkillList.length === allSkillList.length){
      setSupportList(allSupportList)
    }else{
      let tempSupportList = allSupportList.filter(support=>{
        let flag = 0;
        tempSkillList.forEach(skill=>{
          if(support.skillList.indexOf(skill.id)!==-1)
          flag = 1
        })
        return flag
      })
      setSupportList(tempSupportList)
    }
  }
  const resetCheckbox=()=>{
    setCheckedList([])
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
      setSkillName(skill.name)
      setSkillSupportList(tempSupportList)
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
  <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    {['ノーマル','レア','固有'].map(rare=>
      <Row gutter={[8,8]} key={rare}>
      <Divider>{rareLabel[rare]}</Divider>
      { skillList.filter(item=>item.rare === rare).map(skill=>
        <Popover content={<>
          <p>{t(skill.name)}</p>
          <p>{skill.describe}</p>
          <p>{t(skill.describe)}</p>
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
      </Modal>
      </Row>
    )
  }
  <Support supportList={supportList}></Support>
  </>)
}

export default Skill

