const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'B6LBZ-H5C6Q-ARC5A-4C3AG-PWCTZ-L4BM5'  // 在此处填入刚才获取的密钥
});
wx.cloud.init({
  env: 'test1-6gemrifqd6c55be5'  // 云开发环境 ID
});
const db = wx.cloud.database();  // 初始化数据库
const markersCollection = db.collection('markers');  // 指定 markers 集合

Page({
  data: {
    marker: {}
  },
  // 跳转到该页面时传递的参数（这里传递了 id）
  onLoad(options) {
    const { id } = options;
    this.getMarkerDetails(id);  // 调用函数获取标记点详情
  },
  // 从云端数据库查询标记点详情
  getMarkerDetails(id) {
    // 筛选 id 与传入的 id 相同的记录
    // parseInt() 将 id 转换为整数类型
    markersCollection
      .where({ id: parseInt(id) })  // 查询指定 ID 的标记点
      .get()
      .then(res => {
        if (res.data.length > 0) {
          // 将第一个匹配的数据对象存储在 marker 中，更新页面数据
          this.setData({ marker: res.data[0] });  // 更新页面数据
        } else {
          wx.showToast({ title: '未找到该标记点', icon: 'none' });
        }
      })
      .catch(err => {
        console.error('获取标记点详情失败:', err);
        wx.showToast({ title: '获取数据失败', icon: 'none' });
      });
  },
   // 导航功能
  startNavigation() {
    const { latitude, longitude, name } = this.data.marker;  // 获取标记点的经纬度

    // 调用腾讯地图的导航功能
    wx.openLocation({
      latitude: parseFloat(latitude),  // 转换为浮点数
      longitude: parseFloat(longitude),
      name: name,  // 目标地点名称
      scale: 16
    });
  }
});
