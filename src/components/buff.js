import React from 'react';
// import {useState} from 'react';
import db from '../db.js'
import dbL from '../dbL.js'
import t from '../components/t.js'

import { List,Popover,Button } from 'antd';

const ua = dbL.get('ua').value();

const BuffButton = (props)=>{
  return(
    <Popover
    trigger={ua==='mo'?'click':'hover'}
    content={<BuffList></BuffList>}>
      <Button>Buff</Button>
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
      {buffs.map(buff=><tr key={buff.name}>
        <td style={{...cellStyle}}>{t(buff.name)}</td>
        <td style={{...cellStyle}}>{t(buff.describe)}</td>
      </tr>)}
      </tbody>
    </table>
    )
}
export {BuffButton,BuffList}
