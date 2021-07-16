import React from 'react';
import {useState} from 'react';
import db from '../db.js'
import dbL from '../dbL.js'

import { Row,Col,Timeline,Checkbox,Button } from 'antd';
import { createFormattedComponent } from 'react-intl/src/components/createFormattedComponent';
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';
import t from './t.js'

const ua = dbL.get('ua').value();

const RaceSchedule = (props)=>{
  // const races = db.get('races').value()
  const str  = []
  const getDate = (i)=>{
    let year = Math.floor(i/24)+1
    let month = Math.floor((i - (year-1)*24) /2)+1
    let moment = i%2?'后':'前'
    return `${year}年${month}月${moment}`
  }
  for (let i = 13;i<72;i++){
    let curRace;
    if(props.raceList&&props.raceList[i]){
      curRace = db.get('races').find({id:props.raceList[i].id}).value()
      str.push(<Col span={6} key={i}
      style={{backgroundColor:'#ff6b81',border:'1px solid #2f3542'}}>
        {getDate(i)}
        <br/>
        {`${curRace.name}/${curRace.distanceType}/${props.raceList[i].goal}`}
        {/* -{curRace.date} */}
        </Col>)
    }else if(props.filterRace&&props.filterRace[i]){
      str.push(<Col span={6} key={i}
        style={{
        backgroundColor:'#7bed9f',
        border:'1px solid #2f3542',
        whiteSpace:'pre-line'}}>
        {getDate(i)}
        <br/>
        {props.filterRace[i].map(raceId=>{
          let curRace = db.get('races').find({id:raceId}).value()
          return `${curRace.name}/${curRace.grade}/${curRace.distanceType}\n`

        })}
        </Col>)
    }else{
      str.push(<Col span={6} key={i}
      style={{backgroundColor:'#a4b0be',border:'1px solid #2f3542'}}>
        {getDate(i)}
      </Col>)
    }
  }
  return(<Row style={{color:'black'}}>
    {str}
  </Row>)
}

const raceGolds=[
  {name:'传统三冠',raceNames:['皐月賞30', '日本ダービー東京優駿33','菊花賞43']}, 
  {name:'春日三冠',raceNames:['大阪杯53', '天皇賞春55','宝塚記念59']}, 
  {name:'秋日三冠',raceNames:['天皇賞秋67', 'ジャパンカップ69','有馬記念71']}, 
  {name:'天皇春秋',raceNames:['天皇賞春55', '天皇賞秋67']},
  {name:'纪念春秋Ⅰ',raceNames:['宝塚記念35', '有馬記念47']},
  {name:'纪念春秋Ⅱ',raceNames:['宝塚記念59', '有馬記念71']},
  {name:'母马三冠',raceNames:['桜花賞30', 'オークス33','秋華賞43']}, 
  {name:'英里春秋Ⅰ',raceNames:['安田記念34', 'マイルチャンピオンシップ45']},
  {name:'英里春秋Ⅱ',raceNames:['安田記念58', 'マイルチャンピオンシップ69']},
  {name:'泥地春秋',raceNames:['フェブラリーステークス51', 'チャンピオンズカップ70']},
  {name:'短距春秋',raceNames:['高松宮記念53', 'スプリンターズステークス65']}
]
const getGolds = (race)=>{
  return raceGolds.reduce((golds,raceGold)=>{
    if(raceGold.raceNames.indexOf(race.uniqueName)!==-1){
      golds.push(`${raceGold.name} ${raceGold.raceNames.indexOf(race.uniqueName)+1}/${raceGold.raceNames.length}`)
    }
    return golds
  },[]).join(' , ')
}

const RaceTimeline = React.memo((props)=>{
  const [showSpare,setShowSpare] = useState(false)
  const str  = []

  const getDate = (i)=>{
    let year = Math.floor(i/24)+1
    let month = Math.floor((i - (year-1)*24) /2)+1
    month = month<10?`\xa0\xa0${month}`:month
    let moment = i%2?'后':'前'
    return `${year}年\xa0${month}月${moment}`
  }
  const getColor = (grade)=>{
    switch(grade){
      case 'G1':
        return 'blue';
      case 'G2':
        return 'pink';
      case 'G3':
        return 'green';
      case 'OP':
        return 'orange';
      case 'Pre-OP':
        return 'orange';
      default:
        return 'gray'
    }
  }
  for (let i = 13;i<72;i++){
    let curRace,id,golds;
    if(props.raceList&&props.raceList[i]){
      id = props.raceList[i].id
      curRace = db.get('races').find({id}).value()
      golds = getGolds(curRace)
      str.push(<Timeline.Item label={getDate(i)} color="red" style={{fontSize:'16px'}} key={id}>
        <b>{`${curRace.grade} / ${curRace.distanceType} / ${curRace.distance} / ${curRace.name} / ${props.raceList[i].goal||'参赛'}
          ${golds?' / '+golds:''}`}</b>
      </Timeline.Item>)
    }else if(props.filterRace&&props.filterRace[i]){
      props.filterRace[i].forEach((id,index)=>{
        curRace = db.get('races').find({id}).value()
        golds = getGolds(curRace)
        str.push(<Timeline.Item label={index===0?getDate(i):null} color={getColor(curRace.grade)}
        style={{fontSize:'14px'}} key={id}>
            <p>{`${curRace.grade} / ${curRace.distanceType} / ${curRace.distance} / ${curRace.name}
            ${golds?' / '+golds:''}`}</p>
          </Timeline.Item>)

      })
    }else{
      //普通
      showSpare&&str.push(<Timeline.Item label={getDate(i)} color={getColor('normal')}
        style={{fontSize:'12px'}}>
            <p></p>
          </Timeline.Item>)
    }
  }
  return(
  <>
  <Button onClick={()=>setShowSpare(!showSpare)}>
    {showSpare?t('隐藏空闲月份'):t('显示空闲月份')}
  </Button>
  <Timeline mode='left' style={{paddingTop:8}}>
    {str}
  </Timeline>
  </>)
})
const RaceCheckbox = (props) =>{
  const [raceFilterCondition,setRaceFilterCondition] = useState(props.raceFilterCondition)

  const filterList= {
    distanceType:[
      { label: '短距離', value: '短距離' },
      { label: 'マイル', value: 'マイル' },
      { label: '中距離', value: '中距離' },
      { label: '長距離', value: '長距離' }
    ],
    grade:[
      { label: 'Pre-OP', value: 'Pre-OP' },
      { label: 'OP', value: 'OP' },
      { label: 'G1', value: 'G1' },
      { label: 'G2', value: 'G2' },
      { label: 'G3', value: 'G3' }
    ],
    ground: [
      { label: '芝', value: '芝' },
      { label: 'ダート', value: 'ダート' }
    ],

  }
  const onChange=(checkedValues,type)=>{
    let tmpObj = {}
    tmpObj[type]=checkedValues
    console.log({...raceFilterCondition,...tmpObj})
    props.onChange({...raceFilterCondition,...tmpObj})
    setRaceFilterCondition({...raceFilterCondition,...tmpObj})
  }
  return (<>
  {Object.keys(filterList)
    .map(key=>
      <div key={key}>
        <Checkbox.Group options={filterList[key]} defaultValue={props.raceFilterCondition[key]} onChange={(checkedValues)=>onChange(checkedValues,key)}/>
      </div>
      )}
  </>)
}
export {RaceSchedule,RaceTimeline,RaceCheckbox}
