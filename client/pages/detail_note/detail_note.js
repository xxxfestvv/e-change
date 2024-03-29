var app = getApp()
var that
const db = wx.cloud.database()
const noteCollection = db.collection('note')
const cartCollection = db.collection('cart_item')
const comCollection = db.collection('note_comment')
const recCollection = db.collection('recommend_book')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    note: [],
    noteid: '',
    notescore: '',
    comment: [],
    notescore: '',
    recommend: [],
    comhasList: false,
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
      var score = Math.round(res.data[0].score / 2);
      this.setData({
        note: res.data[0],
        notescore: score
      })
    }).catch(e => {
      console.error(e);
    });

    comCollection.where({
      note_id: options.noteid
    }).get().then(res => {
      if (res.data.length) {
        // console.log(res.data);
        this.setData({
          comment: res.data,
          comhasList: true
        })
      }
    }).catch(console.error);

    recCollection.get().then(res => {
      this.setData({
        recommend: res.data
      })
    }).catch(console.error)
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