// 引入腾讯地图SDK
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'B6LBZ-H5C6Q-ARC5A-4C3AG-PWCTZ-L4BM5'  // 在此处填入刚才获取的密钥
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
    longitude: 113.972976	, // 初始地图中心经度
    latitude: 22.591792, // 初始地图中心纬度
    markers: []
  },

  onLoad() {
    // 页面加载时获取用户地理位置
    this.getUserLocation(); 
    this.loadMarkers(); // 页面加载时调用加载标记点的方法
  },
  // 加载标记点
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