Page({

    /**
     * 页面的初始数据
     */
    data: {
        ancestor:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.database().collection('ancestor').get()
        .then(res => {
            this.setData({
                ancestor: res.data
            })
        })
    },

    goDetail: function(event) {
        wx.navigateTo({
          url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
        })
    },

    hornor: function(event) {
        let item = this.data.ancestor[event.currentTarget.dataset.index]
        wx.cloud.database().collection('ancestor').doc(item._id).update({
            data: {
                number: wx.cloud.database().command.inc(1)
            }
        }).then(res => {
            this.setData({
                ["ancestor[" + event.currentTarget.dataset.index + "].number"]: item.number + 1
            })
        })
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