import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import dbL from '../dbL.js'
import { Popover } from 'antd';
import t from './t.js';

const LanButton = (props) => {
  let lan = dbL.get('lan').value()
  const [code, setCode] = useState(lan || 'cn')
  console.log(code)
  const changeToCn = () => {
    lan = 'cn'
    dbL.set('lan', 'cn').write()
    setCode('cn')
    t('', 'cn')
    window.location.reload(true)
  }
  const changeToUs = () => {
    lan = 'us'
    dbL.set('lan', 'us').write()
    setCode('us')
    t('', 'us')
    window.location.reload(true)
  }
  const changeToJp = () => {
    lan = 'jp'
    dbL.set('lan', 'jp').write()
    setCode('jp')
    t('', 'jp')
    window.location.reload(true)
  }
  const flagStyle = {
    width: 40,
    height: 30,
    margin: 4
  }
  return (
    <Popover content={
      <div style={{ display: 'flex' }}>
        <span onClick={changeToCn} code={'cn'} style={{ ...flagStyle }}>cn</span>
        <span onClick={changeToUs} code={'us'} style={{ ...flagStyle }}>us</span>
        <span onClick={changeToJp} code={'jp'} style={{ ...flagStyle }}>jp</span>
      </div>}>
      <span code={code} style={{ ...flagStyle }}>{code}</span>
    </Popover>
  )
}

export default withRouter(LanButton)
