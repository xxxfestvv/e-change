var app = getApp()
var that
const db = wx.cloud.database()
const noteCollection = db.collection('note')
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
    console.log(this.data.noteid);
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
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500,
      mask: false
    })
  }

})