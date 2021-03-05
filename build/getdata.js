const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')
const Crawler = require('crawler')
// const {playerUrlC,supportUrlC} = require('./ma.js')

const PATH = 'img/'
const adapter = new FileSync('db.json')
const db = low(adapter)

db.has('players').value() || db.set('players',[]).write()
db.has('supports').value() || db.set('supports',[]).write()
db.has('skills').value() || db.set('skills',[]).write()
db.has('events').value() || db.set('events',[]).write()

let updateTime = new Date().getTime()
db.assign({'updateTime':updateTime}).write()
console.log(db.get('updateTime').value(),new Date().getTime())

function uniqueList(){
    let list = db.get('players').value()
    list.forEach(item=>{
        let eventList = Array.from(new Set(item.eventList))
        db.get('players').find({id:item.id}).assign({eventList}).write()
    })
}
const imgC = new Crawler({
    maxConnections:4,
    retries:6,
    encoding:null,
    jQuery:false,
    callback:(error,res,done)=>{
        if(error){
            logger.error(error)
        }else{
            filePath = PATH+ res.options.table+'/'+res.options.id+'.png'
            fs.createWriteStream(filePath,{emitClose:true}).write(res.body);
            db.get(res.options.table).find({id:res.options.id}).assign({imgUrl:filePath}).write()
        }
        done()
    }
})

function downloadImg(table){
    let list = db.get(table).value()
    list.forEach(item=>{
      console.log(item.id,item.imgUrl)
        if(item.imgUrl.slice(0,4)=='http'){
            imgC.queue({
                table:table,
                id:item.id,
                uri:item.imgUrl
            })
        }
    })
}

// db.get('skills').value().forEach(item=>{
//   if(!item.imgUrl){
//     db.get('skills').find({id:item.id}).assign({imgUrl:'img/skills/'+item.id+'.png'}).write()
//   }
// })
// 下载图片
// downloadImg('skills')
downloadImg('players')
// downloadImg('supports')
// uniqueList()

// db.set('players',[]).write()
// db.set('supports',[]).write()
// db.set('skills',[]).write()
// db.set('events',[]).write()
// console.log()
// db.set('players',[]).write()
// db.get('players').push({id:1}).write()
// console.log(db.get('supports').find({rare:'SSR'}).value().length)



