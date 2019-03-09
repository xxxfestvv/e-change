const db = wx.cloud.database()
const myeveCollection = db.collection('my_event')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventhasList: false,
    event: [],
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    var openId = this.data.openid;

    myeveCollection.where({
      _openid: openId
    }).get().then(res => {
      // console.log(res.data);
      if(res.data.length){
        this.setData({
          event: res.data,
          eventhasList: true
        })
      }
    }).catch(e => {console.error(e)})
  },

  cancleit: function(e) {
    var noteid = e.currentTarget.dataset.id;
    myeveCollection.doc(noteid).remove().then(console.log).catch(console.error);
    this.onLoad();
  },

  eventviewdetail: function(e) {
    var eventid = e.currentTarget.dataset.eventid;
    wx.navigateTo({
      url: '../detail_event/detail_event?eventid='+eventid
    })
  }
})