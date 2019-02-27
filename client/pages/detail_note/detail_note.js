var app = getApp()
var that
const db = wx.cloud.database()
const noteCollection = db.collection('note')
const cartCollection = db.collection('cart_item')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    note: [],
    noteid: '',
    DataSource: [
      {
        isF: true,
        content: '作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介',
      }
    ]
  },

  onLoad: function (options) {
    this.setData({
      noteid: options.noteid
    });
    // console.log(this.data.noteid);
    noteCollection.where({
      _id: options.noteid
    }).get().then(res => {
      // console.log(res.data)
      this.setData({
        note: res.data[0]
      })
    }).catch(e => {
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

  gotohome: function() {
    wx.reLaunch({
      url: '../home/home'
    })
  },

  addtocar: function () {
    // var noteid = e.currentTarget.dataset.id;
    let that = this;
    let note = that.data.note;
    cartCollection.add({
      data: {
        id: note._id,
        image: note.image,
        num: 1,
        point: note.point,
        selected: true,
        title: note.title,
        type: 2
      }
    }).then(res => {
      // console.log(res);
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500,
        mask: false
      })
    }).catch(e => { console.error(e) })
  }

})