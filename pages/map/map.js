// 引入腾讯地图SDK
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'B6LBZ-H5C6Q-ARC5A-4C3AG-PWCTZ-L4BM5'  
});
qqmapsdk.reverseGeocoder({
  location: { latitude: 22.591792, longitude: 113.972976 },
  success: (res) => {
    console.log('腾讯地图API调用成功:', res);
  },
  fail: (error) => {
    console.error('腾讯地图API调用失败:', error);
  }
});
wx.cloud.init({
  env: 'test1-6gemrifqd6c55be5'
})
// 链接数据库
const db = wx.cloud.database();
// 将 collection 提取到全局
const markersCollection = db.collection('markers');

Page({
  data: {
    mapLayerId: '671791c94409', // 自定义图层 ID
    longitude: 113.972976	, // 初始地图中心经度
    latitude: 22.591792, // 初始地图中心纬度
    markers: []
  },

  onLoad() {
    this.mapCtx = wx.createMapContext('myMap'); // 获取地图上下文
    // 添加图片覆盖层
    this.addImageOverlay();
    // 页面加载时获取用户地理位置
    this.getUserLocation(); 
    // 页面加载时调用加载标记点的方法
    this.loadMarkers(); 
  },
  // 添加图片覆盖层
  addImageOverlay() {
    this.mapCtx.addGroundOverlay({
      id: 1,  // 图层ID
      src: '../../utils/resources/手绘地图.png',  // 手绘地图的图片路径
      bounds: {
        // 左下角
        southwest: { latitude: 22.5887, longitude: 113.9652 },
        // 右上角
        northeast: { latitude: 22.5945,  longitude: 113.9745}
      },
      opacity: 0.8,  // 设置透明度，根据需求调整
      success: (res) => {
        console.log('地图图片覆盖层添加成功:', res);
      },
      fail: (e) => {
        console.error('地图图片覆盖层添加失败:', e);
      }
    });
  },
  loadMarkers() {
    const that = this;
    markersCollection.get().then(res => {
      console.log('Markers from DB:', res.data);
      const markers = res.data.map(marker => ({
        id: marker.id,
        latitude: marker.latitude,
        longitude: marker.longitude,
        iconPath: marker.iconPath , // 使用默认图标路径
        width: marker.width || 30,
        height: marker.height || 30
      }));

      that.setData({
        markers // 更新页面数据中的标记点
      });
    }).catch(err => {
      console.error('获取标记点失败:', err);
    });
  },

  // 获取用户位置
  getUserLocation() {
    const that = this;
    // wx.getLocation() 获取用户当前位置
    wx.getLocation({
      type: 'gcj02', // 腾讯地图支持的坐标系
      success(res) {
        console.log('用户当前位置:', res);
        const { latitude, longitude } = res;

        // 将用户当前位置作为新的标注点加入 markers 数组
        const userMarker = {
          id: 0,
          latitude,
          longitude,
          iconPath: '../../utils/resources/marker.png', // 用户位置标注图标
          width: 50,
          height: 50
        };

        // 更新 markers 数组，并设置地图中心为用户当前位置
        that.setData({
          latitude,
          longitude,
          markers: [...that.data.markers, userMarker]
        });
      },
      fail(err) {
        console.error('获取地理位置失败:', err);
        wx.showModal({
          title: '提示',
          content: '无法获取地理位置，请检查权限设置。',
          showCancel: false
        });
      }
    });
  },

  // 处理点击标记事件
  onMarkerTap(e) {
    const markerId = e.markerId; // 获取点击的标注的ID
    wx.navigateTo({
      url: `/pages/detail/detail?id=${markerId}` // 跳转到详细页面，并传递ID参数
    });
  },

  // 搜索按钮的事件处理函数
  goToSearchPage() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  }
  
});