import React,{useState} from 'react';
import db from '../db.js'

import { List,Drawer,Button } from 'antd';
import t from './t.js'

const BuffButton = (props)=>{
  const [visible, setVisible] = useState(false);
  const buffs = db.get('buffs').value()
  const showDrawer = ()=>{
    setVisible(true)
  }
  const onDrawerClose = (data)=>{
    setVisible(false)
  }
  return(
    <>
      <Button onClick={showDrawer}>
        buff查询
      </Button>
      <Drawer
        title="buff解释"
        onClose={onDrawerClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
        closable={true}
        placement="left"
        mask={true}
        maskClosable={true}
        width={'95%'}
      >
        <List itemLayout="horizontal"  grid={{ gutter: 16, column: 4 }} dataSource={buffs}
      renderItem={item=>
        <List.Item>
          <List.Item.Meta title={item.name} description={item.describe} />
        </List.Item>
      } />
      </Drawer>
    </>
  )
}

export {BuffButton}
