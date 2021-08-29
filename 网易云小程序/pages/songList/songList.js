Page({

  /**
   * 页面的初始数据
   */
  data: {
    //歌单id
    // ids:["19723756","3779629","2884035","3778678"],
    //存储对应的数据的
    playlistArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '稍等一下哦',
    })
    var that = this
    //请求访问 
      wx.request({
        url: 'https://autumnfish.cn/toplist/detail',
        //成功的回调 返回的数据
        success(data){
          console.log(data)
          //设置data中的数据
          that.setData({
            playlistArray:data.data.list
          },function(){
            wx.hideLoading({
              success: (res) => {},
            })
          })
        }
      })
  },
  //跳转到搜索页
  goSearch(){
    wx.navigateTo({
      url: '../findList/findList',
    })
  },
  //跳转到详情页
  toDetails:function(e){
    //事件源对象 e 携带值 detail获取详情 
    //currentTarget 当前的组件
    //dataset 获取data开头的属性值
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    //将id传给详情页跳转详情页
    wx.showLoading({
      title:"跳转中"
    })
    wx.navigateTo({
      url: '../details/details?id='+id,
      success(){
        wx.hideLoading()
      }
    })

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