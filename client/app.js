//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'ebookchang-d96875',
      traceUser: true
    });
  },
  globalData: {
    blog: {}
  }
});
