import React,{useState} from 'react';
import db from './db.js'
import t from './components/t.js'
import { Divider,Row,Col,Image,Modal,Button} from 'antd';

import {EventList} from './components/event.js'
import {SkillList} from './components/skill.js'

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
      <Modal title={props.data.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        width={800} >
          <p>{t(props.data.name)}</p>
        <Divider>培训技能</Divider>
          <SkillList skillList={props.data.trainingEventSkill}></SkillList>
          <Divider>自带技能</Divider>
          <SkillList skillList={props.data.possessionSkill}></SkillList>
          <Divider>事件</Divider>
        <EventList eventList={props.data.eventList} pid={props.data.id}></EventList>
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
      chosenList:db.get('mySupports').value()||[]}
  }
  componentDidUpdate(prevProps){
    if(this.props.supportList !== prevProps.supportList){
      this.setState({list:this.props.supportList})
    }
  }
  changeChooseMode=()=>{
    this.setState({chooseMode:!this.state.chooseMode})
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
  render(){
    return (
      <>
      <Button onClick={this.changeChooseMode}>配置卡组</Button>
      {this.state.chooseMode && <Button onClick={this.changeChooseMode} type='primary'>配置完成</Button>}
      {/* <p>{JSON.stringify(this.state.chosenList)}</p> */}
      {
        ['SSR','SR','R'].map(rare=>
          <Row gutter={[16,16]} key={rare}>
            <Divider>{rare}</Divider>
            {this.state.list.filter(item=>item.rare===rare).map(support=>
              <Col xxl={2} lg={3} sm={4} xs={6} key={support.id}
              className={this.state.chosenList.indexOf(support.id)!==-1?'chosen-card':'un-chosen-card'}
              // className={'un-chosen-card'}
              >
                <SupportCard data={support} onSelect={this.state.chooseMode?this.onSelect:this.props.onSelect}
                chooseMode={this.props.chooseMode}></SupportCard>
              </Col>)
            }
          </Row>
        )
      }
      </>
      )
  }
}

Support.defaultProps={
  supportList:db.get('supports').value()
}
export default Support
