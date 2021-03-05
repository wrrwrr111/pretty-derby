const Crawler = require('crawler')
const path = require('path')
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const { write } = require('fs');

const adapter = new FileSync('db.json')
const db = low(adapter)

// 马娘列表
var playerUrlC = new Crawler({

  maxConnections: 1,
    callback:(error,res,done)=>{
        if(error){
            console.log(error)
        }else{
            var $ = res.$;
            $('.uma_hyoka_table a').each(function(){
                    playerC.queue({
                        gwId:this.attribs.href.split('/').pop(),
                        uri: this.attribs.href,
                        imgUrl:this.children[0].attribs['data-original'],
                        name:this.children[2].data,
                    })
            })

            //test first
            // let a = $('.uma_hyoka_table a')[0]
            //   playerC.queue({
            //       gwId:a.attribs.href.split('/').pop(),
            //       uri: a.attribs.href,
            //       imgUrl:a.children[0].attribs['data-original'],
            //       name:a.children[2].data,
            //   })


        }
        done()
    }
})
// 爬取单个马娘
var playerC = new Crawler({
  maxConnections: 1,
  callback:(error,res,done)=>{
    if(error){
      console.log(error)
    }else{
      var $ = res.$;
      let item = {}
      item.gwId = res.options.gwId
      item.name = res.options.name
      item.imgUrl = res.options.imgUrl
      item.rare = $('._main')[0].children[0].data.split('/')[1].split(')')[0][1]
            // var [caodi,nidi,duanjuli,yingli,zhongjuli,changjuli,tao,xian,cha,zhui] =
            // 芝	ダート 短距離	マイル	中距離	長距離 逃げ	先行	差し	追込
            // let tmpList = $('.uma_fix_table td')
            // startNum = tmpList.length - 23
            // item.grass = tmpList[startNum].children[0].data
            // item.dirt = tmpList[startNum+1].children[0].data
            // item.shortDistance = tmpList[startNum+4].children[0].data
            // item.mile = tmpList[startNum+5].children[0].data
            // item.mediumDistance= tmpList[startNum+6].children[0].data
            // item.longDistance = tmpList[startNum+7].children[0].data
            // item.escape = tmpList[startNum+8].children[0].data
            // item.leading = tmpList[startNum+9].children[0].data
            // item.insert = tmpList[startNum+10].children[0].data
            // item.tracking = tmpList[startNum+11].children[0].data
            // //成长
            // item.speedGrow = tmpList[startNum+12].children[0].data
            // item.staminaGrow = tmpList[startNum+13].children[0].data
            // item.powerGrow = tmpList[startNum+14].children[0].data
            // item.gutsGrow = tmpList[startNum+15].children[0].data
            // item.wisdomGrow = tmpList[startNum+16].children[0].data

            //技能
            item.skillList = []
            item.uniqueSkillList = []
            item.initialSkillList = []
            item.awakeningSkillList = []
            let tmp = []
            $('h3').each((index,head) => {
              title = head.children[0].data
              if( title === '固有スキル'){
                  scanTable(head.next).forEach(skill=>{
                    let id = getSkillId(skill)
                    item.skillList.push(id)
                    item.uniqueSkillList.push(id)
                  })
              }else if (title === '初期スキル'){
                scanTable(head.next).forEach(skill=>{
                  let id = getSkillId(skill)
                  item.skillList.push(id)
                  item.initialSkillList.push(id)
                })
              }else if (title === '覚醒スキル'){
                scanTable(head.next).forEach(skill=>{
                  let id = getSkillId(skill)
                  item.skillList.push(id)
                  item.awakeningSkillList.push(id)
                })
              }
            }
            )


            //先存技能
            // skillList.forEach(skill=>{
            // })

            //事件列表

            item.eventList = []
            $('.uma_choice_table').each((index,table)=>{
                let event = {
                    name:table.prev.children[0].data,
                    choiceList:scanTable(table)
                }
                let id = getEventId(event)
                item.eventList.push(id)
            })

            //比赛
            // $('h3').each((index,head) => {
            //   title = head.children[0].data
            //   if( title == 'URAファイナルズの目標一覧'){
            //       item.raceList = scanTable(head.next,'race')
            //     }
            //   })

            // let data = db.get('players').find({gwId:item.gwId}).value()
            let data = db.get('players').find({name:item.name,rare:item.rare}).value()
            if(data){
              if (data.imgUrl)
                delete data.imgUrl
              db.get('players').find({id:data.id}).assign(item).write()
            }else{
              item.id = shortid.generate()
              console.log('player',item.id,res.options.uri)
                db.get('players').push(item).write()
            }
        }
        done()
    }
})

// support列表
var supportUrlC = new Crawler({
    maxConnections: 1,
    callback:(error,res,done)=>{
        if(error){
            console.log(error)
        }else{
            var $ = res.$;
            $('.uma_support_table a').each(function(){
                    supportC.queue({
                      gwId:this.attribs.href.split('/').pop(),
                        uri: this.attribs.href,
                        imgUrl:this.children[0].attribs['data-original'],
                        name:this.children[2].data,
                        rare:this.parent.next.children[0].data
                    })

            })
        }
        done()
    }
})

