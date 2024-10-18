Page({
  data: {
    query: '', // 用于存储用户在搜索框中输入的内容
    results: [], // 用于存储搜索结果
    markers: [
      { id: 1, title: '标记1', latitude: 22.543099, longitude: 113.921736 },
      { id: 2, title: '标记2', latitude: 22.54286, longitude: 114.059563 }
    ]
  },

  // 绑定输入框变化
  onInput(e) {
    this.setData({ query: e.detail.value });// 获取输入的内容并存入 data 中的 query
  },

  // 执行搜索逻辑
  onSearch() {
    // trim()去除空格
    const query = this.data.query.trim();
    if (!query) return;
    // filter() 遍历this对象的markers数据，并存储到result中
    const results = this.data.markers.filter(item =>
      item.title.includes(query)
    );
      
    this.setData({ results });
  }
});
