const db = wx.cloud.database()
const currentCollection = db.collection('currentlist')
const noteCollection = db.collection('note')
const bookCollection = db.collection('booklist')
const uchangeCollection = db.collection('book_unchanged')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    totalBook: 0,
    booknavput: true,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    var openId = this.data.openid;

    currentCollection.where({
      _openid: openId
    }).get().then(res => {
      // console.log(res.data);
      let total = 0;

      for (let i = 0; i < res.data.length; i++) { // 循环列表得到每个数据
        total += res.data[i].point; // 所有价格加起来
      }
      this.setData({ // 最后赋值到data中渲染到页面
        totalPrice: total,
        hasList: true,
        carts: res.data,
        totalBook: res.data.length
      });
    })

    // this.setData({
    //   title: options.title
    // })

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
        hasList: false,
        totalBook: 0,
        totalPrice: 0
      });
    } else {
      let total = 0;

      for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
        total += carts[i].point; // 所有价格加起来
      }
      this.setData({
        totalBook: carts.length,
        totalPrice: total
      })
    }
  },

  //提交
  booknavadd: function() {
    wx.reLaunch({
      url: '../book/book'
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

    this.setData({

      hiddenmodalput: true

    })

  },

  booknavup: function() {

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
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      if (carts[i].type == 1) {
        bookCollection.where({
          isbn: carts[i].isbn
        }).get().then(res => {
          // console.log(res.data[0]._id);
          let book_id = res.data[0]._id;
          uchangeCollection.add({
            data: {
              type: 1,
              provider_id: openId,
              title: carts[i].title,
              image: carts[i].image,
              id: book_id
            }
          }).then(res1 => {
            // console.log(res1)
          }).catch(e => { console.error(e) })
        }).catch(e => { console.error(e) })

      } else if (carts[i].type == 2) {
        uchangeCollection.add({
          data: {
            type: 2,
            provider_id: openId,
            title: carts[i].title,
            image: carts[i].image,
            id: carts[i].note_id
          }
        }).then(res1 => {
          // console.log(res1)
        }).catch(e => { console.error(e) })
      }
    }

    wx.cloud.callFunction({
      name: 'deletCurrentlist',

      data: {
        openid: openId
      },
    }).then(res => {
      console.log(res)
    }).catch(e => {
      console.error(e)
    })
    
    this.setData({

      booknavput: !this.data.booknavput

    })

  },

  //确认

  confirm: function() {
    wx.redirectTo({
        url: '../my_book/my_book'
      }),

      this.setData({

        booknavput: true

      })

  },

})