const markers = [
  { id: 1, name: '标记1', description: '这是标记1的详细信息。' },
  { id: 2, name: '标记2', description: '这是标记2的详细信息。' }
];
Page({
  data: {
    marker: {}
  },

  onLoad(options) {
    const { id } = options;
    // parseInt(id) 是将字符串类型的 id 转换为整数类型
    const marker = markers.find(m => m.id === parseInt(id));
    this.setData({ marker });
  }
});
