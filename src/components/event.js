import React from 'react';
import db from '../db.js'
import dbL from '../dbL.js'
import t from './t.js'
import {Row,Col,Popover,Button,Tabs } from 'antd';


const ua = dbL.get('ua').value();

const EventList = (props)=>{
  const eventIdList = props.eventList
  const eventList = eventIdList.map(id=>db.get('events').find({id:id}).value())
  const qieZhe = eventList?.filter(event=>JSON.stringify(event).indexOf('切れ者')!==-1)
  if(props.type==='multi'){
    return(<>
        {eventList.filter(event=>event.choiceList.length > 1).map(event=><EventBox key={event.id} event={event}></EventBox>)}
      </>
    )
  }else if(props.type==='all'){
    return(<>
      {eventList.map(event=><EventBox key={event.id} event={event}></EventBox>)}
    </>
    )
  }
  return (
    <>
      {qieZhe[0]&&qieZhe.map(event=><Row justify="space-around" align="middle">
          <Col>{t('切れ者')}</Col>
          <EventBox event={event}></EventBox>
        </Row>
      )}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('有选项')} key="1">
          {eventList.filter(event=>event.choiceList.length > 1).map(event=><EventBox key={event.id} event={event} ></EventBox>)}
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('无选项')} key="2">
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
    <Popover
    mouseEnterDelay={0.4}
      trigger={ua==='mo'?'click':'hover'}
      content={<>
      <p>{t(props.event.name)}</p>
      {ChoiceItem}
    </>} title={props.event.name} placement={'bottom'}>
      <Button className='event-button'>{props.event.name}</Button>
    </Popover>
  )
}

export {EventList}
