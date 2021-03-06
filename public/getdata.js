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
db.has('races').value() || db.set('races',[]).write()

let updateTime = new Date().getTime()
db.assign({'updateTime':updateTime}).write()
fs.writeFileSync('dbd.json',JSON.stringify({updateTime:updateTime}))

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

// db.get('supports').value().forEach(item=>{
//     db.get('supports').find({id:item.id}).assign({imgUrl:'img/supports/'+item.id+'.png'}).write()
// })
// db.get('players').value().forEach(item=>{
//   db.get('players').find({id:item.id}).assign({imgUrl:'img/players/'+item.id+'.png'}).write()
// })
// 下载图片
// downloadImg('skills')
// downloadImg('players')
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



//获取race标签
a={ class: [ 'ジュニア', 'クラシック', 'クラシックシニア', 'シニア' ],
  grade: [ 'OP', 'G3', 'Pre-OP', 'G2', 'G1' ],
  place: [ '中京', '函館', '札幌', '小倉', '新潟', '阪神', '中山', '京都', '東京', '福島', '大井' ],
  ground: [ '芝', 'ダート' ],
  distanceType: [ 'マイル', '短距離', '中距離', '長距離' ],
  direction: [ '左', '右', '直' ],
  side: [ null, '内', '外', '線' ] }
// db.get('races').value().forEach(race=>{
//   ['class','grade','place','ground','distanceType','direction','side'].forEach(item=>{
//      if(a[item].indexOf(race[item])==-1)
//       a[item].push(race[item])
//   })
// })
b={}
c= ['class','grade','place','ground','distanceType','direction','side']
c.forEach(item=>{
  b[item]=[]
  a[item].forEach(t=>{
    b[item].push({text:t,value:t})
  })
})
console.log(b)

