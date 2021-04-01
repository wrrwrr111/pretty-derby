import React,{useState} from 'react';
import db from '../db.js'
import t from '../components/t.js'
import { Divider,Row,Col,Image,Modal,Button,Checkbox} from 'antd';

import {EventList} from '../components/event.js'
import {SkillList} from '../components/skill.js'
import {EffectTable} from '../components/effect.js'

const CheckboxGroup = Checkbox.Group

const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const SupportCard = (props)=>{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    if(props.onSelect){
      props.onSelect(props.data)
    }else{
      setIsModalVisible(true);
    }
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Image src={cdnServer+props.data.imgUrl} preview={false}  onClick={showModal} width={'100%'}></Image>
      <Modal title={`${props.data.name}----${t(props.data.charaName)}`}
        visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        width={800} >
          <Row justify='space-around' align='middle'>
            <Col span={4}>
              <Image src={cdnServer+props.data.imgUrl} preview={false} width={'100%'} />
            </Col>
            <Col span={19}>
            <EventList eventList={props.data.eventList} pid={props.data.id}></EventList>
              <Divider style={{margin:'4px 0'}}>培训技能</Divider>
              <SkillList skillList={props.data.trainingEventSkill}></SkillList>
              <Divider style={{margin:'4px 0'}}>自带技能</Divider>
              <SkillList skillList={props.data.possessionSkill}></SkillList>
            </Col>

            <Divider>育成效果</Divider>
            <EffectTable effects={props.data.effects} rarity={props.data.rarity}></EffectTable>

          </Row>
      </Modal>
    </>
  )
}

const Support = (props)=>{
  const [list,setList]=useState(props.supportList||db.get('supports').value())
  const [chooseMode,setChooseMode]=useState(false)
  const [showMode,setShowMode]=useState(false)
  const [chosenList,setChosenList]=useState(db.get('mySupports').value()||[])
  const [checkedList,setCheckedList]=useState([])
  
  const effects = db.get('effects').value()
  const checkOptions = Object.keys(effects).map(key=>{return {label:t(effects[key].name),value:key}})
  const changeChooseMode = () =>{
    setChooseMode(!chooseMode)
    setShowMode(!chooseMode)
  }
  const changeShowMode = () =>{
    setShowMode(!showMode)
  }
  const onSelect = (item) =>{
    let index = chosenList.indexOf(item.id)
    let tempList = chosenList;
    if (index === -1){
      tempList.push(item.id)
    }else{
      tempList.splice(index,1)
    }
    db.update('mySupports',tempList).write()
    setChosenList(tempList)
  }
  const onChange = (checkedValues)=>{
    let tempList = list
    if(checkedValues.length){
      tempList = tempList.filter(support=>{
        let flag = 0;
        checkedValues.forEach(value=>{
          support.effects.forEach(effect=>{
            if(effect.type == value){
              flag += 1
            }
          })
        })
        return flag == checkedValues.length
      })
    }
    setCheckedList(checkedValues)
    setList(tempList)
  }

    return (
      <Row justify="space-around">
        <Col span={22}>
          <Button onClick={changeShowMode}>切换显示模式</Button>
          <Button onClick={changeChooseMode}>配置卡组</Button>
          {chooseMode && <Button onClick={changeChooseMode} type='primary'>配置完成</Button>}
        </Col>
        <Col span={22}>
          <CheckboxGroup options={checkOptions} value={checkedList} onChange={onChange} />
        </Col>
        <Col span={22}>
      {
        ['SSR','SR','R'].map(rare=>
          <Row gutter={[16,16]} key={rare}>
            <Divider>{rare}</Divider>
            {list.filter(item=>item.rare===rare).map(support=>
              <Col xxl={2} lg={3} sm={4} xs={6} key={support.id}
              className={showMode&&chosenList.indexOf(support.id)===-1?'un-chosen-card':'chosen-card'}>
                <SupportCard data={support} onSelect={chooseMode?onSelect:props.onSelect}
                chooseMode={props.chooseMode}></SupportCard>
                {/* {support.effects} */}
              </Col>)
            }
          </Row>
        )
      }
        </Col>
      </Row>
      )
}

export default Support
