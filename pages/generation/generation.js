Page({

    /**
     * 页面的初始数据
     */
    data: {
        multichild: true,
        showDialog: false,
        showDetail: false,
        showTable: true,
        input: "",
        list: [],
        root:{},
        parent:{},
        item: {},
        children: [],
        table:[],
        generationMap: {},
        idToItem: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        let that = this
        wx.request({
          url: 'http://121.41.117.97:3000/member',
          method: 'GET',
          success(res) {
            that.setData({
                list: res.data
            })
            let map = {}
            let first = {}
            let idToitem = {}
            for(const item of that.data.list) {
                idToitem[item.id] = item
                if(item.generation == 1) {
                    first = item
                }
                if(map[item.parentId]) {
                    map[item.parentId].push(item)
                } else {
                    map[item.parentId] = [item]
                }
            }
            that.setData({
                root: first,
                parent: first,
                children: map[first.id],
                generationMap: map,
                idToItem: idToitem
            })
          }
        })
    },

    search: function(event) {
        let data = []
        if(this.data.input != "") {
            for(const item of this.data.list) {
                if(item.name.indexOf(this.data.input) >= 0) {
                    data.push(item)
                }
            }
        }
        this.setData({
            table: data,
            showDialog: true,
            showTable: data.length != 0
        })
    },

    chooseSearch: function(event) {
        this.setGeneration(event.detail.value)
        this.setData({
            showDialog: false
        })
    },

    chooseGraph: function(event) {
        this.setGeneration(event.currentTarget.dataset.item)
    },

    chooseRoot: function(event) {
      this.setGeneration(this.data.root)  
    },

    chooseUp: function(event) {
        if(this.data.parent.id != this.data.root.id){
            let p = this.data.idToItem[this.data.parent.parentId]
            this.setGeneration(p)
        }
    },

    setGeneration: function(parent) {
        let list = this.data.generationMap[parent.id]
        if(list) {
            this.setData({
                parent: parent,
                children: list,
                multichild: list.length > 1
            })
         } else {
             wx.showToast({
               icon: "error",
               title: '没有子辈'
             })
         }
    },

    showDetail: function(event) {
        this.setData({
            showDetail: true,
            item: event.currentTarget.dataset.item
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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