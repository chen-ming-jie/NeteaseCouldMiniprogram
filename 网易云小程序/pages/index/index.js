
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户信息
  },
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo : JSON.parse(userInfo)
      })
      this.getRecentPlayList(this.data.userInfo.userId)
    }
  },
  // 跳转到登录界面
  toLogin() {
    if (this.data.userInfo.nickname) {
      return
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  
  //  生命周期函数--监听页面初次渲染完成

  onReady: function () {

  },

  // 生命周期函数--监听页面显示
  onShow: function () {
  },
})