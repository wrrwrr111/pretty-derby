import React from 'react';
// import {useState} from 'react';
import { Table, Popover, Slider, Row ,Col} from "antd";

import db from '../db.js'
import t from './t.js'


const ua = db.get('ua').value();


const EffectTable = (props)=>{

  const effects = db.get('effects').value()
  let columns = [
    {title:'效果',dataIndex:'type',key:'type',render:type=><Popover trigger={ua==='mo'?'click':'hover'} content={<>
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
      selectingLevel:1,
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

  render() {
    return(
      <div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',padding:8,justifyContent:'space-between'}}>
          <text style={{...this.effectValueStyle,fontSize:18,marginRight:16}}>
            设置等级
          </text>
          <Slider
            style={{width:'80%',marginRight:16}}
            min={1}
            max={this.maxLevel}
            onChange={(value)=>{this.setState({selectingLevel:value})}}
          />
        </div>
        <Row>
          {this.props.effects.map(
            (item)=>{
              console.log(item);
              const data = [item.init,item.limit_lv5,item.limit_lv10,item.limit_lv15,item.limit_lv20,item.limit_lv25,item.limit_lv30,item.limit_lv35,item.limit_lv40,item.limit_lv45,item.limit_lv50].filter((item)=>(item));
              console.log(data);
              return (
                <Col span={12}>
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
