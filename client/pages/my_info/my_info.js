Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    scoreput: true,
    book: [],
    ask: [],
    bookhasList: false,          // 列表是否有数据
    askhasList: false,          // 列表是否有数据
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

  viewdetail: function() {
    wx.navigateTo({
      url: '../detail_book/detail_book'
    })
  },

  viewask: function() {
    wx.navigateTo({
      url: '../detail_book/detail_book'
    })
  },

  onShow: function () {
    this.setData({
      book: [
        { id: 1, title: '书名', image: '../../image/1.jpg' },
        { id: 2, title: '书名', image: '../../image/2.jpg' },
        { id: 3, title: '书名', image: '../../image/3.jpg' },
        { id: 4, title: '书名', image: '../../image/4.jpg' }
      ],
      ask: [
        { id: 1, title: '资料名' },
        { id: 2, title: '书名' },
        { id: 3, title: '书名' },
        { id: 4, title: '资料名' }
      ]
    });
    this.initialize();
  },

  initialize() {
    let book = this.data.book;
    let ask = this.data.ask;
    let hasbook = false, hasnote = false;
    let i = 0, j = 0;
    for (i = 0; i < book.length; i++) { }
    for (j = 0; j < ask.length; j++) { }

    if (i != 0) hasbook = true;
    if (j != 0) hasnote = true;

    this.setData({                                // 最后赋值到data中渲染到页面
      bookhasList: hasbook,
      askhasList: hasnote,
      book: book,
      ask: ask
    });
  }
})