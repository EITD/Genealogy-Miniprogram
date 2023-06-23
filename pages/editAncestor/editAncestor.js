Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTable: false,
        confirm: false,
        error: false,
        imgChange: false,        
        errorMsg: "",
        editId: "",
        edit: "",
        name: "",
        img: "",
        description: "",
        number: 0,
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
        if(this.data.edit != "") {
            for(const item of this.data.list) {
                if(item.name.indexOf(this.data.edit) >= 0) {
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
            editId: event.currentTarget.dataset.ancestor._id,
            edit: event.currentTarget.dataset.ancestor.name,
            name: event.currentTarget.dataset.ancestor.name,
            img: event.currentTarget.dataset.ancestor.image,
            description: event.currentTarget.dataset.ancestor.description,
            number: event.currentTarget.dataset.ancestor.number
        })
    },

    change: function(event) {
        this.setData({
            confirm: false
        })
    },

    upload: function(event) {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back'
        }).then(res => {
            this.setData({
                img: res.tempFiles[0].tempFilePath,
                imgChange: true
            })
        })
    },

    submit: function(event) {
        if(this.data.confirm && this.data.name != "" && this.data.img != "" && this.data.description != "") {
            if(this.data.imgChange) {
                let path = "ancestor/" + parseInt(new Date().getTime() / 1000) + ".jpg"
                wx.cloud.uploadFile({
                    cloudPath: path,
                    filePath: this.data.img
                }).then(res => this.update(res.fileID))
            } else {
                this.update(this.data.img)
            }
        } else {
            this.setData({
                error: true,
                errorMsg: "请检查必填字段！"
            })
        }
    },

    update: function(image) {
        wx.cloud.database().collection('ancestor').doc(this.data.editId).update({
            data: {
                "description": this.data.description,
                "image": image,
                "name": this.data.name,
                "number": 0
            }
          }).then(res => {
                wx.showToast({
                    title: '修改成功'
                })
                this.setData({
                    confirm: false,
                    imgChange: false,        
                    editId: "",
                    edit: "",
                    name: "",
                    img: "",
                    description: "",
                    number: 0,
                    list: []
                })
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