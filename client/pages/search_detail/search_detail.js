Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    book: [],
    note: [],
    bookhasList: false,          // 列表是否有数据
    notehasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    totalBook: 0,
    currentData: 0,
    bookput: true,
    noteput: true
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchValue: options.searchValue
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      carts: [
        { id: 1, title: '书名', writer: '作者', image: '../../image/1.jpg', price: 2, type: 1 },
        { id: 2, title: '书名', writer: '作者', image: '../../image/2.jpg', price: 4, type: 1 },
        { id: 4, title: '书名', writer: '作者', image: '../../image/3.jpg', price: 4, type: 1 },
        { id: 3, title: '资料名', writer: '提供者', image: '../../image/4.jpg', price: 4, type: 2 }
      ]
    });
    this.initialize();
  },

  //初始化列表
  initialize() {
    let carts = this.data.carts;
    let book = [];
    let note = [];
    let k=0, l=0; let hasbook = false, hasnote = false;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].type==1){
        book[k] = carts[i];
        k++;
      }
      else if(carts[i].type==2){
        note[l] = carts[i];
        l++;
      }
    }

    if(k!=0) hasbook=true;
    if(l!=0) hasnote=true;

    this.setData({                                // 最后赋值到data中渲染到页面
      bookhasList: hasbook,
      notehasList: hasnote,
      carts: carts,
      book: book,
      note: note
    });
  },

  //笔记详情
  noteviewdetail: function() {
    wx.navigateTo({
      url: '../detail_note/detail_note'
    })
  },

  //书详情
  bookviewdetail: function() {
    wx.navigateTo({
      url: '../detail_book/detail_book'
    })
  },

  //书弹窗
  findbook: function () {
    this.setData({
      bookput: !this.data.bookput
    })
  },

  //取消按钮
  bookcancel: function () {
    this.setData({
      bookput: true
    })
  },

  //确认
  bookconfirm: function () {
    this.setData({
      bookput: true
    })
  },

  //笔记弹窗
  findnote: function () {
    this.setData({
      noteput: !this.data.noteput
    })
  },

  //取消按钮
  notecancel: function () {
    this.setData({
      noteput: true
    })
  },

  //确认
  noteconfirm: function () {
    this.setData({
      noteput: true
    })
  },

  addtocar: function () {
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500,
      mask: false
    })
  }

})