Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTable: false,
        confirm: false,
        error: false,
        errorMsg: "",
        deleteId: "",
        name: "",
        img: "",
        description: "",
        list: [],
        table: []
    },

    search: function(event) {
        if(this.data.list.length == 0) {
            wx.cloud.database().collection('ancestor').get()
            .then(res => {
                this.setData({
                    list: res.data
                })
                this.setTable()
            })
        } else {
            this.setTable()
        }
    },

    setTable: function(event) {
        let data = []
        if(this.data.name != "") {
            for(const item of this.data.list) {
                if(item.name.indexOf(this.data.name) >= 0) {
                    data.push(item)
                }
            }
        }
        this.setData({
            table: data,
            showTable: data.length > 0,
            error: data.length == 0,
            errorMsg: "抱歉，没有查询到信息！"
        })
    },

    chooseAncestor: function(event) {
        this.setData({
            showTable: false,
            confirm: true,
            deleteId: event.currentTarget.dataset.ancestor._id,
            name: event.currentTarget.dataset.ancestor.name,
            img: event.currentTarget.dataset.ancestor.image,
            description: event.currentTarget.dataset.ancestor.description
        })
    },

    change: function(event) {
        this.setData({
            confirm: false
        })
    },

    submit: function(event) {
        if(this.data.confirm && this.data.name != "") {
            wx.cloud.database().collection('ancestor').doc(this.data.deleteId).remove()
            .then(res => {
                    wx.showToast({
                        title: '删除成功'
                    })
                    this.setData({
                        confirm: false,      
                        deleteId: "",
                        name: "",
                        img: "",
                        description: "",
                        list: []
                    })
                })
        } else {
            this.setData({
                error: true,
                errorMsg: "请检查必填字段！"
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