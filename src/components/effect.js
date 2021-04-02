import React from 'react';
// import {useState} from 'react';
import { Table,Popover } from 'antd';

import db from '../db.js'
import t from './t.js'


const ua = db.get('ua').value();
// "limit_lv5": -1,
// "limit_lv10": 5,
// "limit_lv15": -1,
// "limit_lv20": -1,
// "limit_lv25": 35,
// "limit_lv30": 35,
// "limit_lv35": -1,
// "limit_lv40": -1,
// "limit_lv45": 50,
// "limit_lv50": -1
const effects = db.get('effects').value()
const limits = [
  "init",
  "limit_lv5",
  "limit_lv10",
  "limit_lv15",
  "limit_lv20",
  "limit_lv25",
  "limit_lv30",
  "limit_lv35",
  "limit_lv40",
  "limit_lv45",
  "limit_lv50"]
const getValue = (effect,cur) =>{
  if(effect[cur]!==-1){
    return effect[cur]
  }else{
    let index = limits.indexOf(cur)
    let min = 0
    let min_limit = "init"
    let max = 0
    let max_limit = "limit_lv50"
    for(let limit of limits.slice(0,index)){
      if(effect[limit]>min){
        min = effect[limit]
        min_limit = limit
      }
    }
    for(let limit of limits.slice(index,limits.length)){
      if(effect[limit]!==-1){
        max = effect[limit]
        max_limit = limit
        break
      }
    }
    // cur=40 lv35=40 lv40=-1 lv50=-1
    if(max<=min || max - min === 1 || min === 0){
      return min
    }else{
      // console.table({
      //   name:effects[effect.type].name,
      //   cname:t(effects[effect.type].name),
      //   cur,min_limit,min,max_limit,max,
      //   'max-min':max-min,
      //   'max_limit - min_limit':limits.indexOf(max_limit)-limits.indexOf(min_limit),
      //   'cur - min_limit':limits.indexOf(cur)-limits.indexOf(min_limit),
      //   cur_value:min+(max-min)*(limits.indexOf(cur)-limits.indexOf(min_limit))/(limits.indexOf(max_limit)-limits.indexOf(min_limit))
      // })
      return Math.floor(min+(max-min)*(limits.indexOf(cur)-limits.indexOf(min_limit))/(limits.indexOf(max_limit)-limits.indexOf(min_limit)))+'(插值)'
    }
  }
}
const EffectTable = (props)=>{
  const effects = db.get('effects').value()
  console.log(props.effects)
  let columns = [
    {title:'效果',dataIndex:'type',key:'type',render:type=><Popover trigger={ua==='mo'?'click':'hover'} content={<>
      <p>{effects[type].name}</p>
      <p>{t(effects[type].name)}</p>
      <p>{effects[type].description}</p>
      <p>{t(effects[type].description)}</p>
    </>}>
      <p>{t(effects[type].name)}</p>
    </Popover>},
    {title:'初始',dataIndex:'init',key:'init',render:(text,record)=>getValue(record,'init')},
    // {title:'lv5',dataIndex:'limit_lv5',key:'limit_lv5',render:(text,record)=>getValue(record,'limit_lv5')},
    // {title:'lv10',dataIndex:'limit_lv10',key:'limit_lv10',render:(text,record)=>getValue(record,'limit_lv10')},
    // {title:'lv15',dataIndex:'limit_lv15',key:'limit_lv15',render:(text,record)=>getValue(record,'limit_lv15')},
    // {title:'lv20',dataIndex:'limit_lv20',key:'limit_lv20',render:(text,record)=>getValue(record,'limit_lv20')},
    {title:'lv25',dataIndex:'limit_lv25',key:'limit_lv25',render:(text,record)=>getValue(record,'limit_lv25')},
    {title:'lv30',dataIndex:'limit_lv30',key:'limit_lv30',render:(text,record)=>getValue(record,'limit_lv30')},
    {title:'lv35',dataIndex:'limit_lv35',key:'limit_lv35',render:(text,record)=>getValue(record,'limit_lv35')},
    {title:'lv40',dataIndex:'limit_lv40',key:'limit_lv40',render:(text,record)=>getValue(record,'limit_lv40')},
    {title:'lv45',dataIndex:'limit_lv45',key:'limit_lv45',render:(text,record)=>getValue(record,'limit_lv45')},
    {title:'lv50',dataIndex:'limit_lv50',key:'limit_lv50',render:(text,record)=>getValue(record,'limit_lv50')},
      ]
  if(props.rarity ===2 ){
    columns = columns.slice(0,columns.length-1)
  }else if(props.rarity === 1){
    columns = columns.slice(0,columns.length-2)
  }

  return(<Table columns={columns} dataSource={props.effects} rowKey='type' pagination={false}></Table>)
}
export {EffectTable}
