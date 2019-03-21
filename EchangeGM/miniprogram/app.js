//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'exchange-gm-b1f290',    //这个地方需要改env
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
