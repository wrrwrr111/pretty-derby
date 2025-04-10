import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Steps,
  // Hints
} from 'intro.js-react';
import 'intro.js/introjs.css';
const IntroIndex = (props) => {
  const introV = '0.0.1'
  const [stepsEnabled, setStepsEnabled] = useState(localStorage.getItem('introV') !== introV);
  const initialStep = 0;
  const steps = [
    {
      title: '角色信息',
      element: '.menu-player',
      intro: <>
        <p>点击查看详情</p>
      </>,
      href: '/'
    }, {
      title: '支援卡信息',
      element: '.menu-support',
      intro: <>
        <p>点击查看详情</p>
        <p>通过育成效果筛选</p>
        <p>【切换显示模式】切换全部、已拥有</p>
        <p>【配置卡组】选择拥有的辅助卡，技能页面筛选拥有的技能</p>
      </>,
      href: '/support'
    }, {
      title: '技能信息',
      element: '.menu-skill',
      intro: <>
        <p>鼠标悬浮查看详情</p>
        <p>通过条件和类型进行筛选</p>
        <p>【显示拥有支援卡】切换是否显示全部、已拥有</p>
        <p>点击技能可以查看拥有该技能的角色和支援卡</p>
      </>,
      href: '/skill'
    }, {
      title: '比赛信息',
      element: '.menu-race',
      intro: <>
        <p>通过条件筛选</p>
      </>,
      href: '/race'
    }, {
      title: '育成辅助页面',
      element: '.menu-nurturing2',
      intro: <>
        <p>【选择马娘】选择培训的马娘</p>
        <p>【选择支援卡】选择使用的支援卡</p>
        <p>【卡组】卡组保存、读取、删除</p>
      </>,
      href: '/nurturing2'
    }, {
      title: '种马和支援卡分享',
      element: '.menu-seed',
      intro: <>
        <p>通过条件搜索种马和支援卡信息</p>
        <p>【配置种子】添加自己的种马和支援卡信息分享</p>
      </>,
      href: '/seed'
    }, {
      title: '初始化育成',
      element: '.reset-nur',
      intro: <>
        <p>育成页面出现问题时点击修复</p>
        <p>会清空卡组！！！</p>
      </>,
    }, {
      title: '重置引导',
      element: '.reset-intro',
      intro: <>
        <p>点击后刷新重新观看引导</p>
      </>,
    }]

  const onExit = () => {
    localStorage.setItem('introV', introV)
    setStepsEnabled(false)
  }
  const onBeforeChange = (nextStepIndex) => {
    steps[nextStepIndex].href && props.history.push(steps[nextStepIndex].href)
  }
  const onComplete = () => {
    localStorage.setItem('introV', introV)
    setStepsEnabled(false)
  }
  return (
    <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
      onBeforeChange={onBeforeChange}
      onComplete={onComplete}
      options={{
        doneLabel: 'Done'
      }}
    />
  )
}
export default withRouter(IntroIndex)
