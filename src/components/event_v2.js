import React from 'react';
import db from '../db.js'
import t from './t.js'
import { Divider,Row,Col,Popover,Button,Tabs } from 'antd';

const EventList = (props)=>{
  const eventIdList = props.eventList
  const eventList = eventIdList.map(id=>db.get('events').find({id:id,pid:props.pid}).value())
  if(props.type==='multi'){
    return(<>
        {/* <Divider>多选</Divider> */}
        {eventList.filter(event=>event.choiceList.length > 1).map(event=><EventBox key={event.id} event={event}></EventBox>)}
      </>
    )
  }
  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="有分支" key="1">
          <div style={{height:200,overflowY:'scroll'}}>
      {eventList.filter(event=>event.choiceList.length > 1).map(event=><EventBox key={event.id} event={event}></EventBox>)}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="固定" key="2">
        {eventList.filter(event=>event.choiceList.length <= 1).map(event=><EventBox key={event.id} event={event}></EventBox>)}
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}
const EventBox = (props)=>{
  const ChoiceItem = props.event.choiceList.map((choice,index)=>{
    const ResultItem = choice[1].map((result,index)=>
      <p key={index}>{result}</p>
    )
    return(
      <Row key={index} gutter={[8,8]} className="list-row">
        <Col span={12}>
          <p>{choice[0]}</p>
          <p>{t(choice[0])}</p>
        </Col>
        <Col span={12}>{ResultItem}</Col>
      </Row>
    )
  })

  return(
    <Popover content={<>
      <p>{t(props.event.name)}</p>
      {ChoiceItem}
    </>} title={props.event.name} placement={'bottom'}>
      <Button className='event-button'>{props.event.name}</Button>
    </Popover>
  )
}

export {EventList}
