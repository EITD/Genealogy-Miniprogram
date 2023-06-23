const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        imgurl: "",
        warn: false
    },

    identify: function(event) {
        if(event.detail.name.text.startsWith("董")) {
            this.setData({
                name: event.detail.name.text,
                imgurl: event.detail.image_path
            })
        } else {
            this.setData({
                warn: true
            })
        }
    },

    login: function(event) {
        app.globalData.username = this.data.name
        wx.cloud.database().collection('user').add({
            data: {
                name: this.data.name
            }
        }).then(res => {
            wx.switchTab({
                url: '/pages/index/index'
              })
        })
    },

    back: function(event) {
        wx.navigateBack({
          delta: 1
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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