import React,{useState} from 'react';
import db from './db.js'

import { Table } from 'antd';

const {Column,ColumnGroup} = Table
 // { name: '葵ステークス',
  //   date: '2年目 5月後半',
  //   dateNum: 34,
  //   class: 'クラシック',
  //   grade: 'G3',
  //   place: '京都',
  //   ground: '芝',

  //   distance: '1400',
  //   distanceType: '短距離',
  //   order: '右' }
  // { class: [ 'ジュニア', 'クラシック', 'クラシックシニア', 'シニア' ],
  // grade: [ 'OP', 'G3', 'Pre-OP', 'G2', 'G1' ],
  // place: [ '中京', '函館', '札幌', '小倉', '新潟', '阪神', '中山', '京都', '東京', '福島', '大井' ],
  // ground: [ '芝', 'ダート' ],
  // distanceType: [ 'マイル', '短距離', '中距離', '長距離' ],
  // direction: [ '左', '右', '直' ],
  // side: [ null, '内', '外', '線' ] }
 const filterList= { class:
    [ { text: '初等/ジュニア', value: 'ジュニア' },
      { text: '经典/クラシック', value: 'クラシック' },
      { text: '经典&高级/クラシックシニア', value: 'クラシックシニア' },
      { text: '高级/シニア', value: 'シニア' } ],
   grade:
   [
      { text: 'Pre-OP', value: 'Pre-OP' },
      { text: 'OP', value: 'OP' },
      { text: 'G1', value: 'G1' },
      { text: 'G2', value: 'G2' },
      { text: 'G3', value: 'G3' }
    ],
   place:
    [ { text: '中京', value: '中京' },
      { text: '函館', value: '函館' },
      { text: '札幌', value: '札幌' },
      { text: '小倉', value: '小倉' },
      { text: '新潟', value: '新潟' },
      { text: '阪神', value: '阪神' },
      { text: '中山', value: '中山' },
      { text: '京都', value: '京都' },
      { text: '東京', value: '東京' },
      { text: '福島', value: '福島' },
      { text: '大井', value: '大井' } ],
   ground: [ { text: '芝', value: '芝' }, { text: 'ダート', value: 'ダート' } ],
   distanceType:
   [
     { text: '短距離', value: '短距離' },
     { text: 'マイル', value: 'マイル' },
      { text: '中距離', value: '中距離' },
      { text: '長距離', value: '長距離' } ],
   direction:
    [ { text: '左', value: '左' },
      { text: '右', value: '右' },
      { text: '直', value: '直' } ],
   side:
    [ { text: '空', value: null },
      { text: '内', value: '内' },
      { text: '外', value: '外' },
      { text: '線', value: '線' } ] }
  const labels = ["name", "date", "class", "grade",
                  "place", "ground", "distance",
                  "distanceType", "direction", "side"]
  const columns = labels.map(label=> {
    if(filterList['class']){
      return {
        title:label,
        dataIndex:label,
        filters:filterList[label],
        onFilter: (value, record) => record[label] === value,
      }
    }else{
      return{
        title:label,
        dataIndex:label
      }
    }
  })

  const Race = (props) =>{
    const allRaceList = db.get('races').value().map((race,index)=>{
                      race.key=index
                      return race
                    })
    const [selectedRowKeys,setSelectedRowKeys] = useState([])
    // const columns = [{title:'',dataIndex:'',key:''}]
    const onSelectChange = (selectedRowKeys,selectedRows)=>{
      props.onSelect(selectedRows)
      setSelectedRowKeys(selectedRowKeys)
    }
    const rowSelection = {
      selectedRowKeys,
      onChange:onSelectChange
    }
    // 筛选发生变化时清空已经选择的内容
    const onChange = (pagination, filters, sorter, extra) => {
      props.onSelect([])
      setSelectedRowKeys([])
    }
    return(
      <Table rowSelection={rowSelection} columns={columns} dataSource={allRaceList} onChange={onChange} pagination={false}/>
      )
  }

export  default Race
