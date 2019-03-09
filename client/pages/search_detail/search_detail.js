const db = wx.cloud.database()
const bookCollection = db.collection('booklist')
const noteCollection = db.collection('note')
const carCollection = db.collection('cart_item')
const askCollection = db.collection('ask_book')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    note: [],
    bookhasList: false, // 列表是否有数据
    notehasList: false, // 列表是否有数据
    currentData: 0,
    bookput: true,
    isbn:''
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var searchvalue = options.searchValue;

    bookCollection.where({
      title: db.RegExp({
        regexp: searchvalue,
        options: 'i',
      })
    }).get().then(res => {
      if(res.data.length){
        this.setData({
          book: res.data,
          bookhasList: true
        })
      }
    }).catch(e => {
      console.error(e)
    });

    noteCollection.where({
      title: db.RegExp({
        regexp: searchvalue,
        options: 'i',
      })
    }).get().then(res => {
      if(res.data.length){
        this.setData({
          note: res.data,
          notehasList: true
        })
      }
    }).catch(e => {
      console.error(e)
    });

  },

  //笔记详情
  noteviewdetail: function(e) {
    var noteid = e.currentTarget.dataset.noteid;
    wx.navigateTo({
      url: '../detail_note/detail_note?noteid=' + noteid
    })
  },

  //书详情
  bookviewdetail: function(e) {
    var bookid = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../detail_book/detail_book?bookid=' + bookid
    })
  },

  //书弹窗
  findbook: function() {
    this.setData({
      bookput: !this.data.bookput
    })
  },

  //取消按钮
  bookcancel: function() {
    this.setData({
      bookput: true
    })
  },

  //确认
  bookconfirm: function() {
    var that = this;
    askCollection.add({
      data:{
        isbn: that.data.isbn
      }
    }).then(res => {
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 2000
      })
    }).catch(console.error)
    this.setData({
      bookput: true
    })
  },

  bookaddtocar: function(e) {
    var bookid = e.currentTarget.dataset.bookid;

    bookCollection.where({
      _id:bookid
    }).get().then(res => {
      // console.log(res.data[0]);
      carCollection.add({
        data: {
          id:bookid,
          image:res.data[0].image,
          num: 1,
          point:res.data[0].point,
          selected:true,
          title:res.data[0].title,
          type:1
      }
      }).then(console.log).catch(console.error);
    }).catch(e => {console.error(e)});

    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500,
      mask: false
    })
  },

  noteaddtocar: function (e) {
    var noteid = e.currentTarget.dataset.noteid;

    noteCollection.where({
      _id: noteid
    }).get().then(res => {
      // console.log(res.data[0]);
      carCollection.add({
        data: {
          id: noteid,
          image: res.data[0].image,
          num: 1,
          point: res.data[0].point,
          selected: true,
          title: res.data[0].title,
          type: 2
        }
      }).then(console.log).catch(console.error);
    }).catch(e => { console.error(e) });

    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500,
      mask: false
    })
  },

  getisbn: function(e) {
    var isbn = e.detail.value;
    this.setData({
      isbn: isbn
    })
  }

})