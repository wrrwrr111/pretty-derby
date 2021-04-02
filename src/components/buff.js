import React from 'react';
// import {useState} from 'react';
import db from '../db.js'

import { List,Popover,Button } from 'antd';
// import t from './t.js'

const ua = db.get('ua').value();

const BuffButton = (props)=>{
  return(
    <Popover
    trigger={ua==='mo'?'click':'hover'}
    content={<BuffList></BuffList>}>
      <Button>Buff查询</Button>
    </Popover>
  )
}
const BuffList = (props)=>{
  const buffs = db.get('buffs').value()
  return(
    <List itemLayout="horizontal" dataSource={buffs} renderItem={item=>
      <List.Item>
        <p>{item.name}</p>
        <p>{item.describe}</p>
      </List.Item>
    }/>)
}
export {BuffButton,BuffList}
