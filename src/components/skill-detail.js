import React, { useEffect, useState } from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import db from '../db.js'
import dbL from '../dbL.js'
import { Row, Col, Popover, Button, Image, Checkbox, Divider, Input, Tooltip, Switch } from 'antd';
import t from './t.js'
import { SupportCard } from './support-detail.js'
import { PlayerCard } from './player-detail.js'
import ScrollBars from 'react-custom-scrollbars'

const Search = Input.Search
const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'

const ua = dbL.get('ua').value();
const allSkillList = db.get('skills').orderBy('db_id').value()

const options = {
  distance_type: [
    { label: t('短距離'), value: '1' },
    { label: t('マイル'), value: '2' },
    { label: t('中距離'), value: '3' },
    { label: t('長距離'), value: '4' },
  ],
  running_style: [
    { label: t('逃げ'), value: '1' },
    { label: t('先行'), value: '2' },
    { label: t('差し'), value: '3' },
    { label: t('追込'), value: '4' },
    { label: t('通用'), value: '-1' },
  ],
  phase: [
    { label: t('序盤'), value: '0' },
    { label: t('中盤'), value: '1' },
    { label: t('終盤'), value: '2' },
    { label: t('冲刺'), value: '3' },
  ],
  corner_random: [
    { label: t('コーナー'), value: '1' },
  ],
  straight_random: [
    { label: t('直線'), value: '1' },
  ],
  is_finalcorner: [
    { label: t('最終直線/コーナー'), value: '1' },
  ]
  // is_finalcorner==1&corner==0
}
const skillType = {
  1: '速度属性',
  2: '耐力属性',
  3: '力量属性',
  4: '毅力属性',
  5: '智力属性',
  6: '体力',
  7: '体力消耗',
  8: '视野',
  9: '体力恢复',
  10: '出栏时机',
  14: '掛かり结束时间',
  21: '瞬时速度',
  27: '目标速度',
  28: '走位速度',
  31: '加速度',
}

const SkillList = (props) => {
  const skillList = props.skillList

  return (
    <Row gutter={0}>
      {skillList.map((skillId, index) =>
        <Col span={12} key={index}>
          <SkillButton id={skillId} usedInList={true} isNur={props.isNur || false}>
          </SkillButton>
        </Col>)}
    </Row>
  )
}
const allSupportList = db.get('supports').value()
const allPlayerList = db.get('players').value()

const SkillDetail = (props) => {
  const skill = props.skill || db.get('skills').find({ id: props.match?.params?.id }).value()
  const isNur = props.isNur !== undefined ? props.isNur : parseInt(props.match?.params?.nur)
  const supportList = allSupportList.filter(support => {
    let flag = 0;
    support.skillList.forEach(id => {
      if (id === skill?.id) {
        flag = 1
      }
    })
    return flag
  })
  const playerList = allPlayerList.filter(player => {
    let flag = 0;
    player.skillList.forEach(id => {
      if (id === skill?.id) {
        flag = 1
      }
    })
    return flag
  })

  return <div style={{
    maxWidth: 600, maxHeight: window.innerHeight - 104,
    overflow: 'auto', textAlign: 'left',
    overflowWrap: 'break-word', wordBreak: 'break-all'
  }}>
    <Image src={cdnServer + skill?.imgUrl} preview={false} width={52}></Image>
    <p>{`${t('技能名称')}:\xa0\xa0${skill?.name}`}</p>
    <p>{`${t('技能名称')}:\xa0\xa0${t(skill?.name)}`}</p>
    <p>{`${t('技能描述')}:\xa0\xa0${skill?.describe}`}</p>
    <p>{`${t('技能描述')}:\xa0\xa0${t(skill?.describe)}`}</p>
    <p>{`${t('触发条件')}:\xa0\xa0${skill?.condition}`}</p>
    <p>{`${t('触发条件')}:\xa0\xa0${t(skill?.condition)}`}</p>
    <p>{`${t('技能效果')}:\xa0\xa0${skill?.ability?.map(ability => skillType[ability.type] + ' ' + ability.value / 10000)}`}</p>
    <p>{`${t('持续时间')}:\xa0\xa0${skill?.ability_time / 10000}s*${t('赛道长度')}/1000`}</p>
    <p>{`${t('冷却时间')}:\xa0\xa0${skill?.cooldown / 10000}s*${t('赛道长度')}/1000`}</p>
    <p>{`${t('技能价格')}:\xa0\xa0${skill?.need_skill_point}\xa0Pt`}</p>
    <p>{`${t('技能评分')}:\xa0\xa0${skill?.grade_value}`}</p>
    {!isNur && <>
      <Divider>{t('支援卡')}</Divider>
      <Row>
        {supportList.sort((a, b) => b.rarity - a.rarity).map(support =>
          <Col span={4} key={support.id}>
            <SupportCard data={support} onSelect={() => null}></SupportCard>
          </Col>)
        }
      </Row>
      <Divider>{t('角色')}</Divider>
      <Row>
        {playerList.sort((a, b) => b.rarity - a.rarity).map(player =>
          <Col span={4} key={player.id}>
            <PlayerCard data={player} onSelect={() => null}></PlayerCard>
          </Col>)
        }
      </Row>
    </>}
  </div>
}
const SkillButton = (props) => {
  const history = useHistory();
  const skill = props.skill || db.get('skills').find({ id: props.id }).value()

  const toSkillDetail = (id) => {
    if (ua === 'mo') {
      history.push(`/skill-detail/${id}`)
    }
  }

  const inListStyleOverride = {
    borderRadius: '8px',
    color: '#303030',
    width: '96%',
    justifyContent: 'flex-start'
  }
  const skillNameStyle = {
    width: `calc(96% - 34px)`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'justify'
  }

  return <Popover 
  mouseEnterDelay={0.4}
  visible={ua === 'mo' ? false : undefined}
    content={
      <SkillDetail skill={skill} isNur={props.isNur || false}></SkillDetail>
    }>
    <Button type={'primary'} className={'skill-btn skill-btn-' + skill?.rarity}
      style={props.usedInList ? { ...inListStyleOverride } : {}}
      onClick={() => toSkillDetail(skill?.id)}>
      <div style={props.usedInList ?
        { display: 'flex', position: 'absolute', top: 4, left: 8, width: '100%' } : { width: '100%' }}>
        <Image src={cdnServer + skill?.imgUrl} preview={false} width={26}></Image>
        <div style={{ ...skillNameStyle }}>{`\xa0\xa0${skill?.name}`}</div>
      </div>
    </Button>
  </Popover>
}

