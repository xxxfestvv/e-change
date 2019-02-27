var app = getApp()
var that
const db = wx.cloud.database()
const bookCollection = db.collection('booklist')
const cartCollection = db.collection('cart_item')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    book:[],
    bookid:'',
    DataSource: [
      {
        isF: true,
        content: '作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介',
      }
    ]
  },

  onLoad: function(options) {
    this.setData({
      bookid: options.bookid
    });
    // console.log(this.data.bookid);
    bookCollection.where({
      _id: options.bookid
    }).get().then(res => {
      // console.log(res.data)
      this.setData({
        book: res.data[0]
      })
    }).catch(e=>{
      console.error(e);
    });
  },

  //展开  收起
  change: function (e) {
    var that = this;
    var DataSource = that.data.DataSource;
    var row = DataSource[e.currentTarget.dataset.index];
    console.log("**********:" + row)
    row.isF = !row.isF;
    that.setData({
      DataSource: DataSource,
    })
  },

  gotohome: function () {
    wx.reLaunch({
      url: '../home/home'
    })
  },

  addtocar: function (e) {
    var bookid = e.currentTarget.dataset.id;
    let that = this;
    let book = that.data.book;
    cartCollection.add({
      data: {
        id: book._id,
        image: book.image,
        num: 1,
        point: book.point,
        selected: true,
        title: book.title,
        type: 1
      }
    }).then (res => {
      console.log(res);
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500,
        mask: false
      })
    }).catch(e => {console.error(e)})


    
  }

})