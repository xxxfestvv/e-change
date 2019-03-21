const db = wx.cloud.database()
const currentCollection = db.collection('currentlist')
const bookCollection = db.collection('booklist')
const noteCollection = db.collection('note')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    hiddenmodalput: true,
    linkmodalput: true,
    isbnput: true,
    result: '',
    handresult: '',
    image_link: '',
    note_text: '',
    note_link: '',
    note_title: '',
    note_pro: ''
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

  onLoad: function(options) {
    this.setData({
      result: '',
      handresult: '',
      image_link: '',
      note_text: '',
      note_link: '',
      note_title: '',
      note_pro: ''
    })
  },

  doUpload: function() {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]
        let randString = 'noteimg-' + Math.floor(Math.random() * 1000000).toString() + '.png'
        // 上传图片
        wx.cloud.uploadFile({
          cloudPath: randString,
          filePath: filePath,
          name: 'file',

          success: res => {
            // console.log(res.fileID);
            that.setData({
              image_link: res.fileID
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },

          fail: e => {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })

      },
      fail: function(e) {
        console.error(e);
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮

  cancel: function() {
    this.setData({
      hiddenmodalput: true
    })

  },

  //确认

  confirm: function() {
    var that = this;
    if (!that.data.note_title) {
      wx.showToast({
        title: '请输入资料名',
        icon: 'none',
        duration: 2000
      })
    }
    if (!that.data.note_pro) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
    }
    if (!that.data.note_text) {
      wx.showToast({
        title: '请输入简介',
        icon: 'none',
        duration: 2000
      })
    }

    this.setData({
      hiddenmodalput: true
    })
  },

  isbntext: function(e) {
    this.data.handresult = e.detail.value;
  },

  isbninput: function() {

    this.setData({

      isbnput: !this.data.isbnput

    })

  },

  //取消按钮

  isbncancel: function() {
    this.setData({
      isbnput: true
    })
  },

  //确认

  isbnconfirm: function() {
    var that = this;
    var isbn = parseInt(that.data.handresult);

    if (isbn) {
      bookCollection.where({
        isbn: isbn
      }).get({
        success(res) {
          // console.log(res.data[0]);
          currentCollection.add({
            data: {
              type: 1,
              isbn: isbn,
              title: res.data[0].title,
              writer: res.data[0].writer,
              point: res.data[0].point,
              image: res.data[0].image
            }
          }).then(res => {
            wx.navigateTo({
              url: '../book_nav/book_nav'
            })
          }).catch(e => {
            console.error(e)
          })
        },
        fail: 
          wx.showToast({
            title: '目前不收这本书哦',
            icon: 'none',
            duration: 2000
          })
        
      })
    }

    // wx.navigateTo({
    //   url: '../book_nav/book_nav'
    // })

    this.setData({
      isbnput: true
    })

  },

  getScancode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = parseInt(res.result);
        bookCollection.where({
          isbn: result
        }).get({
          success(res) {
            // console.log(res.data[0]);
            let book_title = res.data[0].title;
            let book_writer = res.data[0].writer;
            let book_point = res.data[0].point;
            let book_image = res.data[0].image;
            currentCollection.add({
              data: {
                type: 1,
                isbn: result,
                title: book_title,
                writer: book_writer,
                point: book_point,
                image: book_image
              }
            }).then(res => {
              wx.navigateTo({
                url: '../book_nav/book_nav'
              })
            }).catch(e => {
              console.error(e)
            });
          },
          fail:
            wx.showToast({
              title: '目前不收这本书哦',
              icon: 'none',
              duration: 2000
            })
          
        })
      },
      fail: function(e) {
        // console.error(e);
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },

  addnote: function() {
    var that = this;
    if (that.data.image_link) {
      noteCollection.add({
        data: {
          image: that.data.image_link,
          link_address: that.data.note_link,
          point: 20,
          provider: that.data.note_pro,
          score: 5,
          text: that.data.note_text,
          title: that.data.note_title
        }
      }).then(res => {
        // console.log(res._id);
        currentCollection.add({
          data: {
            type: 2,
            note_id: res._id,
            image: that.data.image_link,
            provider: that.data.note_pro,
            title: that.data.note_title,
            point: 20
          }
        }).then(res => {
          wx.navigateTo({
            url: '../book_nav/book_nav'
          })
        }).catch(e => {
          console.error(e)
        })
      }).catch(e => {
        console.error(e)
      })
    } else {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
    }

  },

  getPlaces: function() {
    wx.showModal({
      title: '目前供书点',
      content: '中山北路校区第一提货点\r\n中山北路校区第二提货点\r\n中山北路校区第三提货点\r\n闵行校区第一提货点\r\n闵行校区第二提货点',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  linkinput: function() {

    this.setData({

      linkmodalput: !this.data.linkmodalput

    })

  },

  //取消按钮

  linkcancel: function() {

    this.setData({

      linkmodalput: true

    })

  },

  //确认

  linkconfirm: function() {
    if (!this.data.note_link) {
      wx.showToast({
        title: '请输入资料链接',
        icon: 'none',
        duration: 2000
      })
    }
    this.setData({
      linkmodalput: true
    })

  },

  notetext: function(e) {
    this.data.note_text = e.detail.value;
  },

  linktext: function(e) {
    this.data.note_link = e.detail.value;
  },

  notetitle: function(e) {
    this.data.note_title = e.detail.value;
  },

  notepro: function(e) {
    this.data.note_pro = e.detail.value;
  },

  getRules: function() {
    wx.navigateTo({
      url: '../book_rule/book_rule'
    })
  }
})