Component({
    /**
     * 组件的属性列表
     */
    properties: {
        table: {
            type: Array
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
        choose: function(event) {
            this.triggerEvent("choose", {value: event.currentTarget.dataset.item})
        }
    }
})
