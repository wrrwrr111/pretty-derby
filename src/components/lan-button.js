import React,{useState} from 'react';
import {withRouter} from 'react-router-dom';

import db from '../db.js'
import {Button } from 'antd';
import t from './t.js';
// import t from './t.js'

const ua = db.get('ua').value();

const LanButton = (props)=>{
  let lan = db.get('lan').value()
  const [langText,setLangText] = useState(lan==='zh'?'English':'中文')
  const changeLan=()=>{
    if(lan === 'zh'){
      lan = 'en'
      db.set('lan','en').write()
      setLangText('中文')
      t('','en')
    }else{
      lan = 'zh'
      db.set('lan','zh').write()
      setLangText('English')
      t('','zh')
    }
    // props.history.push('/t')
    window.location.reload(true)
  }
  return(<Button onClick={changeLan}>{langText}</Button>)
}

export default withRouter(LanButton)
