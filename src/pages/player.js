import React,{useState} from 'react';
import db from '../db.js'
import t from '../components/t.js'
import { Divider,Row,Col,Image,Modal,Checkbox,Card} from 'antd';


import PlayerDetail from '../components/player-detail.js'
// const CheckboxGroup = Checkbox.Group

// todo 提取出来
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const PlayerCard = (props)=>{
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
      <Card cover={
        <Image src={cdnServer+props.data.imgUrl} preview={false} onClick={showModal} width={'100%'}></Image>

      }>
        <Card.Meta title={t(props.data.name)} ></Card.Meta>
        <Card.Meta title={t(props.data.charaName)} ></Card.Meta>
      </Card>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={800} >
        <PlayerDetail playerId={props.data.id} isNur={false}></PlayerDetail>
      </Modal>
    </>
  )
}
//todo filter
class Player extends React.Component{
  constructor(props){
    super(props)
    this.state = {list:props.playerList}
  }
  componentDidUpdate(prevProps){
    if(this.props.playerList !== prevProps.playerList){
      this.setState({list:this.props.playerList})
    }
  }
  render(){
    return(
      <Row justify="space-around">
        <Col span={22}>
          {
            ['3','2','1'].map(rare=>(
              <Row gutter={[16,16]} key={rare}>
                <Divider>{rare}星</Divider>
                {this.state.list.filter(item=>item.rare===rare).map(player=>
                  <Col xxl={2} lg={3} sm={6} xs={6} key={player.id}>
                    <PlayerCard data={player} onSelect={this.props.onSelect}></PlayerCard>
                  </Col>)
                }
              </Row>
            ))
          }
        </Col>
      </Row>
    )
  }
}
Player.defaultProps={
  playerList:db.get('players').value()
}

export default Player
