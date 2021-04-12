import React,{useState} from 'react';
import { Divider,Row,Col,Image,Modal,Button,Checkbox,Tooltip,Input} from 'antd';

import db from '../db.js'
import t from '../components/t.js'


import SupportDetail from '../components/support-detail.js'
import {SkillCheckbox, SkillList} from '../components/skill.js'
const CheckboxGroup = Checkbox.Group
const Search = Input.Search

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
            width={800} destroyOnClose={true}>
        <SupportDetail supportId={props.data.id}></SupportDetail>
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
      checkedList:[],
      skillList:[]}
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
  onSupportCheckboxChange = (checkedValues)=>{
    this.updateSupport(checkedValues,this.state.skillList)
    this.setState({checkedList:checkedValues})
  }

  onSkillCheckboxUpdate=(skillList)=>{
    this.updateSupport(this.state.checkedList,skillList)
    // console.log(skillList)
    this.setState({skillList:skillList})
  }
  updateSupport = (checkedValues,skillList,eventIdList=[])=>{
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
    if(skillList.length){
      tempList = tempList.filter(support=>{
        let flag = 0;
        support.skillList.forEach(skillId=>{
          if(skillList.indexOf(skillId)!==-1){
            return flag = 1;
          }
        })
        return flag
      })
    }
    if(eventIdList.length){
      tempList = tempList.filter(support=>{
        let flag = 0;
        support.eventList.forEach(eventId=>{
          if(eventIdList.indexOf(eventId)!==-1){
            return flag = 1;
          }
        })
        return flag
      })
    }
    console.log(eventIdList,tempList)
    this.setState({list:tempList})
  }

  onSearch = (searchText) => {
    const allEventList = db.get('events').value();
    const eventIdList = allEventList.filter(event=>{
      let jsonEvent = JSON.stringify(event)
      if(jsonEvent.indexOf(searchText)!==-1){
        return true
      }else{
        return false
      }
    }).reduce((list,event)=>{
      list.push(event.id)
      return list
    },[])
    console.log(eventIdList.length)
    this.updateSupport(this.state.checkedList,this.state.skillList,eventIdList)
  };

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
      <div style={{display:'flex',justifyContent:'center',paddingTop:4}}>
        <div style={{maxWidth:1200,maxHeight:window.innerHeight-104}}>
          <Row justify="space-around">
            <Col span={6}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>{t('筛选')}</text></div></Col>
            <Col span={18}><div style={{...headerStyle}}><text style={{...headerTextStyle}}>{t('支援卡列表')}</text></div></Col>
            <Col span={6}>
              <div style={{overflowY:'scroll',display:'flex',
                flexDirection:'column',overflowX:'hidden',
                maxHeight:window.innerHeight-104-78,padding:4}}>
                {this.props.filter&&<>
                  <Button onClick={this.changeShowMode}>{t('高亮我的卡组')}</Button>
                  <Button onClick={this.changeChooseMode}>{t('配置卡组')}</Button>
                  {this.state.chooseMode && <Button onClick={this.changeChooseMode} type='primary'>{t('配置完成')}</Button>}
                  <Search placeholder={t("输入关键词")} enterButton={t("搜索")} size="middle"
                    style={{ width: '100%' }} onSearch={this.onSearch}/>
                  <Divider style={{margin:4}}>{t('技能')}</Divider>
                  <SkillCheckbox onUpdate={this.onSkillCheckboxUpdate}
                  checkOnly={true} needId={true}></SkillCheckbox>
                  <Divider style={{margin:4}}>{t('育成效果')}</Divider>
                  <CheckboxGroup options={this.checkOptions} value={this.state.checkedList}
                    onChange={this.onSupportCheckboxChange} />
                </>}
              </div>
            </Col>


            <Col span={18}>
              <div style={{overflowY:'scroll',overflowX:'hidden',
                maxHeight:window.innerHeight-104-78,paddingRight:16}}>
                {
                  ['SSR','SR','R'].map(rare=>
                    <Row gutter={[16,16]} key={rare}>
                      <Divider>{rare}</Divider>
                      {this.state.list.filter(item=>item.rare===rare).map(support=>
                        <Col xxl={4} lg={6} sm={8} xs={8} key={support.id}
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
