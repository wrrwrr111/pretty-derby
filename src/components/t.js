import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import ZH from '../assert/zh.json'
import EN from '../assert/en.json'
const adapter = new LocalStorage('db')
const db = low(adapter)

const lan = db.get('lan').value()||'zh'
let lanData = {}
if(lan==='zh'){
  lanData = ZH.zh
}else{
  lanData = EN.en
}
let noTrans = {}
const t = (text,lan)=>{
  if(lan==='zh'){
    lanData = ZH.zh
  }else if(lan==='en'){
    lanData = EN.en
  }
  let result = lanData[text]

  // if(!result&&result!==""){
  //   noTrans[text]=""
  // }
  // console.log(JSON.stringify(noTrans))

  return result||text
}
export  default t
