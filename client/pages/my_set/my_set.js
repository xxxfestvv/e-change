Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnput: true,
    nickname: '我的昵称',
    gender:'男',
    sign: '个人签名'
  },

  setbtn: function () {

    this.setData({

      btnput: !this.data.btnput

    })

  },

  //取消按钮

  btncancel: function () {

    this.setData({

      btnput: true

    })

  },

  //确认

  btnconfirm: function () {

    this.setData({

      btnput: true

    })

  }
})