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
class Support extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      list:props.supportList,
      chooseMode:false,
      showMode:false,
      chosenList:db.get('mySupports').value()||[],
      checkedList:[]}
    this.effects = db.get('effects').value()
    this.checkOptions = Object.keys(this.effects)
                          .map(key=>{return {label:t(this.effects[key].name),value:key}})
  }
  componentDidUpdate(prevProps){
    if(this.props.supportList !== prevProps.supportList){
      this.setState({list:this.props.supportList})
    }
  }
  changeChooseMode=()=>{
    this.setState({chooseMode:!this.state.chooseMode})
    this.setState({showMode:!this.state.chooseMode})
  }
  changeShowMode=()=>{
    this.setState({showMode:!this.state.showMode})
  }
  onSelect=(item)=>{
    let index = this.state.chosenList.indexOf(item.id)
    if (index === -1){
      this.state.chosenList.push(item.id)
    }else{
      this.state.chosenList.splice(index,1)
    }
    db.update('mySupports',this.state.chosenList).write()
    this.setState({})
  }
  onChange = (checkedValues)=>{
    let tempList = this.props.supportList
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
    this.setState({
      checkedList:checkedValues,
      list:tempList
    })
  }
  render(){
    return (
      <Row justify="space-around">
        <Col span={22}>
          <Button onClick={this.changeShowMode}>切换显示模式</Button>
          <Button onClick={this.changeChooseMode}>配置卡组</Button>
          {this.state.chooseMode && <Button onClick={this.changeChooseMode} type='primary'>配置完成</Button>}
        </Col>
        <Col span={22}>
          <CheckboxGroup options={this.checkOptions} value={this.state.checkedList} onChange={this.onChange} />
        </Col>
        <Col span={22}>
      {
        ['SSR','SR','R'].map(rare=>
          <Row gutter={[16,16]} key={rare}>
            <Divider>{rare}</Divider>
            {this.state.list.filter(item=>item.rare===rare).map(support=>
              <Col xxl={2} lg={3} sm={4} xs={6} key={support.id}
              className={this.state.showMode&&this.state.chosenList.indexOf(support.id)===-1?'un-chosen-card':'chosen-card'}>
                <SupportCard data={support} onSelect={this.state.chooseMode?this.onSelect:this.props.onSelect}
                chooseMode={this.props.chooseMode}></SupportCard>
              </Col>)
            }
          </Row>
        )
      }
        </Col>
      </Row>
      )
  }
}

Support.defaultProps={
  supportList:db.get('supports').value()
}
export default Support
