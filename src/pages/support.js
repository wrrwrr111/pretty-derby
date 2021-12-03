import React from 'react';
import { Divider, Row, Col, Button, Checkbox, Input } from 'antd';
// import { useDidRecover } from 'react-router-cache-route'

import db from '../db.js'
import t from '../components/t.js'
import { SupportCard } from '../components/support-detail.js'
import { SkillCheckbox } from '../components/skill-detail.js'

const CheckboxGroup = Checkbox.Group
const Search = Input.Search
const TITLE = '支援 - 乌拉拉大胜利 - 赛马娘资料站'

class Support extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.supportList,
      chooseMode: false,
      showMode: false,
      chosenList: db.get('mySupports').value() || [],
      effectList: [],
      typeList: [],
      skillList: []
    }
    this.effects = db.get('effects').value()
    this.effectOptions = Object.keys(this.effects)
      .map(key => { return { label: t(this.effects[key].name), value: key } })
    this.typeOptions = ['スピード', 'スタミナ', 'パワー', '根性', '賢さ', '友人'].map(item => ({ label: t(item), value: item }))
    props.cacheLifecycles?.didRecover(this.componentDidRecover)
  }
  componentDidRecover() {
    document.title = TITLE
  }
  componentDidUpdate(prevProps) {
    if (this.props.supportList !== prevProps.supportList) {
      this.setState({ list: this.props.supportList })
    }
  }
  changeChooseMode = () => {
    this.setState({ chooseMode: !this.state.chooseMode })
    this.setState({ showMode: !this.state.chooseMode })
  }
  changeShowMode = () => {
    this.setState({ showMode: !this.state.showMode })
  }
  onSelect = (item) => {
    let index = this.state.chosenList.indexOf(item.id)
    if (index === -1) {
      this.state.chosenList.push(item.id)
    } else {
      this.state.chosenList.splice(index, 1)
    }
    db.update('mySupports', this.state.chosenList).write()
    this.setState({})
  }
  onSupportCheckboxChange = (effectList) => {
    this.updateSupport({ effectList })
    this.setState({ effectList: effectList })
  }

  onSkillCheckboxUpdate = (skillList) => {
    this.updateSupport({ skillList })
    this.setState({ skillList: skillList })
  }
  onTypeListChange = (typeList) => {
    this.updateSupport({ typeList })
    this.setState({ typeList })
  }
  updateSupport = ({ effectList, skillList, eventIdList = [], typeList }) => {
    let tempList = this.props.supportList
    if (effectList?.length) {
      tempList = tempList.filter(support => {
        let flag = 0;
        effectList.forEach(value => {
          support.effects && support.effects.forEach(effect => {
            if (effect.type === value) {
              flag += 1
            }
          })
        })
        return flag === effectList.length
      })
    }
    if (skillList?.length) {
      tempList = tempList.filter(support => {
        let flag = 0;
        support.skillList.forEach(skillId => {
          if (skillList.indexOf(skillId) !== -1) {
            return flag = 1;
          }
        })
        return flag
      })
    }
    if (eventIdList?.length) {
      tempList = tempList.filter(support => {
        let flag = 0;
        support.eventList.forEach(eventId => {
          if (eventIdList.indexOf(eventId) !== -1) {
            return flag = 1;
          }
        })
        return flag
      })
    }
    if (typeList?.length) {
      tempList = tempList.filter(support => {
        let flag = 0;
        if (typeList.indexOf(support.type) !== -1) {
          return flag = 1;
        }
        return flag
      })
    }
    this.setState({ list: tempList })
  }

  onSearch = (searchText) => {
    const allEventList = db.get('events').value();
    const eventIdList = allEventList.filter(event => {
      let jsonEvent = JSON.stringify(event)
      if (jsonEvent.indexOf(searchText) !== -1) {
        return true
      } else {
        return false
      }
    }).reduce((list, event) => {
      list.push(event.id)
      return list
    }, [])
    this.updateSupport(this.state.effectList, this.state.skillList, eventIdList)
  };

  render() {
    document.title = TITLE
    const headerStyle = {
      backgroundColor: '#1e90ffA0',
      height: 48,
      borderRadius: 5,
      margin: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
    const headerTextStyle = {
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 600,
      color: '#f5f5f5',
      textShadow: "0 2px #33333370",
    }
    return (
      <div className='flex justify-center w-full pt-1'>
        <div className=' w-full grid grid-cols-4 justify-around max-w-6xl justify-evenly'>
          {this.props.filter &&
            <div className='col-span-1' style={{ ...headerStyle }}>
              <text style={{ ...headerTextStyle }}>{t('筛选')}</text>
            </div>}
          <div className='col-span-3'>
            <div style={{ ...headerStyle }}>
              <text style={{ ...headerTextStyle }}>{t('支援卡列表')}</text>
            </div>
          </div>
          {this.props.filter &&
            <div className='col-span-1'>
              <div style={{
                overflowY: 'scroll', display: 'flex',
                flexDirection: 'column', overflowX: 'hidden',
                maxHeight: window.innerHeight - 104 - 78, padding: 4
              }}>
                <Button onClick={this.changeShowMode}>{t('高亮我的卡组')}</Button>
                <Button onClick={this.changeChooseMode}>{t('配置卡组')}</Button>
                {this.state.chooseMode && <Button onClick={this.changeChooseMode} type='primary'>{t('配置完成')}</Button>}
                <Search placeholder={t("输入关键词")} enterButton={t("搜索")} size="middle"
                  style={{ width: '100%' }} onSearch={this.onSearch} />
                <Divider style={{ margin: 4 }}>{t('类型')}</Divider>
                <CheckboxGroup options={this.typeOptions} value={this.state.typeList}
                  onChange={this.onTypeListChange} />
                <Divider style={{ margin: 4 }}>{t('技能')}</Divider>
                <SkillCheckbox onUpdate={this.onSkillCheckboxUpdate}
                  checkOnly={true} needId={true}></SkillCheckbox>
                <Divider style={{ margin: 4 }}>{t('育成效果')}</Divider>
                <CheckboxGroup options={this.effectOptions} value={this.state.effectList}
                  onChange={this.onSupportCheckboxChange} />
              </div>
            </div>
          }
          <div className='col-span-3'>
            <div className=' overflow-y-scroll overflow-x-hidden pl-4 w-full h-full flex flex-wrap justify-evenly' style={{
              maxHeight: window.innerHeight - 104 - 78
            }}>
              {['SSR', 'SR', 'R'].map(rare => {
                let list = this.state.list.filter(item => item.rare === rare)
                return list.length && <>
                  <div className='w-full text-xl font-bold text-center'>{rare}</div>
                  {list.map(support =>
                    <div
                      className={`w-20 mr-2 mb-2 ${this.state.showMode && this.state.chosenList.indexOf(support.id) === -1 ? 'un-chosen-card' : 'chosen-card'}`}
                      key={support.id}
                    >
                      <SupportCard data={support} onSelect={this.state.chooseMode ? this.onSelect : this.props.onSelect}
                        chooseMode={this.props.chooseMode}></SupportCard>
                    </div>
                  )}
                </>
              })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Support.defaultProps = {
  supportList: db.get('supports').value(),
  filter: true
}

export default Support
