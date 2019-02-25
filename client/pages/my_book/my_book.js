const db = wx.cloud.database();
const changeCollection = db.collection('book_changed');
const unchangeCollection = db.collection('book_unchanged');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    cancleid: '',
    currentData: 0,
    goodsid: '',
    scoreput: true,
    select: false,
    defaultpoint: '中山北路第三提货点',
    cancleput: true,
    cbook: [],
    ubook: [],
    chasList: false, // 列表是否有数据
    uhasList: false, // 列表是否有数据
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
    var goodsId = e.currentTarget.dataset.goodsid;
    // console.log('goodsId:' + goodsId);  

    this.setData({

      scoreput: !this.data.scoreput,
      goodsid: goodsId

    })

  },

  //取消按钮

  scorecancel: function() {

    this.setData({

      scoreput: true

    })

  },

  //确认

  scoreconfirm: function(e) {
    var that=this;

    wx.cloud.callFunction({
      name: 'updateplace',
      data:{
        provider_id: that.data.openid,
        id:that.data.goodsid,
        place:that.data.defaultpoint
      },
    }).then(res=>{
      console.log(res.result);
      that.onLoad()
    }).catch(console.error);
    // 更新操作放到云函数才行

    this.setData({
      scoreput: true
    })


  },

  //下拉框
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },

  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      defaultpoint: name,
      select: false
    })
  },

  bookcancle: function(e) {

    var cancleid = e.currentTarget.dataset.id;
    // console.log(cancleid);

    this.setData({

      cancleput: !this.data.cancleput,
      cancleid: cancleid

    })

  },

  //确认

  cancleconfirm: function() {
    
    unchangeCollection.doc(this.data.cancleid).remove().then(res=>{
      console.log(res);
      this.onLoad();
    })

    this.setData({
      cancleput: true
    })

  },

  canclecancel: function() {
    this.setData({
      cancleput: true
    })
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
    var tmp1 = [],
      tmp2 = [];
    var openId = this.data.openid;
    //查找已换取
    changeCollection.where({
      provider_id: openId,
      state: 1
    }).get().then(res1 => {
      if (res1.data.length) {
        this.setData({
          chasList: true
        })
      }

      this.setData({
        cbook: res1.data
      });
    }).catch(e => {
      console.error(e)
    });

    //查找未被换取
    unchangeCollection.where({
      provider_id: openId
    }).get().then(res1 => {
      if (res1.data.length) {
        this.setData({
          uhasList: true
        })
      }

      this.setData({
        ubook: res1.data
      });
    }).catch(e => {
      console.error(e)
    });
  }

})