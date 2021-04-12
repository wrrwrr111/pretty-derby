import React,{useState} from 'react';
import {withRouter} from 'react-router-dom';

import db from '../db.js'
import {Button,Popover } from 'antd';
import t from './t.js';
import Flag from 'rc-national-flag'
// import t from './t.js'

const ua = db.get('ua').value();

const LanButton = (props)=>{
  let lan = db.get('lan').value()
  const [code,setCode]= useState(lan||'cn')
  console.log(code)
  const changeToCn=()=>{
    lan = 'cn'
    db.set('lan','cn').write()
    setCode('cn')
    t('','cn')
    window.location.reload(true)
  }
  const changeToUs=()=>{
    lan = 'us'
    db.set('lan','us').write()
    setCode('us')
    t('','us')
    window.location.reload(true)
  }
  const changeToJp=()=>{
    lan = 'jp'
    db.set('lan','jp').write()
    setCode('jp')
    t('','jp')
    window.location.reload(true)
  }
  const flagStyle={
    width:40,
    height:30,
    margin:4
  }
  return(
  <Popover content={<div style={{display:'flex'}}>
  <Flag onClick={changeToCn} code={'cn'} style={{...flagStyle}}></Flag>
  <Flag onClick={changeToUs} code={'us'} style={{...flagStyle}}></Flag>
  <Flag onClick={changeToJp} code={'jp'} style={{...flagStyle}}></Flag>
  </div>}>
      <Flag code={code} style={{...flagStyle}}></Flag>
  </Popover>
  )
}

export default withRouter(LanButton)
