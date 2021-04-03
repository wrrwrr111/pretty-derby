import React from 'react';
// import {useState} from 'react';
import db from '../db.js'

import { Row,Col,Button } from 'antd';
import { createFormattedComponent } from 'react-intl/src/components/createFormattedComponent';
// import t from './t.js'

const ua = db.get('ua').value();

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
    if(props.raceList[i]){
      curRace = db.get('races').find({id:props.raceList[i].id}).value()
      str.push(<Col span={6} key={i}
      style={{backgroundColor:'#ff6b81',border:'1px solid #2f3542'}}>
        {getDate(i)}
        <br/>
        {`${curRace.name}/${curRace.distanceType}/${props.raceList[i].goal}`}
        {/* -{curRace.date} */}
        </Col>)
    }else if(props.selectedRaceList[i]){
      str.push(<Col span={6} key={i}
        style={{
        backgroundColor:'#7bed9f',
        border:'1px solid #2f3542',
        whiteSpace:'pre-line'}}>
        {getDate(i)}
        <br/>
        {props.selectedRaceList[i].map(raceId=>{
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
  return(<Row>
    {str}
  </Row>)
}

export {RaceSchedule}
