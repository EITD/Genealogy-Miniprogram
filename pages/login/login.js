const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      showDialog: false,
      password: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    identityLogin: function(event) {
      wx.cloud.callFunction({
        name: 'get_openId',
        success: res => {
          app.globalData.openId = res.result.openId
          wx.cloud.database().collection('user').where({
            _openid: app.globalData.openId
          }).get().then(res => {
            if(res.data.length == 0) {
              wx.navigateTo({
                url: '/pages/identity/identity'
              })
            } else {
              app.globalData.username = res.data[0].name
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }
      })
    },

    touristLogin: function(event) {
          wx.switchTab({
            url: '/pages/index/index'
          })
    },

    adminLogin: function(event) {
      this.setData({
        showDialog: true
      })
    },

    cancel: function(event) {
      this.setData({
        showDialog: false
      })
    },

    submit: function(event) {
      if(this.data.password == "111111") {
        app.globalData.username = "管理员"
        wx.switchTab({
          url: '/pages/index/index'
        })
      } else {
        wx.showToast({
          title: '密码错误',
          icon: "error"
        })
      }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})