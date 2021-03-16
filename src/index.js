import React from 'react';
import ReactDOM from 'react-dom';
// import { UserAgentProvider, UserAgent, withUserAgent } from 'react-ua';

import './index.css'

// import db from './db.js'
// import EventList from './components/event-list.js'
// import SkillList from './components/skill-list.js'

import AppPc from './app-pc'
import AppMo from './app-mo'
// 取得ua
let ua = {}
const ie_upto10 = /MSIE \d/.test(navigator.userAgent)
const ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
const ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent)
ua.mac = /Mac/.test(navigator.platform)
let ie = ua.ie = !!(ie_upto10 || ie_11up || ie_edge)
ua.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null
ua.gecko = !ie && /gecko\/(\d+)/i.test(navigator.userAgent)
ua.gecko_version = ua.gecko && +(/Firefox\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
let chrome = !ie && /Chrome\/(\d+)/.exec(navigator.userAgent)
ua.chrome = !!chrome
ua.chrome_version = chrome && +chrome[1]
// Is true for both iOS and iPadOS for convenience
ua.safari = !ie && /Apple Computer/.test(navigator.vendor)
ua.ios = ua.safari && (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2)
ua.android = /Android \d/.test(navigator.userAgent)
ua.webkit = "webkitFontSmoothing" in document.documentElement.style
ua.webkit_version = ua.webkit && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
console.log(ua)

// const cdnServer = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'
// https://purge.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/dbd.json
// https://purge.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/db.json

// https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/raw/master/public/img/players/0uJ0iropRbr.png

const App = ()=>{
  return(
    <>
    {ua.android||ua.ios?<AppMo></AppMo>:<AppPc></AppPc>}
    </>
  )
}

ReactDOM.render((<App></App>),document.getElementById('root'),);
