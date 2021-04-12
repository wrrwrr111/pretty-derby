import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import ZH from '../assert/cn.json'
import EN from '../assert/us.json'
import JP from '../assert/jp.json'
const adapter = new LocalStorage('db')
const db = low(adapter)

const lan = db.get('lan').value()||'cn'
let lanData = {}
if(lan==='cn'){
  lanData = ZH
}else if(lan==='us'){
  lanData = EN
}else if(lan==='jp'){
  lanData = JP
}
let noTrans = {}
const t = (text,lan)=>{
  if(lan==='cn'){
    lanData = ZH
  }else if(lan==='us'){
    lanData = EN
  }else if(lan==='jp'){
    lanData = JP
  }
  let result = lanData[text]

  // if(!result&&result!==""){
  //   noTrans[text]=""
  // }
  // console.log(JSON.stringify(noTrans))

  return result||text
}
export  default t