const SkillCheckboxGroup = React.memo((props) => {
  const { options, name, value } = props;
  const onChange = (checkedValues) => {
    props.onChange(name, checkedValues);
  }

  return <Checkbox.Group options={options} value={value} onChange={onChange} />
});

const SkillCheckbox = React.memo((props) => {
  const [skillChecked1, setSkillChecked1] = useState([]);
  const [skillChecked2, setSkillChecked2] = useState([]);
  const [checkboxGroupValues, setCheckedboxGroupValues] = useState({});
  // init isOwn
  localStorage.getItem('isOwn') === null && localStorage.setItem('isOwn', 0)
  const [isOwn, setIsOwn] = useState(parseInt(localStorage.getItem('isOwn')))
  const mySupports = dbL.get('mySupports').value()
  const mySkillList = new Set(mySupports.reduce((list, supportId) => {
    let support = db.get('supports').find({ id: supportId }).value()
    return list.concat(support.skillList)
  }, []))
  const checkOptions1 = [
    { label: '速度被动(绿)', value: '10011' },
    { label: '耐力被动(绿)', value: '10021' },
    { label: '力量被动(绿)', value: '10031' },
    { label: '毅力被动(绿)', value: '10041' },
    { label: '智力被动(绿)', value: '10051' },
    { label: '耐力恢复(蓝)', value: '20021' },
    { label: '速度提高(黄)', value: '20011' },
    // {label:'20031',value:'20031'},
    { label: '加速度提高(黄)', value: '20041' },
    { label: '切换跑道(黄)', value: '20051' },
    { label: '起步时间(黄)', value: '20061' },
    // {label:'20071',value:'20071'},
    // {label:'20081',value:'20081'},
    { label: '视野提高(黄)', value: '20091' },
    { label: '速度降低(红)', value: '30011' },
    { label: '无法冷静(红)', value: '30041' },
    { label: '耐力降低(红)', value: '30051' },
    { label: '视野降低(红)', value: '30071' }
  ]
  const checkOptions2 = [
    { label: t('ノーマル'), value: 'ノーマル' },
    { label: t('レア'), value: 'レア' },
    { label: t('固有'), value: '固有' }
  ]
  const onChange1 = (checkedValues) => {
    setSkillChecked1(checkedValues)
    updateSkillList(filteredSkills, checkedValues, skillChecked2, isOwn)
  }
  const onChange2 = (checkedValues) => {
    setSkillChecked2(checkedValues)
    updateSkillList(filteredSkills, skillChecked1, checkedValues, isOwn)
  }
  const filteredSkills = React.useMemo(() => Object.entries(checkboxGroupValues)
    .reduce((l, [key, values]) =>
      values.length > 0
        ? l.filter(skill => {
          if (!skill?.condition) {
            return false
          }
          switch (key) {
            case 'phase':
              return ['phase', 'phase_random'].map(
                _key => values.map(value => `${_key}==${value}`)
              ).flat().some(phrase => skill?.condition.includes(phrase));
            case 'running_style':
              return (values.map(value => `${key}==${value}`)
                .some(phrase => skill?.condition.includes(phrase))) || (values.includes('-1') && !skill?.condition.includes(`${key}==`));
            default:
              return values.map(value => `${key}==${value}`)
                .some(phrase => skill?.condition.includes(phrase));
          }
        })
        : l,
      allSkillList),
    [checkboxGroupValues, allSkillList])
  useEffect(() => {
    updateSkillList(filteredSkills, skillChecked1, skillChecked2, isOwn)
  }, [filteredSkills]);

  const onCheckboxGroupsChange = React.useCallback((groupName, checkedValues) => {
    setCheckedboxGroupValues({ ...checkboxGroupValues, ...{ [groupName]: checkedValues } });
  }, [checkboxGroupValues]);

  const updateSkillList = (tempSkillList, check2, check3, isOwn) => {
    const check1 = Object.values(checkboxGroupValues).flat();
    if (check2.length) {
      tempSkillList = tempSkillList.filter(skill => {
        let flag = 0;
        check2.forEach(value => {
          let str = skill?.icon_id + ''
          if (str) {
            if (str[0] === value[0] && str[3] === value[3]) {
              flag = 1
            }
          }
        })
        return flag
      })
    }
    if (check3.length) {
      tempSkillList = tempSkillList.filter(skill => {
        let flag = 0;
        check3.forEach(value => {
          if (skill?.rare === value) {
            flag = 1
          }
        })
        return flag
      })
    }
    if (isOwn) {
      tempSkillList = tempSkillList.filter(skill => {
        return mySkillList.has(skill?.id)
      })
    }
    if (check1.length || check2.length || check3.length || isOwn) {
      tempSkillList.push({
        id: 'default'
      })
    }
    if (props.needId) {
      tempSkillList = tempSkillList.reduce((list, skill) => {
        list.push(skill?.id)
        return list
      }, [])
    }
    props.onUpdate(tempSkillList)
  }
  const resetCheckbox = () => {
    setCheckedboxGroupValues({})
    setSkillChecked1([])
    setSkillChecked2([])
    props.onUpdate(allSkillList)
  }
  const changeMode = () => {
    let curValue = 1 - isOwn
    localStorage.setItem('isOwn', curValue)
    setIsOwn(curValue)
    // console.log(curValue)
    updateSkillList(filteredSkills, skillChecked1, skillChecked2, curValue)
  }
  const onSearch = (searchText) => {
    const fullSkillList = allSkillList;
    const tempSkillList = fullSkillList.filter(item => (item.name).indexOf(searchText) > -1);
    setCheckedboxGroupValues({})
    setSkillChecked1([])
    setSkillChecked2([])
    props.onUpdate(tempSkillList)
  };
  return (<>{props.checkOnly ?
    <>
      {Object.entries(options).map(([gourpName, value]) => <SkillCheckboxGroup name={gourpName} value={checkboxGroupValues[gourpName]} options={value} onChange={onCheckboxGroupsChange} />)}
      <Divider />
      <Checkbox.Group options={checkOptions1} value={skillChecked1} onChange={onChange1} />
      <Divider />
      <Checkbox.Group options={checkOptions2} value={skillChecked2} onChange={onChange2} />
    </>
    :
    <div>
      <div style={{ height: 16 }} />
      <Button type={'danger'} onClick={resetCheckbox} style={{ width: '100%' }}>{t('重置')}
      </Button>
      <Divider />
      <div>
        <Tooltip title={t("可以在支援卡页面配置")}>
          <span style={{ margin: '0 10px 0 0', lineHeight: '32px' }}>{t('显示拥有支援卡')}</span>
          <Switch checked={isOwn} onChange={changeMode} />
        </Tooltip>
      </div>
      <span style={{ margin: '0 10px 0 0', lineHeight: '32px' }}>{t('技能搜索')}</span>
      <Search placeholder={t("输入关键词")} enterButton={t("搜索")} size="middle"
        style={{ width: '100%' }} onSearch={onSearch} />
      <Divider />
      {Object.entries(options).map(([gourpName, value]) => <SkillCheckboxGroup name={gourpName} value={checkboxGroupValues[gourpName]} options={value} onChange={onCheckboxGroupsChange} />)}
      <Divider />
      <Checkbox.Group options={checkOptions1} value={skillChecked1} onChange={onChange1} />
      <Divider />
      <Checkbox.Group options={checkOptions2} value={skillChecked2} onChange={onChange2} />
    </div>}
  </>
  )
})


export { SkillList, SkillButton, SkillCheckbox, SkillDetail }
