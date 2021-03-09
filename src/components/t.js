import db from '../db.js'

const zh = db.get('zh').value()
const t = (text)=>{
    return zh[text] || text
}
export  default t