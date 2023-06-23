const app = getApp()

let currentPage = 0
let pageSize = 5

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModal: false,
        loadMore: false,
        loadAll: false,
        refresh: true,
        input:"",
        commentItem: {},
        list: [],
        buttonTop: 450,
        buttonLeft: 320,
        windowWidth: '',
        windowHeight: '',
        startPoint: ""
    },

    getData: function() {
        wx.cloud.database().collection('community')
        .orderBy('time', 'desc')
        .skip(currentPage * pageSize)
        .limit(pageSize)
        .get().then(res => {
            currentPage++
            this.setData({
                list: this.data.list.concat(res.data),
                loadMore: false,
                refresh: false
            })
            if(res.data.length < pageSize) {
                this.setData({
                    loadMore: false,
                    loadAll: true
                })
            }
        })
    },

    comment: function(event) {
        this.showModal()
        this.setData({
            commentItem: event.currentTarget.dataset.item
        })
    },

    showModal: function(event) {
        this.setData({
            showModal: true,
            commentItem: {}
        })
    },

    cancel: function(event) {
        this.setData({
            showModal: false
        })
    },

    submit: function(event) {
        let name = app.globalData.username
        let time = new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 8)
        let content = this.data.input
        if(Object.keys(this.data.commentItem).length == 0) {
            wx.cloud.database().collection('community').add({
                data: {
                    name: name,
                    time: time,
                    content: content,
                    comment: []
                }
            }).then(res => {
                this.setData({
                    showModal: false
                })
                this.pullRefresh()
            })
        } else {
            wx.cloud.database().collection('community').doc(this.data.commentItem._id)
            .update({
                data: {
                    comment: wx.cloud.database().command.push({name: name, time: time, content: content})
                }
            }).then(res => {
                this.setData({
                    showModal: false
                })
                this.pullRefresh()
            })
        }
        this.setData({
            input: ""
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
        this.setData({
            windowWidth: wx.getSystemInfoSync().windowWidth,
            windowHeight: wx.getSystemInfoSync().windowHeight
        })
    },

    buttonStart: function(event) {
        this.setData({
            startPoint: event.touches[0]
        })
    },

    buttonMove: function(event) {
        let start = this.data.startPoint
        let endPoint = event.touches[event.touches.length - 1]
        let translateX = endPoint.clientX - start.clientX
        let translateY = endPoint.clientY - start.clientY
        this.setData({
            startPoint: endPoint
        })

        let buttonTop = this.data.buttonTop + translateY
        let buttonLeft = this.data.buttonLeft + translateX
        if(buttonLeft + 70 >= this.data.windowWidth) {
            buttonLeft = this.data.windowWidth - 70
        }
        if(buttonLeft <= 0) {
            buttonLeft = 0
        }
        if(buttonTop <= 0) {
            buttonTop = 0
        }
        if(buttonTop + 70 >= this.data.windowHeight) {
            buttonTop = this.data.windowHeight - 70
        }
        this.setData({
            buttonTop: buttonTop,
            buttonLeft: buttonLeft
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

    pullRefresh: function(event) {
        currentPage = 0
        this.data.list = []
        this.data.loadAll = false
        this.getData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(!this.data.loadAll) {
            this.setData({
                loadMore: true
            })
            this.getData()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})