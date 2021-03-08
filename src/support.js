import React,{useState} from 'react';
import db from './db.js'

import { Divider,Row,Col,Image,Modal} from 'antd';

import EventList from './components/event-list.js'
import SkillList from './components/skill-list.js'

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
    this.state = {list:props.supportList}
  }
  componentDidUpdate(prevProps){
    if(this.props.supportList !== prevProps.supportList){
      this.setState({list:this.props.supportList})
    }
  }
  render(){
    return (
      <>
      {
        ['SSR','SR','R'].map(rare=>
          <Row gutter={[16,16]} key={rare}>
            <Divider>{rare}</Divider>
            {this.state.list.filter(item=>item.rare===rare).map(support=>
              <Col xxl={2} lg={3} sm={4} xs={6} key={support.id}>
                <SupportCard data={support} onSelect={this.props.onSelect}></SupportCard>
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
