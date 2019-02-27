const db = wx.cloud.database()
const eventCollection = db.collection('event')
const bookCollection = db.collection('booklist')
const noteCollection = db.collection('note')

Page({
  data: {
    event: [],
    searchValue: '',
    currentData: 0,
    book: [],
    note: [],
    bookhasList: false, // 列表是否有数据
    notehasList: false, // 列表是否有数据
  },

  // 搜索页面跳回
  onLoad: function(options) {
    if (options && options.searchValue) {
      this.setData({
        searchValue: "搜索：" + options.searchValue
      });
    }
    //获取event
    eventCollection.get().then(res => {
      // console.log(res);
      this.setData({
        event: res.data
      })
    }).catch(e => {
      console.error(e)
    });

    bookCollection.skip(28).limit(10).get().then(res => {
      this.setData({
        book: res.data,
        bookhasList: true
      })
    }).catch(e => {
      console.error(e)
    });

    noteCollection.skip(5).limit(10).get().then(res => {
      this.setData({
        note: res.data,
        notehasList: true
      })
    }).catch(e => {
      console.error(e)
    });


  },

  // 搜索入口  
  wxSearchTab: function() {
    wx.navigateTo({
      url: '../search_book/search_book'
    })
  },

  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
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
  click_book: function(e) {
    var bookid = e.currentTarget.dataset.bookid;
    wx.redirectTo({
      url: '../detail_book/detail_book?bookid=' + bookid
    })
  },

  click_note: function(e) {
    var noteid = e.currentTarget.dataset.noteid;
    wx.redirectTo({
      url: '../detail_note/detail_note?noteid=' + noteid
    })
  }
})