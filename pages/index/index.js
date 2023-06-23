const app = getApp()

Page({
    data: {
        banner: ["/images/banner01.png", "/images/banner03.png", "/images/banner04.png", "/images/banner05.png"],
        showAncestor: false,
        showGeneration: false,
        isAdmin: true,
        user: ""
    },

    ebook: function(event) {
        wx.navigateTo({
          url: '/pages/ebook/ebook'
        })
    },

    addBook: function(event) {
      wx.chooseMedia({
        count: 9,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'back'
      }).then(list => {
        wx.cloud.database().collection('ebook').get()
        .then(res => {
          let count = res.data.length
          for(const photo of list.tempFiles) {
            count++
            let path = "ebook/" + count + ".jpg"
            wx.cloud.uploadFile({
              cloudPath: path,
              filePath: photo.tempFilePath
            }).then(res => {
              wx.cloud.database().collection('ebook').add({
                data: {
                  "imgurl": res.fileID
                }
              }).then(res => {
                wx.showToast({
                  title: '添加成功'
                })
              })
            })
          }
        })
      })
    },

    manageGeneration: function(event) {
        this.setData({
            showGeneration: true
        })
    },

    addGeneration: function(event) {
        wx.navigateTo({
                url: '/pages/addGeneration/addGeneration'
        })
    },

    editGeneration: function(event) {
        wx.navigateTo({
                url: '/pages/editGeneration/editGeneration'
        })
    },

    deleteGeneration: function(event) {
        wx.navigateTo({
                url: '/pages/deleteGeneration/deleteGeneration'
        })
    },

    manageAncestor: function(event) {
        this.setData({
            showAncestor: true
        })
    },

    addAncestor: function(event) {
        wx.navigateTo({
          url: '/pages/addAncestor/addAncestor'
        })
    },

    editAncestor: function(event) {
        wx.navigateTo({
            url: '/pages/editAncestor/editAncestor'
          })
    },

    deleteAncestor: function(event) {
        wx.navigateTo({
            url: '/pages/deleteAncestor/deleteAncestor'
          })
    },

    logout: function(evnet) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    },

    onLoad: function(options) {
      this.setData({
        isAdmin: app.globalData.username == "管理员",
        user: app.globalData.username
      })
    }
})