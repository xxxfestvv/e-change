Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    totalBook: 0,
    booknavput: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },

  onShow() {
    this.setData({
      hasList: true,
      carts: [
        { id: 1, title: '书名', writer:'作者', image: '../../image/1.jpg', price: 2 },
        { id: 2, title: '书名', writer: '作者', image: '../../image/2.jpg', price: 4 },
        { id: 3, title: '资料名', writer: '提供者', image: '../../image/4.jpg', price: 8 }
      ]
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let total_num = 1;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
        total += carts[i].price;   // 所有价格加起来
        total_num += i;
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total,
      totalBook: total_num
    });
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  booknavadd: function() {
    wx.reLaunch({
      url: '../book/book'
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

  booknavup: function () {

    this.setData({

      booknavput: !this.data.booknavput

    })

  },

  //确认

  confirm: function () {
    wx.redirectTo({
      url: '../my_book/my_book'
    }),

      this.setData({

      booknavput: true

      })

  },
  
})