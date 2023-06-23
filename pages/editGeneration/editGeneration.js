Page({

    /**
     * 页面的初始数据
     */
    data: {
        confirmEdit: false,
        showEditTable: false,
        confirmParent: true,
        showParentTable: false,
        error: false,
        errorMsg: "",
        edit: "",
        editId: 0,
        name: "",
        courtesy: "",
        description: "",
        parent: "",
        list: [],
        editTable: [],
        parentTable: [],
        parentId: 0,
        generation: 0
    },

    searchEdit: function(event) {
        if(this.data.list.length == 0) {
            let that = this
            wx.request({
                url: 'http://121.41.117.97:3000/member',
                method: 'GET',
                success(res) {
                    that.setData({
                        list: res.data
                    })
                    that.setEditTable()
                }   
            })
        } else {
            this.setEditTable()
        }
    },

    setEditTable: function(event) {
        let data = []
        if(this.data.edit != "") {
            for(const item of this.data.list) {
                if(item.name.indexOf(this.data.edit) >= 0) {
                    data.push(item)
                }
            }
        }
        this.setData({
            editTable: data,
            showEditTable: data.length > 0,
            error: data.length == 0,
            errorMsg: "抱歉，没有查询到信息！"
        })
    },

    chooseEdit: function(event) {
        let parentName = ""
        for(const item of this.data.list) {
            if(item.id == event.detail.value.parentId) {
                parentName = item.name
                break
            }
        }
        this.setData({
            editId: event.detail.value.id,
            edit: event.detail.value.name,
            name: event.detail.value.name,
            courtesy: event.detail.value.courtesy,
            description: event.detail.value.description,
            parentId: event.detail.value.parentId,
            parent: parentName,
            generation: event.detail.value.generation,
            showEditTable: false,
            confirmEdit: true
        })
    },

    changeEdit: function(event) {
        this.setData({
            confirmEdit: false
        })
    },

    searchParent: function(event) {
        if(this.data.list.length == 0) {
            let that = this
            wx.request({
                url: 'http://121.41.117.97:3000/member',
                method: 'GET',
                success(res) {
                    that.setData({
                        list: res.data
                    })
                    that.setParentTable()
                }   
            })
        } else {
            this.setParentTable()
        }
    },

    setParentTable: function(event) {
        let data = []
        if(this.data.parent != "") {
            for(const item of this.data.list) {
                if(item.name.indexOf(this.data.parent) >= 0) {
                    data.push(item)
                }
            }
        }
        this.setData({
            confirmParent: false,
            parentTable: data,
            showParentTable: data.length > 0,
            error: data.length == 0,
            errorMsg: "抱歉，没有查询到信息！"
        })
    },

    chooseParent: function(event) {
        this.setData({
            parent: event.detail.value.name,
            parentId: event.detail.value.id,
            generation: event.detail.value.generation + 1,
            showParentTable: false,
            confirmParent: true
        })
    },

    changeParent: function(event) {
        this.setData({
            confirmParent: false
        })
    },

    submit: function(event) {
        if(this.data.confirmEdit && this.data.name != '' && this.data.confirmParent) {
            let that = this
            wx.request({
                url: 'http://121.41.117.97:3000/member/' + that.data.editId,
                method: 'PUT',
                data: {
                    name: that.data.name,
                    courtesy: that.data.courtesy,
                    description: that.data.description,
                    parentId: that.data.parentId,
                    generation: that.data.generation
                },
                success(res) {
                    wx.showToast({
                      title: '修改成功'
                    })
                    that.setData({
                            confirmEdit: false,
                            confirmParent: false,
                            error: false,
                            edit: "",
                            editId: 0,
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