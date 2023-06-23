Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showDialog: {
            type: Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeDialog: function(event) {
            this.setData({
                showDialog: false
            })
        }
    }
})
