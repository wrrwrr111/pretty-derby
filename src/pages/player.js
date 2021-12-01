import React from 'react';
import db from '../db.js'
import t from '../components/t.js'
import {
  Divider,
  Row,
  Col,
  Button,
  // Table,
  // Image,
  // Card
} from 'antd';


import { PlayerCard, PlayerTable } from '../components/player-detail.js'
// const CheckboxGroup = Checkbox.Group

// todo 提取出来
// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/'

const TITLE = '角色 - 乌拉拉大胜利 - 赛马娘资料站'
//todo filter
class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.playerList,
      isTable: false,
    }
    props.cacheLifecycles?.didRecover(this.componentDidRecover)
  }
  componentDidRecover() {
    document.title = TITLE
  }
  componentDidUpdate(prevProps) {
    if (this.props.playerList !== prevProps.playerList) {
      this.setState({ list: this.props.playerList })
    }
  }
  render() {
    document.title = TITLE
    return (
      <Row justify="space-around">
        <Button onClick={() => this.setState({ isTable: !this.state.isTable })}>
          {this.state.isTable ? "列表" : "表格"}</Button>
        <Col span={22}>
          {
            this.state.isTable ?
              <PlayerTable list={this.state.list} onSelect={this.props.onSelect}></PlayerTable>
              : ['3', '2', '1'].map(rare => {
                let list = this.state.list.filter(item => item.rare === rare)
                return list.length ? <Row gutter={[16, 16]} key={rare}>
                  <Divider>{rare} {t('星')}</Divider>
                  {this.state.list.filter(item => item.rare === rare).map(player =>
                    <Col xxl={2} lg={3} sm={6} xs={6} key={player.id}>
                      <PlayerCard data={player} onSelect={this.props.onSelect}></PlayerCard>
                    </Col>)
                  }
                </Row> : null
              })
          }
        </Col>
      </Row>
    )
  }
}
Player.defaultProps = {
  playerList: db.get('players').value()
}

export default Player
