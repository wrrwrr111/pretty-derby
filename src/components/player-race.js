import React from 'react';

import { Row,Col} from 'antd';
// import db from '../db.js'
// import t from './t.js'

// 培育界面 马娘赛程
const RaceList = (props) =>{
  return (
    <Row className={'race-row'}>
      {
        props.raceList.map((race,index)=>{
          // 忽略出道战
          if(race[1][2]){
            return(
          <Col span={12} key={index}>
            <Row className={'race-row-'+index%4}>
              <Col span={4} className={'race-name'} >
                <p>{race[0]}</p>
              </Col>
              <Col span = {20} className={'race-detail'}>
              {race[1].map((item,index)=>
                  <p key={index}>{item}</p>
                  )}
              </Col>
            </Row>
          </Col>
            )
          }else{
            return null
          }
        }
      )}
    </Row>
  )
}
export default RaceList