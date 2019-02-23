const db = wx.cloud.database();
const myaskCollection = db.collection('ask_book');
const bookCollection = db.collection('booklist');

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

  viewdetail: function(e) {
    var bookid = e.currentTarget.dataset.bookid;
    // console.log(bookid);
    wx.navigateTo({
      url: '../detail_book/detail_book?bookid='+bookid
    })
  },

  viewask: function() {
    wx.navigateTo({
      url: '../detail_book/detail_book'
    })
  },

  onLoad: function(options) {
    //获得当前openid缓存
    try {
      const value = wx.getStorageSync('openid')
      if (value) {
        this.setData({
          openid: value
        })
      }
    } catch (e) {
      console.error(e)
    }
    var book1 = [];
    var ask1 = [];
    var openId = this.data.openid;

    //求书
    myaskCollection.where({
      _openid: openId
    }).get().then(res1 => {
      // console.log(res1.data);
      for (var i = 0; i < res1.data.length; i++) {
        bookCollection.where({
          isbn: res1.data[i].isbn
        }).get().then(res2 => {
          // console.log(res2.data[0]);
          book1 = book1.concat(res2.data[0]); //连接数组
          this.setData({
            book: book1,
            bookhasList: true
          })
        }).catch(e => {
          console.error(e)
        });
      }

    }).catch(e => {
      console.error(e)
    });

  }

  
})