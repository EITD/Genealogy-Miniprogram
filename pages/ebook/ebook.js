let startX = 0
let endX = 0
let shouldMove = true

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pages: [],
        prevList: [],
        nextList: [],
        currentPage: 0
    },

    touchStart: function(event) {
        startX = event.touches[0].pageX
        shouldMove = true
    },

    touchMove: function(event) {
        endX = event.touches[0].pageX
        if(shouldMove){
            if(startX - endX > 50) {
                console.log('左滑')
                this.next()
                shouldMove = false
            } else if (endX - startX > 50) {
                console.log('右滑')
                this.prev()
                shouldMove = false
            }      
         }
    },

    prev() {
        if(this.data.currentPage > 0) {
            let currentPage = this.data.currentPage - 1
            this.setData({
              // 前一页取消后翻动画，附加前翻动画
              ['nextList[' + currentPage + ']']: '',
              ['prevList[' + currentPage + ']']: 'prevAnimation',
              currentPage: currentPage
            })
          }
    },

    next(){
        if(this.data.currentPage < this.data.pages.length - 1) {
          let currentPage = this.data.currentPage
          this.setData({
            // 取消前翻动画，附加后翻动画
            ['prevList[' + currentPage + ']']: '',
            ['nextList[' + currentPage + ']']: 'nextAnimation',
            currentPage: currentPage + 1
          })      
        }
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.database().collection('ebook').get()
        .then(res => {
            this.setData({
                pages: res.data
            })
        })
    },

    download: function(event) {
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud.callFunction({
        name: 'convertPDF',
        data: {
          img_arr: this.data.pages
        },
        success: res => {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/webview/webview?url=' + res.result.data.pdf
          })
        }
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