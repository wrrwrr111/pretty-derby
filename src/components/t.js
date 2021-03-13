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
const t = (text)=>{
    return lanData[text] || text
}
export  default t
