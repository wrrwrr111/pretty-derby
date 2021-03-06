import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import axios from 'axios'

const adapter = new LocalStorage('db')
const db = low(adapter)

async function getdbd(){
  let res = await axios.get('http://urarawin.com/dbd')
  let localTime = db.get('updateTime').value()
  console.log(localTime ,res.data.updateTime, localTime === res.data.updateTime)
  if (localTime && localTime === res.data.updateTime){
  // if (0){
    console.log('latest 不需要同步')
    // 不需要同步

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
  }
  // ReactDOM.render((<App></App>),document.getElementById('root'),);
}
getdbd()

export  default db