var supportC = new Crawler({
    maxConnections: 1,
    callback:(error,res,done)=>{
        if(error){
            console.log(error)
        }else{
            var $ = res.$;
            let item = {}
            item.gwId = res.options.gwId
            item.name = res.options.name
            item.imgUrl = res.options.imgUrl
            item.rare = res.options.rare
            //技能 只有名字
            item.skillList = []
            let skillList = []
            $('h3').each((index,head) => {
                title = head.children[0].data
                if( title == '固有ボーナス'){
                    item.baseAbility={
                        name:head.next.children[0].data,
                        ability:scanTable(head.next.next)
                    }
                }else if (title == '育成イベント'){
                    skillList = scanTable(head.next)
                    item.trainingEventSkill = []
                    skillList.forEach(skill=>{
                        let id = getSkillId(skill)
                        item.trainingEventSkill.push(id)
                        item.skillList.push(id)
                      })
                    }else if (title == '所持スキル'){
                      skillList = scanTable(head.next)
                      item.possessionSkill = []
                      skillList.forEach(skill=>{
                        let id = getSkillId(skill)
                        item.possessionSkill.push(id)
                        item.skillList.push(id)
                    })
                }
                // item.skillList.push(skill.children[0].data)
            });
            $('h4').each((index,head)=>{
                title = head.children[0].data
                if (title == '初期能力'){
                    item.supportAbilityEarly=scanTable(head.next)
                }else if (title == 'レベル最大時'){
                    item.supportAbilityLate=scanTable(head.next)
                }
            })

            //事件列表
            item.eventList = []
            $('.uma_choice_table').each((index,table)=>{
                let name
                if (table.prev.name == 'h3'){
                  name = table.prev.children[0].data
                  // console.log("1",name)
                }else{
                  name = table.prev.prev.children[0].data
                  // console.log("2",name)
                }
                let event = {
                    name:name,
                    choiceList:scanTable(table)
                }
                let id = getEventId(event)
                item.eventList.push(id)
            })
            let data = db.get('supports').find({gwId:item.gwId}).value()
            // let data = db.get('supports').find({name:item.name,rare:item.rare}).value()
              if(data){
                if (data.imgUrl)
                  delete data.imgUrl
                db.get('supports').find({id:data.id}).assign(item).write()
              }else{
                item.id = shortid.generate()
                console.log(item.id,res.options.uri)
                db.get('supports').push(item).write()
              }
        }
        done()
    }
})

// 获取所有article
playerUrlC.queue('https://gamewith.jp/uma-musume/article/show/253241')

// supportUrlC.queue('https://gamewith.jp/uma-musume/article/show/255035')

// supportC.queue({
//   gwId:'257460',
//     uri:'https://gamewith.jp/uma-musume/article/show/257460',
//     imgUrl:'https://img.gamewith.jp/article_tools/uma-musume/gacha/sp_1.png',
//     name:'スペシャルウィーク',
//     rare:'SSR'
// })

function scanTable(table,type){
    let list = []
    // console.log(table.children[0].children)
    if(!table.children[0].children) return []
    let tableList = table.children[0].children
    if(type=='race'){
      tableList = table.children
    }
    tableList.forEach((rol)=>{

          if(rol.children[0].children[0].type == 'text'){
            //普通能力
            let col = []
            col.push(rol.children[0].children[0].data)
            col.push([])
            rol.children[1].children.forEach(hang=>{
              if(hang.type=='text'){
                // todo 直接替换 速度 耐力 力量
                // let tmpdata = hang.data
                let str = hang.data
                str = str.replace(new RegExp('スピード','gm'),'速度')
                str = str.replace(new RegExp('スタミナ','gm'),'耐力')
                str = str.replace(new RegExp('パワー','gm'),'速度')
                col[1].push(str)
              }
            })
            list.push(col)
          }else{
            let skill = {
              name:rol.children[1].children[0].children[0].data,
              imgUrl:rol.children[0].children[0].attribs['data-original']||
              rol.children[0].children[0].children[0].attribs['data-original'],
              rare:rol.children[0].children[1].data,
              describe:rol.children[1].children[2].data
            }
            list.push(skill)
            //技能
          }

    })
    return list
}

function getSkillId(skill){
    let data = db.get('skills').find({name:skill.name}).value()
    if(data){
      if (data.imgUrl)
        delete skill.imgUrl
      db.get('skills').find({id:data.id}).assign(skill).write()
      return data.id
    }else{
      let id = shortid.generate()
      skill.id = id
      db.get('skills').push(skill).write()
      return id
    }
  }
  function getEventId(event){
    let data = db.get('events').find({name:event.name}).value()
    if(data){
      //更新事件
      db.get('events').find({id:data.id}).assign(event).write()
        return data.id
    }else{
        let id = shortid.generate()
        event.id = id
        db.get('events').push(event).write()
        return id
    }
}

exports.playerUrlC = playerUrlC
exports.supportUrlC = supportUrlC

