import React,{useState} from 'react';
import db from '../db.js'
import t from '../components/t.js'
import { Divider,Row,Col,Image,Modal,Button,Checkbox,Tooltip} from 'antd';

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
      <Tooltip title={`${props.data.name}----${t(props.data.charaName)}`}>
        <Image src={cdnServer+props.data.imgUrl} preview={false}  onClick={showModal} width={'100%'}></Image>
      </Tooltip>

      <Modal title={`${props.data.name}----${t(props.data.charaName)}`}
             visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
             width={800} >
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',height:192,padding:16}}>
          <Image src={cdnServer+props.data.imgUrl} preview={false} width={128} />
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',height:'100%',padding:16}}>
            <div style={{fontSize:20,fontWeight:700}}>{t(props.data.name)}</div>
            <div style={{fontSize:20,fontWeight:700,color:'gray'}}>{props.data.name}</div>
          </div>
        </div>
        <EventList eventList={props.data.eventList} pid={props.data.id}></EventList>
        <Divider style={{margin:'4px 0'}}>培训技能</Divider>
        <SkillList skillList={props.data.trainingEventSkill}></SkillList>
        <Divider style={{margin:'4px 0'}}>自带技能</Divider>
        <SkillList skillList={props.data.possessionSkill}></SkillList>


        <Divider>育成效果</Divider>
        <EffectTable effects={props.data.effects} rarity={props.data.rarity}></EffectTable>

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
    return (
      <div style={{display:'flex',justifyContent:'center',paddingTop:40}}>
        <div style={{maxWidth:1200,height:window.innerHeight-200}}>
          <Row justify="space-around">
            <Col span={6}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>筛选</text></div></Col>
            <Col span={18}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>支援卡列表</text></div></Col>
            <Col span={6}>
              <div style={{overflowY:'scroll',display:'flex',flexDirection:'column',overflowX:'hidden',height:window.innerHeight-300,padding:4}}>
                {this.props.filter&&<>
                  <Button onClick={this.changeShowMode}>高亮我的卡组</Button>
                  <Button onClick={this.changeChooseMode}>配置卡组</Button>
                  {this.state.chooseMode && <Button onClick={this.changeChooseMode} type='primary'>配置完成</Button>}
                  <Divider style={{margin:4}}/>
                  <CheckboxGroup options={this.checkOptions} value={this.state.checkedList} onChange={this.onChange} />
                </>}
              </div>
            </Col>


            <Col span={18}>
              <div style={{overflowY:'scroll',overflowX:'hidden',height:window.innerHeight-300,paddingRight:16}}>
                {
                  ['SSR','SR','R'].map(rare=>
                    <Row gutter={[16,16]} key={rare}>
                      <Divider>{rare}</Divider>
                      {this.state.list.filter(item=>item.rare===rare).map(support=>
                        <Col xxl={4} lg={6} sm={8} xs={12} key={support.id}
                             className={this.state.showMode&&this.state.chosenList.indexOf(support.id)===-1?'un-chosen-card':'chosen-card'}>
                          <SupportCard data={support} onSelect={this.state.chooseMode?this.onSelect:this.props.onSelect}
                                       chooseMode={this.props.chooseMode}></SupportCard>
                          {/* {support.effects} */}
                        </Col>)
                      }
                    </Row>
                  )
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

Support.defaultProps={
  supportList:db.get('supports').value(),
  filter:true
}
// const Support = (props)=>{
//   const [list,setList]=useState(props.supportList||db.get('supports').value())
//   const [chooseMode,setChooseMode]=useState(false)
//   const [showMode,setShowMode]=useState(false)
//   const [chosenList,setChosenList]=useState(db.get('mySupports').value()||[])
//   const [checkedList,setCheckedList]=useState([])

//   const effects = db.get('effects').value()
//   const checkOptions = Object.keys(effects).map(key=>{return {label:t(effects[key].name),value:key}})
//   const changeChooseMode = () =>{
//     setChooseMode(!chooseMode)
//     setShowMode(!chooseMode)
//   }
//   const changeShowMode = () =>{
//     setShowMode(!showMode)
//   }
//   const onSelect = (item) =>{
//     let index = chosenList.indexOf(item.id)
//     let tempList = chosenList;
//     if (index === -1){
//       tempList.push(item.id)
//     }else{
//       tempList.splice(index,1)
//     }
//     db.update('mySupports',tempList).write()
//     setChosenList(tempList)
//   }
//   const onChange = (checkedValues)=>{
//     let tempList = list
//     if(checkedValues.length){
//       tempList = tempList.filter(support=>{
//         let flag = 0;
//         checkedValues.forEach(value=>{
//           support.effects.forEach(effect=>{
//             if(effect.type == value){
//               flag += 1
//             }
//           })
//         })
//         return flag == checkedValues.length
//       })
//     }
//     setCheckedList(checkedValues)
//     setList(tempList)
//   }

//     return (
//       <Row justify="space-around">
//         <Col span={22}>
//           <Button onClick={changeShowMode}>切换显示模式</Button>
//           <Button onClick={changeChooseMode}>配置卡组</Button>
//           {chooseMode && <Button onClick={changeChooseMode} type='primary'>配置完成</Button>}
//         </Col>
//         <Col span={22}>
//           <CheckboxGroup options={checkOptions} value={checkedList} onChange={onChange} />
//         </Col>
//         <Col span={22}>
//       {
//         ['SSR','SR','R'].map(rare=>
//           <Row gutter={[16,16]} key={rare}>
//             <Divider>{rare}</Divider>
//             {list.filter(item=>item.rare===rare).map(support=>
//               <Col xxl={2} lg={3} sm={4} xs={6} key={support.id}
//               className={showMode&&chosenList.indexOf(support.id)===-1?'un-chosen-card':'chosen-card'}>
//                 <SupportCard data={support} onSelect={chooseMode?onSelect:props.onSelect}
//                 chooseMode={props.chooseMode}></SupportCard>
//                 {/* {support.effects} */}
//               </Col>)
//             }
//           </Row>
//         )
//       }
//         </Col>
//       </Row>
//       )
// }

export default Support
