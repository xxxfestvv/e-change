const db = wx.cloud.database()
const cartCollection = db.collection('cart_item')
const pointCollection = db.collection('my_point')
const cbookCollection = db.collection('book_changed')
const ubookCollection = db.collection('book_unchanged')
const mynoteCollection = db.collection('my_note')
const noteCollection = db.collection('note')
const alertCollection = db.collection('my_alert')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // currentData: 0,
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true, // 全选状态，默认全选
    openid: '',
    obj: {
      name: "hello"
    }
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
    var openId = this.data.openid;

    cartCollection.where({
      _openid: openId
    }).get().then(res => {
      // console.log(res.data);
      this.setData({
        hasList: true,
        carts: res.data
      });
      this.getTotalPrice();
    })

  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    // console.log(index);
    let carts = this.data.carts;
    // carts.splice(index, 1);
    // this.setData({
    //   carts: carts
    // });
    cartCollection.doc(index).remove().then(console.log).catch(console.error);
    // this.getTotalPrice();
    this.onLoad();

  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    cartCollection.doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        num: num
      }
    }).then(res => {
      this.onLoad();
    }).catch(console.error)

    this.onLoad();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    cartCollection.doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        num: num
      }
    }).then(res => {
      this.onLoad();
    }).catch(console.error)


  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].num * carts[i].point; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total
    });
  },

  buyit: function() {
    var that = this;
    let totalpoint = that.data.totalPrice;
    let openId = that.data.openid;
    let curcarts = that.data.carts;

    pointCollection.where({
      _openid: openId
    }).get().then(res => {
      if (res.data[0].point < totalpoint) {
        wx.showToast({
          title: '购买失败',
          icon: 'none',
          duration: 2000
        })
        wx.reLaunch({
          url: '../car/car',
        })
      } else {
        //扣积分
        let curpoint = res.data[0].point - totalpoint;
        console.log(curcarts[0].selected);
        pointCollection.doc(res.data[0]._id).update({
          data: {
            point: curpoint
          }
        }).then(console.log).catch(console.error);
        //加入列表
        for (let i = 0; i < curcarts.length; i++) {
          if (curcarts[i].selected == false) continue;
          else {
            if (curcarts[i].type == 1) {
              //如果是书的话
              ubookCollection.where({
                id: curcarts[i].id
              }).get().then(res => {

                if (res.data.length) {
                  var providerid = res.data[0].provider_id;
                  cbookCollection.add({
                    data: {
                      asker_id: openId,
                      id: curcarts[i].id,
                      image: curcarts[i].image,
                      place: '中山北路第二提货点',
                      provider_id: providerid,
                      state: 1,
                      title: curcarts[i].title
                    }
                  }).then().catch(console.error);

                  alertCollection.add({
                    data: {
                      _openid: providerid,
                      title: curcarts[i].title,
                      type:1
                    }
                  }).then(console.log).catch(console.error);

                  cartCollection.doc(curcarts[i]._id).remove().then(console.log).catch(console.error);
                } else {
                  var providerid = 'oY0xd5ZiPpA8SgyDXKtdLZYYz3Eg';

                  alertCollection.add({
                    data: {
                      _openid: providerid,
                      title: curcarts[i].title,
                      type: 1
                    }
                  }).then(console.log).catch(console.error);
                  
                  cbookCollection.add({
                    data: {
                      asker_id: openId,
                      id: curcarts[i].id,
                      image: curcarts[i].image,
                      place: '中山北路第二提货点',
                      provider_id: providerid,
                      state: 1,
                      title: curcarts[i].title
                    }
                  }).then(res => {
                    console.log(res);
                  }).catch(e => {
                    console.error(e);
                  });
                  cartCollection.doc(curcarts[i]._id).remove().then(console.log).catch(console.error);
                }
                // console.log(res.data);
              }).catch(console.error);
            }
            //如果是笔记的话
            else {
              noteCollection.where({
                _id:curcarts[i].id
              }).get().then(res => {
                var point = res.data[0].point;
                var provider = res.data[0]._openid;
                var title = res.data[0].title;

                alertCollection.add({
                  data: {
                    _openid:provider,
                    title:title,
                    type:3
                  }
                }).then().catch(console.error);

                wx.cloud.callFunction({
                  name: 'updatePoint',
                  data: {
                    provider: provider,
                    point: point
                  }
                }).then(console.log).catch(console.error);
              }).catch(console.error);

              mynoteCollection.add({
                data:{
                  note_id:curcarts[i].id
                }
              }).then(res => {
                
                cartCollection.doc(curcarts[i]._id).remove().then(console.log).catch(console.error);
              }).catch(console.error);


            }
          }
        }
        wx.showToast({
          title: '购买成功',
          icon: 'none',
          duration: 2000
        });

        wx.navigateTo({
          url: '../my_order/my_order'
        });
      }
    });

    wx.reLaunch({
      url: '../my/my',
    });
  }

})