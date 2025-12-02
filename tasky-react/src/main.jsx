// 项目的入口 从这里开始运行

// react 必要的两个核心包
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 导入项目的根组件
import App from './App.jsx'

// 把App根组件渲染到id为root的dom节点上
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
