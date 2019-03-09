var app = getApp()
var that
const db = wx.cloud.database()
const eventCollection = db.collection('event')
const myeventCollection = db.collection('my_event')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    event: [],
    eventid: '',
    DataSource: [
      {
        isF: true,
        content: '作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介',
      }
    ]
  },

  onLoad: function (options) {
    this.setData({
      eventid: options.eventid
    });
    // console.log(this.data.bookid);
    eventCollection.where({
      _id: options.eventid
    }).get().then(res => {
      // console.log(res.data)
      this.setData({
        event: res.data[0]
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
    // console.log("**********:" + row)
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

  addtoevent: function (e) {

    let that = this;
    let event = that.data.event;
    var eventid = that.data.eventid;
    myeventCollection.add({
      data: {
        id: eventid,
        image: event.image,
        title: event.title
      }
    }).then(res => {
      // console.log(res);
      wx.showToast({
        title: '已加入我的活动',
        icon: 'success',
        duration: 1500,
        mask: false
      })
    }).catch(e => { console.error(e) })

  }

})