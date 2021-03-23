import React,{useState} from 'react';
import db from '../db.js'

import { Table,Popover } from 'antd';
import t from './t.js'

const { Column, ColumnGroup } = Table;

// init: 10
// limit_lv5: -1
// limit_lv10: -1
// limit_lv15: -1
// limit_lv20: -1
// limit_lv25: 15
// limit_lv30: 15
// limit_lv35: -1
// limit_lv40: -1
// limit_lv45: 20
// limit_lv50: -1
const EffectTable = (props)=>{
  const effects = db.get('effects').value()
  // cosnt maxEffect = (effect)=>{
  //   let list =[]
  //   return Math.max()
  // }
  let columns = [
    {title:'效果',dataIndex:'type',key:'type',render:type=><Popover content={<>
      <p>{effects[type].name}</p>
      <p>{t(effects[type].name)}</p>
      <p>{effects[type].description}</p>
      <p>{t(effects[type].description)}</p>
    </>}>
      {t(effects[type].name)}
    </Popover>},
    {title:'init',dataIndex:'init',key:'init',render:text=>text},
    {title:'lv20',dataIndex:'limit_lv20',key:'limit_lv50',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20)},
    {title:'lv25',dataIndex:'limit_lv25',key:'limit_lv25',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,record.limit_lv25)},
    {title:'lv30',dataIndex:'limit_lv30',key:'limit_lv30',render:(text,record)=>
      Math.max(record.init,record.limit_lv5,record.limit_lv10,record.limit_lv15,record.limit_lv20,
        record.limit_lv25,record.limit_lv30)},
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
    // {title:'lv5',dataIndex:'limit_lv5',key:'limit_lv5',render:text=>text},
    // {title:'lv10',dataIndex:'limit_lv10',key:'limit_lv10',render:text=>text},
    // {title:'lv15',dataIndex:'limit_lv15',key:'limit_lv15',render:text=>text},
    // {title:'lv20',dataIndex:'limit_lv20',key:'limit_lv20',render:text=>text},
    // {title:'lv25',dataIndex:'limit_lv25',key:'limit_lv25',render:text=>text},
    // {title:'lv30',dataIndex:'limit_lv30',key:'limit_lv30',render:text=>text},
    // {title:'lv35',dataIndex:'limit_lv35',key:'limit_lv35',render:text=>text},
    // {title:'lv40',dataIndex:'limit_lv40',key:'limit_lv40',render:text=>text},
    // {title:'lv45',dataIndex:'limit_lv45',key:'limit_lv45',render:text=>text},
    // {title:'lv50',dataIndex:'limit_lv50',key:'limit_lv50',render:text=>text},

  console.log(props.data)
  return(<Table columns={columns} dataSource={props.effects} rowKey='type' pagination={false}></Table>)
}
export {EffectTable}
