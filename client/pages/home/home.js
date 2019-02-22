Page({
  data: {
    searchValue: '',
    currentData: 0,
    book: [],
    note: [],
    bookhasList: false,          // 列表是否有数据
    notehasList: false,          // 列表是否有数据
  },

  // 搜索页面跳回
  onLoad: function (options) {
    if (options && options.searchValue) {
      this.setData({
        searchValue: "搜索：" + options.searchValue
      });
    }
  },

  // 搜索入口  
  wxSearchTab: function () {
    wx.navigateTo({
      url: '../search_book/search_book'
    })
  },

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  //点击图片跳转详情页
  click_book: function () {
    wx.redirectTo({
      url: '../detail_book/detail_book'
    })
  },

  click_note: function () {
    wx.redirectTo({
      url: '../detail_note/detail_note'
    })
  },

  onShow: function () {
    this.setData({
      book: [
        { id: 1, title: '书名', writer: '作者', image: '../../image/1.jpg', price: 2},
        { id: 2, title: '书名', writer: '作者', image: '../../image/2.jpg', price: 4},
        { id: 4, title: '书名', writer: '作者', image: '../../image/3.jpg', price: 4},
        { id: 3, title: '书名', writer: '作者', image: '../../image/4.jpg', price: 4}
      ],
      note: [
        { id: 1, title: '资料名', writer: '提供者', image: '../../image/1.jpg', price: 2 },
        { id: 2, title: '资料名', writer: '提供者', image: '../../image/2.jpg', price: 4 },
        { id: 4, title: '资料名', writer: '提供者', image: '../../image/3.jpg', price: 4 },
        { id: 3, title: '资料名', writer: '提供者', image: '../../image/4.jpg', price: 4 }
      ]
    });
    this.initialize();
  },
  
  initialize() {
    let book = this.data.book;
    let note = this.data.note;
    let hasbook = false, hasnote = false;
    let i = 0, j = 0;
    for (i = 0; i < book.length; i++) {    }
    for (j = 0; j < note.length; j++) {    }

    if (i != 0) hasbook = true;
    if (j != 0) hasnote = true;

    this.setData({                                // 最后赋值到data中渲染到页面
      bookhasList: hasbook,
      notehasList: hasnote,
      book: book,
      note: note
    });
  }
})