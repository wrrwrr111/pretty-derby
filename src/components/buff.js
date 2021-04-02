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
  const cellStyle = {
    // width:'20%',
    height:'32px',
    fontSize: 16,
    textAlign: 'flex-start',
    paddingLeft:16,
    fontWeight: 500,
    borderWidth:'thin',
    borderStyle:'solid solid solid solid',
    borderColor:'gray',
  }
  return(
    <table>
      <tbody>
      {buffs.map(buff=><tr>
        <td style={{...cellStyle}}>{buff.name}</td>
        <td style={{...cellStyle}}>{buff.describe}</td>
      </tr>)}
      </tbody>
    </table>
    )
}
export {BuffButton,BuffList}
