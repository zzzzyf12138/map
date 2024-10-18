const markers = [
  {
    id: 1,
    latitude: 22.543099,
    longitude: 114.057868,
    title: '标记1',
    iconPath: '/resources/marker.png',
    width: 30,
    height: 30
  },
  {
    id: 2,
    latitude: 22.54286,
    longitude: 114.059563,
    title: '标记2',
    iconPath: '/resources/marker.png',
    width: 30,
    height: 30
  }
  // 继续添加更多标注
];

function getMarkers() {
  return markers;
}

module.exports = {
  getMarkers
};
