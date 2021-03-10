import React from 'react';
import db from '../db.js'
import t from './t.js'
import { Divider,Row,Col,Popover,Button } from 'antd';

const EventList = (props)=>{
  const eventIdList = props.eventList
  const eventList = eventIdList.map(id=>db.get('events').find({id:id,pid:props.pid}).value())
  return (
    <>
    <Divider>多选</Divider>
    {eventList.filter(event=>event.choiceList.length > 1).map(event=><EventBox key={event.id} event={event}></EventBox>)}
    <Divider>单选</Divider>
    {eventList.filter(event=>event.choiceList.length <= 1).map(event=><EventBox key={event.id} event={event}></EventBox>)}
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
      <Popover content={<>
        <p>{t(props.event.name)}</p>
        {ChoiceItem}
      </>} title={props.event.name}>
        <Button>{props.event.name}</Button>
      </Popover>
    )
}

export  default EventList
