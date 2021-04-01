import React from 'react';
// import {useState} from 'react';
import { Table,Popover } from 'antd';

import db from '../db.js'
import t from './t.js'

const EffectTable = (props)=>{
  const effects = db.get('effects').value()
  let columns = [
    {title:'效果',dataIndex:'type',key:'type',render:type=><Popover content={<>
      <p>{effects[type].name}</p>
      <p>{t(effects[type].name)}</p>
      <p>{effects[type].description}</p>
      <p>{t(effects[type].description)}</p>
    </>}>
      <p>{t(effects[type].name)}</p>
    </Popover>},
    {title:'初始',dataIndex:'init',key:'init',render:text=>text},
    {title:'lv20',dataIndex:'limit_lv20',key:'limit_lv50',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20)},
    {title:'lv25',dataIndex:'limit_lv25',key:'limit_lv25',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,record.limit_lv25)},
    {title:'lv30',dataIndex:'limit_lv30',key:'limit_lv30',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,
        record.limit_lv25,record.limit_lv30)},
    {title:'lv35',dataIndex:'limit_lv35',key:'limit_lv35',render:(text,record)=>
        Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,
          record.limit_lv25,record.limit_lv30,record.limit_lv35)},
    {title:'lv40',dataIndex:'limit_lv40',key:'limit_lv40',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,
        record.limit_lv25,record.limit_lv30,record.limit_lv35,record.limit_lv40)},
    {title:'lv45',dataIndex:'limit_lv45',key:'limit_lv45',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,
        record.limit_lv25,record.limit_lv30,record.limit_lv35,record.limit_lv40,record.limit_lv45)},
    {title:'lv50',dataIndex:'limit_lv50',key:'limit_lv50',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,
        record.limit_lv25,record.limit_lv30,record.limit_lv35,record.limit_lv40,
        record.limit_lv45,record.limit_lv50)},
      ]
  if(props.rarity ===2 ){
    columns = columns.slice(0,columns.length-1)
  }else if(props.rarity === 1){
    columns = columns.slice(0,columns.length-2)
  }

  return(<Table columns={columns} dataSource={props.effects} rowKey='type' pagination={false}></Table>)
}
export {EffectTable}
