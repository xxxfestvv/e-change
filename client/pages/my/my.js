const db = wx.cloud.database()
const myinfoCollection = db.collection('my_info')
const mynoteCollection = db.collection('my_note')
const changeCollection = db.collection('book_changed')
const notelistCollection = db.collection('note')
const mypointCollection = db.collection('my_point')
const bookcomCollection = db.collection('book_comment')
const notecomCollection = db.collection('note_comment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comtext: '',
    type: '',
    bookid: '',
    noteid: '',
    openid: '',
    currentData: 0,
    scoreput: true,
    point: 0,
    flag: 5,
    book: [],
    note: [],
    bookhasList: false, // 列表是否有数据
    notehasList: false
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

  inputtext: function(e) {
    this.data.comtext = e.detail.value;
  },

  scoreinput: function(e) {
    var type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        bookid: e.currentTarget.dataset.bookid
      })
    } else if (type == 2) {
      this.setData({
        noteid: e.currentTarget.dataset.noteid
      })
    }
    this.setData({
      scoreput: !this.data.scoreput,
      type: type
    })

  },

  //取消按钮

  scorecancel: function() {

    this.setData({

      scoreput: true

    })

  },

  //确认评分

  scoreconfirm: function() {
    var that = this;
    var type = that.data.type;

    if (type == 1) {
      bookcomCollection.add({
        data: {
          // _openid: that.data.openid,
          bookid: that.data.bookid,
          com_text: that.data.comtext,
          score: that.data.flag,
        }
      }).then().catch(e => {
        console.error(e)
      });
    } else if (type == 2) {
      notecomCollection.add({
        data: {
          // _openid: that.data.openid,
          note_id: that.data.noteid,
          com_text: that.data.comtext,
          score: that.data.flag,
        }
      }).then().catch(e => {
        console.error(e)
      });
    }

    wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1500,
        mask: false,
        success: function() {
          that.setData({
            comtext: '',
            flag: 5,
            noteid: '',
            bookid: '',
            type: ''
          })
        }
      }),

      this.setData({
        scoreput: true
      })

  },

  changeColor1: function() {
    var that = this;
    that.setData({
      flag: 1
    });
  },

  changeColor2: function() {
    var that = this;
    that.setData({
      flag: 2
    });
  },

  changeColor3: function() {
    var that = this;
    that.setData({
      flag: 3
    });
  },

  changeColor4: function() {
    var that = this;
    that.setData({
      flag: 4
    });
  },

  changeColor5: function() {
    var that = this;
    that.setData({
      flag: 5
    });
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
    var note2 = [];
    var openId = this.data.openid;
    //查找对应用户的书架
    changeCollection.where({
      asker_id: openId,
      state: 4
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

    //查找对应用户的资料
    mynoteCollection.where({
      _openid: openId
    }).get().then(res1 => {

      for (var i = 0; i < res1.data.length; i++) {
        notelistCollection.where({
          _id: res1.data[i].note_id
        }).get().then(res2 => {
          //console.log(res2.data[0]);
          note2 = note2.concat(res2.data[0]); //连接数组
          this.setData({
            note: note2
          })
        }).catch(e => {
          console.error(e)
        });
      }

      this.setData({
        notehasList: true
      })

    }).catch(e => {
      console.error(e)
    });

    //查找用户积分
    mypointCollection.where({
      _openid: openId
    }).get().then(res => {
      // console.log(res.data[0].point);
      this.setData({
        point: res.data[0].point
      })
    })


  },



  getInfo: function(result) {
    var openId = this.data.openid;

    myinfoCollection.where({
      _openid: openId
    }).count().then(res => {
      if (res.total == 0) {
        myinfoCollection.add({
          data: result.detail.userInfo
        }).then().catch(err => {
          console.error(err)
        })
      }
    });

    mypointCollection.where({
      _openid: openId
    }).count().then(res => {
      if (res.total == 0) {
        mypointCollection.add({
          data: {
            point: 18
          }
        }).then().catch(err => {
          console.error(err)
        })
      }
    });


  }

})