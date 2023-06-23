Page({

    /**
     * 页面的初始数据
     */
    data: {
        error: false,
        errorMsg: "请检查必填字段！",
        name: "",
        img: "",
        description: ""
    },

    upload: function(event) {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back'
        }).then(res => {
            this.setData({
                img: res.tempFiles[0].tempFilePath
            })
        })
    },

    submit: function(event) {
        if(this.data.name != "" && this.data.img != "" && this.data.description != "") {
            let path = "ancestor/" + parseInt(new Date().getTime() / 1000) + ".jpg"
            wx.cloud.uploadFile({
              cloudPath: path,
              filePath: this.data.img
            }).then(res => {
              wx.cloud.database().collection('ancestor').add({
                data: {
                    "description": this.data.description,
                    "image": res.fileID,
                    "name": this.data.name,
                    "number": 0
                }
              }).then(res => {
                    wx.showToast({
                        title: '添加成功'
                    })
                })
             })
        } else {
            this.setData({
                error: true
            })
        }
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