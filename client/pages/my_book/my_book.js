const db = wx.cloud.database();
const changeCollection = db.collection('book_changed');
const unchangeCollection = db.collection('book_unchanged');
const booklistCollection = db.collection('booklist');
const notelistCollection = db.collection('note');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    goodsid: '',
    scoreput: true,
    select: false,
    defaultpoint: '中山北路第三提货点',
    cancleput: true,
    cbook: [],
    ubook: [],
    unote: [],
    chasList: false,          // 列表是否有数据
    uhasList: false,          // 列表是否有数据
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

  scoreinput: function (e) {

    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    // console.log('goodsId:' + goodsId);  

    this.setData({

      scoreput: !this.data.scoreput,
      goodsid:goodsId

    })

  },

  //取消按钮

  scorecancel: function () {

    this.setData({

      scoreput: true

    })

  },

  //确认

  scoreconfirm: function (e) {
    
    console.log(this.data.defaultpoint);
    console.log(this.data.goodsid);


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
    var name = e.currentTarget.dataset.name
    this.setData({
      defaultpoint: name,
      select: false
    })
  },

  bookcancle: function () {

    this.setData({

      cancleput: !this.data.cancleput

    })

  },

  //确认

  cancleconfirm: function () {

    this.setData({

      cancleput: true

    })

  },

  onLoad: function(options) {
    var tmp1=[], tmp2=[];
    var openId;
    wx.cloud.callFunction({
      name: 'getUserInfo',
      complete: res => {
        openId = res.result.openId;
        //查找已换取
        changeCollection.where({
          provider_id: openId
        }).get().then(res1 => {
          if (res1.data.length) {
            this.setData({
              chasList: true
            })
          }

          for (var i = 0; i < res1.data.length; i++) {

              booklistCollection.where({
                _id: res1.data[i].id
              }).get().then(res2 => {
                // console.log(res2.data);
                tmp1 = tmp1.concat(res2.data[0]);
                // console.log(tmp1);
                this.setData({
                  cbook: tmp1
                })
              }).catch(e => {
                console.error(e)
              });
            
          }
        }).catch(e => {
          console.error(e)
        });

        var tmp3 = [], tmp4 = [];
        //查找未被换取
        unchangeCollection.where({
          provider_id: openId
        }).get().then(res1 => {
          if (res1.data.length) {
            this.setData({
              uhasList: true
            })
          }

          for (var i = 0; i < res1.data.length; i++) {

            if (res1.data[i].type == 1) {
              booklistCollection.where({
                _id: res1.data[i].id
              }).get().then(res2 => {
                // console.log(res2.data);
                tmp3 = tmp3.concat(res2.data[0]);
                // console.log(tmp1);
                this.setData({
                  ubook: tmp3
                })
              }).catch(e => {
                console.error(e)
              });
            }
            else if (res1.data[i].type == 2) {
              notelistCollection.where({
                _id: res1.data[i].id
              }).get().then(res2 => {
                //console.log(res2.data[0]);
                tmp4 = tmp4.concat(res2.data[0]);
                //console.log(book1);
                this.setData({
                  unote: tmp4
                })
              }).catch(e => {
                console.error(e)
              });
            }

          }
        }).catch(e => {
          console.error(e)
        });

      }
    });
  }

})