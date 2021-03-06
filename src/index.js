import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route ,Link} from 'react-router-dom';

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import axios from 'axios'

import 'antd/dist/antd.css';
import {Row,Col} from 'antd'
import { Image } from 'antd';
import { Layout, Menu,  } from 'antd';
import { Modal, Button,Popover } from 'antd';
import { Checkbox,  } from 'antd';
import { Divider, } from 'antd';

import './index.css'

const CheckboxGroup = Checkbox.Group

const adapter = new LocalStorage('db')
const db = low(adapter)
db.set('options',{flag:true}).write()

// axios.defaults.baseURL = "http://localhost:4000/"
// https://github.com/wrrwrr111/pretty-derby/raw/master/public/img/players/0uJ0iropRbr.png
// const cdnServer = 'https://github.com/wrrwrr111/pretty-derby/raw/master/public/'
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'
// https://purge.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/dbd.json
// https://purge.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/db.json


// https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/raw/master/public/img/players/0uJ0iropRbr.png

async function getdbd(){
  let res = await axios.get('http://urarawin.com/dbd')
  let localTime = db.get('updateTime').value()
  console.log(localTime ,res.data.updateTime, localTime === res.data.updateTime)
  if (localTime && localTime === res.data.updateTime){
    console.log('latest 不需要同步')
    // 不需要同步

  }else{
    console.log("同步")
    res = await axios.get('http://urarawin.com/db')
    db.set('players',res.data.players).write()
    db.set('supports',res.data.supports).write()
    db.set('skills',res.data.skills).write()
    db.set('events',res.data.events).write()
    db.set('updateTime',res.data.updateTime).write()
    //重新加载
  }
  ReactDOM.render((<App></App>),document.getElementById('root'),);
}
getdbd()

const { Header, Content, Footer } = Layout;

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
      <Image src={cdnServer+props.data.imgUrl} preview={false} onClick={showModal} width={'100%'}></Image>
      <Modal title={props.data.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        width={800} >
        <Divider>适应</Divider>
        <AdaptBox player={props.data}></AdaptBox>
        <Divider>成长</Divider>
        <GrowBox player={props.data}></GrowBox>
        <Divider>技能</Divider>
        <SkillList skillList={props.data.skillList}></SkillList>
        <Divider>事件</Divider>
        <EventList eventList={props.data.eventList}></EventList>
      </Modal>
    </>
  )
}
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
        <SupportDetail data={props.data}></SupportDetail>
      </Modal>
    </>
  )
}
const SupportDetail = (props)=>{
  return(
    <>
      <Divider>培训技能</Divider>
      <SkillList skillList={props.data.trainingEventSkill}></SkillList>
      <Divider>自带技能</Divider>
      <SkillList skillList={props.data.possessionSkill}></SkillList>
      <Divider>事件</Divider>
      <EventList eventList={props.data.eventList}></EventList>
    </>
  )
}

const AdaptBox = (props)=>
  <Row  gutter={[8, 8]}>
    <Col span = {6}>草地/芝</Col>
    <Col span = {6}>泥地/ダート</Col>
    <Col span = {6}></Col>
    <Col span = {6}></Col>
    <Col span = {6}>{props.player.grass}</Col>
    <Col span = {6}>{props.player.dirt}</Col>
    <Col span = {6}></Col>
    <Col span = {6}></Col>

    <Col span = {6}>短距离</Col>
    <Col span = {6}>英里/マイル</Col>
    <Col span = {6}>中距离</Col>
    <Col span = {6}>长距离</Col>
    <Col span = {6}>{props.player.shortDistance}</Col>
    <Col span = {6}>{props.player.mile}</Col>
    <Col span = {6}>{props.player.mediumDistance}</Col>
    <Col span = {6}>{props.player.longDistance}</Col>

    <Col span = {6}>逃脱/逃げ</Col>
    <Col span = {6}>先行</Col>
    <Col span = {6}>插入/差</Col>
    <Col span = {6}>追击/追込</Col>
    <Col span = {6}>{props.player.escape}</Col>
    <Col span = {6}>{props.player.leading}</Col>
    <Col span = {6}>{props.player.insert}</Col>
    <Col span = {6}>{props.player.tracking}</Col>
  </Row>

