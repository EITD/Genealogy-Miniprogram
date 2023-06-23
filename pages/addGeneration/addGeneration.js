Page({

    /**
     * 页面的初始数据
     */
    data: {
        confirm: false,
        showTable: false,
        error: false,
        errorMsg: "",
        name: "",
        courtesy: "",
        description: "",
        parent: "",
        list: [],
        table: [],
        parentId: 0,
        generation: 0
    },

    search: function(event) {
        if(this.data.list.length == 0) {
            let that = this
            wx.request({
                url: 'http://121.41.117.97:3000/member',
                method: 'GET',
                success(res) {
                    that.setData({
                        list: res.data
                    })
                    that.setTable()
                }   
            })
        } else {
            this.setTable()
        }
    },

    setTable: function(event) {
        let data = []
        if(this.data.parent != "") {
            for(const item of this.data.list) {
                if(item.name.indexOf(this.data.parent) >= 0) {
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

    chooseParent: function(event) {
        this.setData({
            parent: event.detail.value.name,
            parentId: event.detail.value.id,
            generation: event.detail.value.generation + 1,
            showTable: false,
            confirm: true
        })
    },

    change: function(event) {
        this.setData({
            confirm: false
        })
    },

    submit: function(event) {
        if(this.data.name != '' && this.data.confirm) {
            let that = this
            wx.request({
                url: 'http://121.41.117.97:3000/member',
                method: 'POST',
                data: {
                    name: that.data.name,
                    courtesy: that.data.courtesy,
                    description: that.data.description,
                    parentId: that.data.parentId,
                    generation: that.data.generation
                },
                success(res) {
                    wx.showToast({
                      title: '添加成功'
                    })
                    that.setData({
                            error: false,
                            name: "",
                            courtesy: "",
                            description: "",
                            parent: "",
                            list: [],
                            parentId: 0,
                            generation: 0
                     })
                }
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