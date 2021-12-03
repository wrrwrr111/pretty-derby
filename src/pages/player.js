import React, { useState, useEffect } from 'react';
import db from '../db.js'
import t from '../components/t.js'
import {
  // Table,
  // Image,
  // Card
} from 'antd';


import { PlayerCard, PlayerTable } from '../components/player-detail.js'
// const CheckboxGroup = Checkbox.Group

// todo 提取出来
// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/'

const TITLE = '角色 - 乌拉拉大胜利 - 赛马娘资料站'
const defaultList = db.get('players').value()
//todo filter
const Player = (props) => {

  const [isTable, setIsTable] = useState(false)
  const playerList = props.list || defaultList
  document.title = TITLE
  return (
    <div className='flex justify-center w-full pt-1'>
      <div className='flex w-full flex-wrap max-w-6xl justify-evenly'>
        {/* <Button onClick={() => setIsTable(!isTable)}>{isTable ? "列表" : "表格"}</Button> */}
        {/* {isTable && <PlayerTable list={playerList} onSelect={props.onSelect}></PlayerTable>} */}
        {!isTable && ['3', '2', '1'].map(rare => {
          let list = playerList.filter(item => item.rare === rare)
          return list.length ? <>
            <div className='w-full text-xl font-bold text-center'>{`${rare}${t('星')}`}</div>
            {list.filter(item => item.rare === rare).map(player =>
              <div className='w-20 mr-2 mb-2'>
                <PlayerCard data={player} onSelect={props.onSelect}></PlayerCard>
              </div>)
            }
          </> : null
        })
        }
      </div>
    </div>
  )
}
// class Player extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       list: props.playerList,
//       isTable: false,
//     }
//     props.cacheLifecycles?.didRecover(this.componentDidRecover)
//   }
//   componentDidRecover() {
//     document.title = TITLE
//   }
//   componentDidUpdate(prevProps) {
//     if (this.props.playerList !== prevProps.playerList) {
//       this.setState({ list: this.props.playerList })
//     }
//   }
//   render() {
//     return (

//     )
//   }
// }

export default Player