const GrowBox = (props)=>
  <Row gutter={[8, 8]}>
    <Col span = {4}>速度/スピード</Col>
    <Col span = {4}>体力/スタミナ</Col>
    <Col span = {4}>力量/パワー</Col>
    <Col span = {4}>毅力/根性</Col>
    <Col span = {5}>智慧/賢さ</Col>

    <Col span = {4}>{props.player.speedGrow}</Col>
    <Col span = {4}>{props.player.staminaGrow}</Col>
    <Col span = {4}>{props.player.powerGrow}</Col>
    <Col span = {4}>{props.player.gutsGrow}</Col>
    <Col span = {5}>{props.player.wisdomGrow}</Col>
  </Row>

//todo 获取技能列表 更新技能展现
const SkillList = (props)=>{
  const skillList = props.skillList

  return (
    <Row gutter={8,8}>
      {skillList.map((skillId)=>
      <SkillBox key={skillId} id={skillId}></SkillBox>
      )}
      </Row>
  )
}
const SkillBox = (props)=>{
  const skill = db.get('skills').find({id:props.id}).value()
  const SkillItem = <p>{skill.describe}</p>

    return(
      <Popover content={SkillItem} title={skill.name} className='skill-button'>
        <Button size={'large'} className={'skill-button-'+skill.rare}>
          <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
          {skill.name}
        </Button>
      </Popover>
    )
}

//todo 需要翻译
const EventList = (props)=>{
  const eventIdList = props.eventList
  const eventList = eventIdList.map(id=>db.get('events').find({id:id}).value())
  return (
    <>
    <Divider>多选</Divider>
    {eventList.filter(event=>event.choiceList.length > 1).map(event=><EventBox key={event.Id} event={event}></EventBox>)}
    <Divider>单选</Divider>
    {eventList.filter(event=>event.choiceList.length <= 1).map(event=><EventBox key={event.Id} event={event}></EventBox>)}
    </>
  )
}
const EventBox = (props)=>{
  const ChoiceItem = props.event.choiceList.map((choice,index)=>{
    const ResultItem = choice[1].map((result)=>
        <p key={result}>{result}</p>
      )
      return(
        <Row key={index} gutter={[8,8]} className="list-row">
          <Col span={12}><p>{choice[0]}</p></Col>
          <Col span={12}>{ResultItem}</Col>
        </Row>
      )
    })

    return(
      <Popover content={ChoiceItem} title={props.event.name}>
        <Button type="primary">{props.event.name}</Button>
      </Popover>
    )

}
const RaceList = (props) =>{
  return (
    <Row className={'race-row'} gutter={[8,8]}>
      {
        props.raceList.map((race,index)=>
          <Col span={12} key={index}>
            <Row>

          <Col span={4} className={'race-col-'+index%4}>
            <p>{race[0]}</p>
          </Col>
          <Col span = {20} className={'race-col-'+index%4}>
          {race[1].map((item,index)=>
            <p key={index}>{item}</p>
            )}
          </Col>
            </Row>
          </Col>
      )}
    </Row>
  )
}

