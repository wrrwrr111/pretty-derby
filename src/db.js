import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import axios from 'axios'
import jsonDB from './assert/db.json'

const adapter = new LocalStorage('db')
const db = low(adapter)


const d = async ()=>{
  // let res = await axios.get('https://urarawin.com/d')
  let res = await axios.get('https://urarawin.com/api/d')
  console.log(res.data)
  db.set('userId',res.data).write()
}
db.get('userId').value()||d()

db.set('players',jsonDB.players).write()
db.set('supports',jsonDB.supports).write()
db.set('skills',jsonDB.skills).write()
db.set('events',jsonDB.events).write()
db.set('updateTime',jsonDB.updateTime).write()
db.set('races',jsonDB.races).write()
db.set('buffs',jsonDB.buffs).write()
db.set('effects',jsonDB.effects).write()
db.set('zh',jsonDB.zh).write()
db.set('en',jsonDB.en).write()
// db.set('lan','en').write()
//重新加载

db.has('lan').value()||db.set('lan','zh').write()
db.get('selected').value()||db.set('selected',{
  supports:{0:{},1:{},2:{},3:{},4:{},5:{}},
  player:{},
  races:[]
}).write()
db.get('myDecks').value()||db.set('myDecks',[]).write()
db.get('mySupports').value()||db.set('mySupports',[]).write()
export  default db
