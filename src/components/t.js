import db from '../db.js'

const lan = db.get('lan').value()
const zh = db.get(lan||'zh').value()
const t = (text)=>{
    return zh[text] || text
}
export  default t