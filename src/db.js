import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import axios from 'axios'
import jsonDb from './assert/db.json'

const adapter = new LocalStorage('db')
const db = low(adapter)


const d = async ()=>{
  // let res = await axios.get('http://urarawin.com/d')
  let res = await axios.get('http://urarawin.com/d')
  console.log(res.data)
  db.set('userId',res.data).write()
}
db.get('userId').value()||d()

db.set('players',jsonDb.players).write()
db.set('supports',jsonDb.supports).write()
db.set('skills',jsonDb.skills).write()
db.set('events',jsonDb.events).write()
db.set('updateTime',jsonDb.updateTime).write()
db.set('races',jsonDb.races).write()
db.set('zh',jsonDb.zh).write()
db.set('en',jsonDb.en).write()
// db.set('lan','en').write()
//重新加载
db.has('lan').value()||db.set('lan','zh').write()
db.get('selected').value()||db.set('selected',{
  supports:{1:{},2:{},3:{},4:{},5:{},6:{}},
  player:{},
  races:[]
}).write()
db.get('mySupports').value()||db.set('mySupports',[]).write()
export  default db
