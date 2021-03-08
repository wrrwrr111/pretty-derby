import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import axios from 'axios'
import jsonDb from './assert/db.json'

const adapter = new LocalStorage('db')
const db = low(adapter)

// console.log(jsonDb)
/*
async function getdbd(){
  let res = await axios.get('http://urarawin.com/dbd')
  let localTime = db.get('updateTime').value()
  console.log(localTime ,res.data.updateTime, localTime === res.data.updateTime)
  if (localTime && localTime === res.data.updateTime){
    console.log('latest 不需要同步')
  }else{
    console.log("同步")
    res = await axios.get('http://urarawin.com/db')
    db.set('players',res.data.players).write()
    db.set('supports',res.data.supports).write()
    db.set('skills',res.data.skills).write()
    db.set('events',res.data.events).write()
    db.set('updateTime',res.data.updateTime).write()
    db.set('races',res.data.races).write()
    //重新加载
    db.get('selected').value()||db.set('selected',{
      supports:{1:{},2:{},3:{},4:{},5:{},6:{}},
      player:{},
      races:[]
    }).write()
  }
}
getdbd()
*/
db.set('players',jsonDb.players).write()
db.set('supports',jsonDb.supports).write()
db.set('skills',jsonDb.skills).write()
db.set('events',jsonDb.events).write()
db.set('updateTime',jsonDb.updateTime).write()
db.set('races',jsonDb.races).write()
//重新加载
db.get('selected').value()||db.set('selected',{
  supports:{1:{},2:{},3:{},4:{},5:{},6:{}},
  player:{},
  races:[]
}).write()
export  default db
