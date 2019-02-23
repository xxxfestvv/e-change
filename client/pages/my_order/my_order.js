const db = wx.cloud.database();
const changeCollection = db.collection('book_changed');
const mynoteCollection = db.collection('my_note');
const booklistCollection = db.collection('booklist');
const notelistCollection = db.collection('note');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    openid: '',
    currentData: 0,
    scoreput: true,
    book: [],
    note: [],
    bookhasList: false, // 列表是否有数据
    notehasList: false, // 列表是否有数据
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

  scoreinput: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    this.setData({
      scoreput: !this.data.scoreput,
      id:id
    })

  },

  //取消按钮

  scorecancel: function() {

    this.setData({

      scoreput: true

    })

  },

  //确认

  scoreconfirm: function() {
    var that = this;
    wx.cloud.callFunction({
      name: 'updateReceive',
      data: {
        openid: that.data.openid, //当前用户openid
        id: that.data.id, //changebook的id,booklist的_id
      },
    }).then(res => {
      console.log(res.result);
      that.onLoad()
    }).catch(console.error);

    this.setData({
      scoreput: true
    })

  },

  onLoad: function(options) {
    const _ = db.command
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
    var tmp1 = [];
    var openId = this.data.openid;

    //查找书
    changeCollection.where({
      asker_id: openId,
      state: _.neq(4)
    }).get().then(res1 => {
      if (res1.data.length) {
        this.setData({
          bookhasList: true
        })
      }
      this.setData({
        book: res1.data
      });
    }).catch(e => {
      console.error(e)
    });

    var tmp2 = [];
    //查找资料
    mynoteCollection.where({
      _openid: openId
    }).get().then(res1 => {
      // console.log(res1.data);
      if (res1.data.length) {
        this.setData({
          notehasList: true
        })
      }

      for (var i = 0; i < res1.data.length; i++) {

        notelistCollection.where({
          _id: res1.data[i].note_id
        }).get().then(res2 => {
          //  console.log(res2.data);
          tmp2 = tmp2.concat(res2.data[0]);
          //  console.log(tmp2);
          this.setData({
            note: tmp2
          })
        }).catch(e => {
          console.error(e)
        });

      }
    }).catch(e => {
      console.error(e)
    });
  },

  downloadfile: function(e) {
    var goodsId = e.currentTarget.dataset.id;
    var link = e.currentTarget.dataset.link;
    wx.showModal({
      title: '资料下载',
      content: link,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  }

})