App({
  onLaunch() {
    wx.cloud.init({
      env:'cloud1-5g1l0i9w74139e9d'
    })
  },

  globalData: {
    openId: "",
    username: "游客"
  }
})
