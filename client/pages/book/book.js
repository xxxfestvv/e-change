Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    hiddenmodalput: true,
    isbnput: true,
    result: '',
    handresult: 'title'
  },

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  },

  modalinput: function () {

    this.setData({

      hiddenmodalput: !this.data.hiddenmodalput

    })

  },

  //取消按钮

  cancel: function () {

    this.setData({

      hiddenmodalput: true

    })

  },

  //确认

  confirm: function () {

    this.setData({

      hiddenmodalput: true

    })

  },

  isbninput: function () {

    this.setData({

      isbnput: !this.data.isbnput

    })

  },

  //取消按钮

  isbncancel: function () {

    this.setData({

      isbnput: true

    })

  },

  //确认

  isbnconfirm: function () {
    wx.navigateTo({
      url: '../book_nav/book_nav?title=' + this.handresult
    }),

    this.setData({

      isbnput: true

    })

  },

  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../book_nav/book_nav?title=' + res.result
        })
        var result = res.result;

        _this.setData({
          result: result,

        })
      }
    })

  },

  addnote: function () {
    wx.navigateTo({
      url: '../book_nav/book_nav?title=' + ' '
    })
  }

})