//app.js
App({
  onLaunch: function () {
    var that = this;

    wx.cloud.init({
      env: 'ebookchang-d96875',
      traceUser: true
    });

    wx.cloud.callFunction({
      name: 'getUserInfo',
      complete: res => {
        wx.setStorage({
          key: 'openid',
          data: res.result.openId
        })
      }
    });
  }
});
