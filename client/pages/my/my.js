const db = wx.cloud.database();
const myinfoCollection = db.collection('my_info');
const mybookCollection = db.collection('my_book');
const mynoteCollection = db.collection('my_note');
const booklistCollection = db.collection('booklist');
const notelistCollection = db.collection('note');
const mypointCollection = db.collection('my_point');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  scoreinput: function() {

    this.setData({

      scoreput: !this.data.scoreput

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
    wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1500,
        mask: false,
        success: function() {
          that.setData({
            flag: 5
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

  onLoad: function (options) {
    var book1 = [];
    var note2 = [];
    var openId;
    wx.cloud.callFunction({
      name: 'getUserInfo',
      complete: res => {
        openId = res.result.openId;
        //查找对应用户的书架
        mybookCollection.where({
          _openid: openId
        }).get().then(res1 => {

          for (var i = 0; i < res1.data.length; i++) {
            booklistCollection.where({
              isbn: res1.data[i].isbn
            }).get().then(res2 => {
              //console.log(res2.data[0]);
              book1 = book1.concat(res2.data[0]);
              //console.log(book1);
              this.setData({
                book: book1
              })
            }).catch(e => {
              console.error(e)
            });
          }

          this.setData({
            bookhasList:true
          })

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
        }).get().then(res=>{
          // console.log(res.data[0].point);
          this.setData({
            point:res.data[0].point
          })
        })
      }
    });
    
  },

  

  getInfo: function(result) {
    wx.cloud.callFunction({
      name: 'getUserInfo',
      complete: res => {
        var openId = res.result.openId;

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
              data:{
                point: 18
              }
            }).then().catch(err => {
              console.error(err)
            })
          }
        });
      }
    })

  }

})