//todo filter
const Player = (props)=>{
  const allPlayerList = db.get('players').value()
  const [playerList,setPlayerList] = useState(allPlayerList)
  const [checkedList, setCheckedList] = useState([]);

  const plainOptions = [
    {label:'草地',value:'grass'},
    {label:'泥地',value:'dirt'},
    {label:'短距',value:'shortDistance'},
    {label:'英里',value:'mile'},
    {label:'中距',value:'mediumDistance'},
    {label:'长距',value:'longDistance'},
    {label:'逃',value:'escape'},
    {label:'先',value:'leading'},
    {label:'差',value:'insert'},
    {label:'追',value:'tracking'}]


  const onChange=(checkedValues)=>{
    setCheckedList(checkedValues)
    let tempList = allPlayerList.filter(player=>{
      let flag = 1;
      checkedValues.map(attr=>{
        if(player[attr]!=='A'){
          flag = 0
        }
      })
      return flag
    })
    setPlayerList(tempList)
  }
  const resetCheckbox=()=>{
    setCheckedList(new Array())
    setPlayerList(allPlayerList)
  }
  return (
    <>
    <Button onClick={resetCheckbox}>重置</Button>
    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    {
      ['3','2','1'].map(rare=>(
        <Row gutter={[16,16]} key={rare}>
        <Divider>{rare}星</Divider>
      {playerList.filter(item=>item.rare===rare).map(player=>
        <Col xxl={2} lg={3} sm={4} xs={6} key={player.id}>
          <PlayerCard data={player} onSelect={props.onSelect}></PlayerCard>
        </Col>)
      }
      </Row>
      ))
    }</>
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
  const NurturingSupport = (props)=>{
    return (
      <>
            <Col span={12}>
              <img src={cdnServer+props.data.imgUrl} width={'50%'}></img>
            </Col>
            <Col span={24}>
              <SkillList skillList={props.data.possessionSkill} ></SkillList>
            </Col>
            <Col span={24}>
              <SkillList skillList={props.data.trainingEventSkill}></SkillList>
            </Col>
            <Col span={24}>
              <EventList eventList={props.data.eventList}></EventList>
            </Col>
      </>
    )
  }

  const Nurturing = () =>{

    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [isSupportVisible, setIsSupportVisible] = useState(false);
    const [needSelect,setNeedSelect] = useState(false)
    const [flag, setFlag] = useState(1);
    const [supportIndex, setSupportIndex] = useState(1);

    const [player, setPlayer] = useState({});
    const [supports, setSupports] = useState({1:{},2:{},3:{},4:{},5:{},6:{}});

    const showPlayer = () => {
      setIsPlayerVisible(true);
      setFlag(db.get('options').value().flag)
    };
    const closePlayer = () => {
      setIsPlayerVisible(false);
    };
    const handleSelectPlayer = (data)=>{
      setIsPlayerVisible(false);
      setPlayer(data)
    }

    const showSupport = (index) => {
      setNeedSelect(true)
      setIsSupportVisible(true);
      setSupportIndex(index)
    };
    const showSupport2 = (index) => {
      setNeedSelect(false)
      setIsSupportVisible(true);
      setSupportIndex(index)
    };

    const closeSupport = () => {
      setIsSupportVisible(false);
    };
    const handleSelectSupport = (data)=>{
      let newData= {}
      newData[supportIndex] = data
      setSupports(Object.assign({},supports,newData))
      setIsSupportVisible(false);
    }

    return(
      <Row className='nurturing-box' gutter={[16,16]}>
        <Col span = {9}>
          <Button onClick={showPlayer}>选择马娘</Button>
          <Button onClick={showSupport2}>临时辅助卡事件查询</Button>
          {player.id&&
          <>
            <SkillList skillList={player.skillList} flag={flag}></SkillList>
            <RaceList raceList={player.raceList}></RaceList>
          </>
          }
          </Col>
        <Col span = {5}>
          <Row>
            <Col span={12}>
              <Button onClick={()=>showSupport(1)}>选择辅助卡</Button>
            </Col>
            {supports[1].id &&<NurturingSupport data={supports[1]} ></NurturingSupport>}
          </Row>
        </Col>
        <Col span = {5}>
          <Row>
            <Col span={12}>
              <Button onClick={()=>showSupport(2)}>选择辅助卡</Button>
            </Col>
            {supports[2].id &&<NurturingSupport data={supports[2]} ></NurturingSupport>}
          </Row>
        </Col>
        <Col span = {5}>
          <Row>
            <Col span={12}>
              <Button onClick={()=>showSupport(3)}>选择辅助卡</Button>
            </Col>
            {supports[3].id &&<NurturingSupport data={supports[3]} ></NurturingSupport>}
          </Row>
        </Col>

        <Col span = {9}>
          {player.id&&
            <EventList eventList={player.eventList} ></EventList>
          }
        </Col>
        <Col span = {5}>
        <Row>
            <Col span={12}>
              <Button onClick={()=>showSupport(4)}>选择辅助卡</Button>
            </Col>
            {supports[4].id &&<NurturingSupport data={supports[4]}></NurturingSupport>}
          </Row>
        </Col>
        <Col span = {5}>
        <Row>
            <Col span={12}>
              <Button onClick={()=>showSupport(5)}>选择辅助卡</Button>
            </Col>
            {supports[5].id &&<NurturingSupport data={supports[5]}></NurturingSupport>}
          </Row>
        </Col>
        <Col span = {5}>
        <Row>
            <Col span={12}>
              <Button onClick={()=>showSupport(6)}>选择辅助卡</Button>
            </Col>
            {supports[6].id &&<NurturingSupport data={supports[6]} ></NurturingSupport>}
          </Row>
        </Col>
        <Modal visible={isPlayerVisible} onOk={closePlayer} onCancel={closePlayer} width={'80%'}>
          <Player onSelect={handleSelectPlayer}></Player>
        </Modal>
        <Modal visible={isSupportVisible} onOk={closeSupport} onCancel={closeSupport} width={'80%'}>
          <Support onSelect={needSelect?handleSelectSupport:null}></Support>
        </Modal>
      </Row>
    )
  }

  const Skill = () =>{
    const allSkillList = db.get('skills').value()
    const allSupportList = db.get('supports').value()
    const [skillList,setSkillList] = useState(allSkillList)
    const [supportList,setSupportList] = useState(allSupportList)

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
      {label:'追',value:'＜作戦・追込＞'}]

  const onChange=(checkedValues)=>{
    setCheckedList(checkedValues)
    let tempSkillList = allSkillList
    if(checkedValues.length){

      tempSkillList = allSkillList.filter(skill=>{
        let flag = 0;
        checkedValues.map(value=>{
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
        tempSkillList.map(skill=>{
          if(support.skillList.indexOf(skill.id)!==-1)
          flag = 1
        })
        return flag
      })
      setSupportList(tempSupportList)
    }

  }
    const resetCheckbox=()=>{
      setCheckedList(new Array())
      setSkillList(allSkillList)
    }
    const rareLabel={'ノーマル':'普通','レア':'金色 稀有','固有':'独特'}
    return(<>
    <Button onClick={resetCheckbox}>重置</Button>
    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      {['ノーマル','レア','固有'].map(rare=>
        <Row gutter={[8,8]} key={rare}>
        <Divider>{rareLabel[rare]}</Divider>
        { skillList.filter(item=>item.rare === rare).map(skill=>
          <Popover content={<p key={skill.id}>{skill.describe}</p>} title={skill.name} key={skill.id} className={'skill-button'}>
            <Button size={'large'} className={'skill-button-'+rare}>
            <Image src={cdnServer+skill.imgUrl} preview={false} width={26}></Image>
            {skill.name}
            </Button>
          </Popover>
          )
        }
        </Row>
      )
    }
    <Support supportList={supportList}></Support>
    </>)

  }
  const App = ()=>{
      return (
    <Router>
        <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" ><Link to='/'>角色</Link></Menu.Item>
            <Menu.Item key="2" ><Link to='/support'>支援卡</Link></Menu.Item>
            <Menu.Item key="4"><Link to='/skill'>技能</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/nurturing'>育成</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '80px 50px' }}>
          <Route exact path="/" component={Player}/>
          <Route path="/support" component={Support}/>
          <Route path="/nurturing" component={Nurturing}/>
          <Route path="/skill" component={Skill}/>
        </Content>
      </Layout>
      <Footer>
        <Row gutter={[16,16]}>
          <Col>
          <Popover content={<Image src={'img/z.jpg'} width={200}></Image>}>
              <Button placement="bottom">zfb</Button>
            </Popover>
          </Col>
          <Col>
          <Popover content={<Image src={'img/q.jpg'} width={300}></Image>}>
            <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=f2Q2MIqkkxiiYq-sfRYmI7E4v17-r3V2&jump_from=webapi">
              <img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="轻 松 赛 马" title="轻 松 赛 马" />
            </a>
          </Popover>
          </Col>
        </Row>
      </Footer>
    </Router>
      )
  }

// ReactDOM.render((<App></App>),document.getElementById('root'),);
