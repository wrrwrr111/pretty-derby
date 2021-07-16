import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'
import Memory from 'lowdb/adapters/Memory'
import axios from 'axios'
import jsonDB from './assert/db.json'

const adapterL = new LocalStorage('db')
// const adapterM = new Memory()
const db = low(adapterL)


const d = async ()=>{
  // let res = await axios.get('https://urarawin.com/d')
  let res = await axios.get('https://urarawin.com/api/d')
  console.log(res.data)
  db.set('userId',res.data).write()
}
db.get('userId').value()||d()
db.get('lan').value()||db.set('lan','cn').write()
db.get('selected').value()||db.set('selected',{
  supports:{0:{},1:{},2:{},3:{},4:{},5:{}},
  player:{},
  races:[]
}).write()
db.get('myDecks').value()||db.set('myDecks',[]).write()
db.get('mySupports').value()||db.set('mySupports',[]).write()
export  default db
