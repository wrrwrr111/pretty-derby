import React from 'react';
// import {useState} from 'react';
import { Table, Popover, Slider, Row ,Col} from "antd";

import db from '../db.js'
import dbL from '../dbL.js'
import t from './t.js'


const ua = dbL.get('ua').value();
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
      return Math.floor(min+(max-min)*(limits.indexOf(cur)-limits.indexOf(min_limit))/(limits.indexOf(max_limit)-limits.indexOf(min_limit)))+`(${t('插值')})`
    }
  }
}
const EffectTable = (props)=>{

  const effects = db.get('effects').value()
  let columns = [
    {title:t('效果'),dataIndex:'type',key:'type',render:type=><Popover trigger={ua==='mo'?'click':'hover'} content={<>
      <p>{effects[type].name}</p>
      <p>{t(effects[type].name)}</p>
      <p>{effects[type].description}</p>
      <p>{t(effects[type].description)}</p>
    </>}>
      <p>{t(effects[type].name)}</p>
    </Popover>},
    {title:t('初始'),dataIndex:'init',key:'init',render:(text,record)=>getValue(record,'init')},
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

const getEffectMark = (maxLevel) =>{
  let ok = {
    1:'lv1',5:'lv5',10:'lv10',15:'lv15',20:'lv20',
    25:'lv25',30:'lv30',35:'lv35',40:'lv40'
  }
  if(maxLevel>=45){
    ok[45] = 'lv45'
  }
  if(maxLevel===50){
    ok[50] = 'lv50'
  }
  return ok
}






class TestEffectTable extends React.Component{
  constructor(props) {
    super(props);
    this.effects = db.get('effects').value();
    let maxLevel = 1;
    switch (props.rarity) {
      case 1:
        maxLevel = 40;
        break;
      case 2:
        maxLevel = 45;
        break;
      case 3:
        maxLevel = 50;
        break;
      default:
        maxLevel = 1;
    }

    this.maxLevel = maxLevel;
    this.state={
      selectingLevel:maxLevel,
    }
  }

  calc(data,input){
    let nodes = [];
    let output = 0;
    const maxLevel = this.maxLevel;
    let prevNode = {level:0,value:0};
    for (let i = 0; i<data.length;i += 1){
      if(data[i] !== -1){
        let level = i*5;
        if (level === 0){
          level = 1
        }
        nodes.push({level:level,value:data[i]})
        prevNode = {level:level,value:data[i]};
      }
      if(i === data.length-1 && data[i] === -1){
        nodes.push({level:maxLevel,value:prevNode.value})
      }
    }
    nodes.push({level:999,value:prevNode.value}); // 以后万一出SSSR？确保一定能找到区间。

    const level = Math.floor(input);
    let upperNode = {level:0,value:0};
    let lowerNode = {level:0,value:0};
    if(level < 0 || level > maxLevel){
        output = 0;
    }else if(level<nodes[0].level){
        output = 0;
    }else {
      for(let i=0;i<nodes.length;i+=1){
        if (level>=nodes[i].level && level < nodes[i+1].level){
          lowerNode = nodes[i];
          upperNode = nodes[i+1] || nodes[i];
          break;
        }
      }
      output = Math.floor((upperNode.value-lowerNode.value)/(upperNode.level-lowerNode.level)*(level-lowerNode.level)+lowerNode.value);
    }

    return output
  }


  effectCapsuleStyle = {
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    margin:2,
    borderRadius:'12px',
    backgroundColor:'#32cd32C0',
    borderStyle:'solid',
    borderWidth:'thin',
    borderColor:'#32cd32F0'
}

    effectRightDivStyle={
    padding:8,
    display:'flex',
    height:'100%',
    width:'60%',
    backgroundColor:'white',
    borderRadius:'0 12px 12px 0',
    }

    effectNameStyle={
      fontSize:18,
      fontWeight: 500,
      color:'#333333',
      textShadow: "0 2px #cccccc70",
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }

    effectValueStyle = {
      fontSize:18,
      fontWeight: 600,
      color:'#333333',
    }
    effectBoxStyle = {
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
      padding:8,
      justifyContent:'space-between'
    }
  render() {
    return(
      <div>
        {this.props.unique_effect&&<>
        <div style={{...this.effectBoxStyle}}>
          <text style={{...this.effectValueStyle,fontSize:18,marginRight:16}}>
            {t('固有效果')}
          </text>
          <text style={{...this.effectValueStyle,fontSize:18,marginRight:16}}>
            {`${t('激活等级')}:${this.props.unique_effect.lv}`}
          </text>
        </div>
        <Row>
          {['0','1'].map(index=>
            <Col span={12} key={index}>
              <div style={{...this.effectCapsuleStyle}}>
            <Popover trigger={ua==='mo'?'click':'hover'} content={<>
              <p>{this.effects[this.props.unique_effect[`type_${index}`]].name}</p>
              <p>{t(this.effects[this.props.unique_effect[`type_${index}`]].name)}</p>
              <p>{this.effects[this.props.unique_effect[`type_${index}`]].description}</p>
              <p>{t(this.effects[this.props.unique_effect[`type_${index}`]].description)}</p>
            </>}>
              <div style={{display:'flex',padding:8,width:'40%'}}>
                <text style={{...this.effectNameStyle}}>
                  {t(this.effects[this.props.unique_effect[`type_${index}`]].name)}
                </text>
              </div>
            </Popover>
                <div style={{...this.effectRightDivStyle}}>
                  <text style={{...this.effectValueStyle}}>
                  {this.props.unique_effect[`value_${index}`]}
                  </text>
                </div>
              </div>
            </Col>
          )}
        </Row>
        </>}

        <div style={{...this.effectBoxStyle}}>
          <text style={{...this.effectValueStyle,fontSize:18,marginRight:16}}>
            {t('设置等级')}
          </text>
          <Slider
            style={{width:'80%',marginRight:16}}
            min={1}
            max={this.maxLevel}
            value={this.state.selectingLevel}
            onChange={(value)=>{this.setState({selectingLevel:value})}}
            marks={getEffectMark(this.maxLevel)}
          />
        </div>
        <Row>
          {this.props.effects?.map(
            (item,index)=>{
              const data = [item.init,item.limit_lv5,item.limit_lv10,item.limit_lv15,item.limit_lv20,item.limit_lv25,item.limit_lv30,item.limit_lv35,item.limit_lv40,item.limit_lv45,item.limit_lv50].filter((item)=>(item));
              return (
                <Col span={12} key={index}>
                  <div style={{...this.effectCapsuleStyle}}>
                <Popover trigger={ua==='mo'?'click':'hover'} content={<>
                  <p>{this.effects[item.type].name}</p>
                  <p>{t(this.effects[item.type].name)}</p>
                  <p>{this.effects[item.type].description}</p>
                  <p>{t(this.effects[item.type].description)}</p>
                </>}>
                  <div style={{display:'flex',padding:8,width:'40%'}}>
                    <text style={{...this.effectNameStyle}}>{t(this.effects[item.type].name)}</text>
                  </div>
                </Popover>
                    <div style={{...this.effectRightDivStyle}}>
                      <text style={{...this.effectValueStyle}}>
                      {this.calc(data,this.state.selectingLevel)}
                      </text>
                    </div>
                  </div>
                </Col>
              )
            }
          )}
          </Row>
      </div>
    )
  }
}







export {EffectTable,TestEffectTable}
