// app.js
// 初始化云开发环境
wx.cloud.init({
  env: 'test1-6gemrifqd6c55be5' // 替换为你的云开发环境ID
})
const db = wx.cloud.database();
const markers = db.collection('markers');


App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
