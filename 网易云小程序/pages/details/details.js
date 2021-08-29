var util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pirUrl:"",
    title:"",
    playCount:"",
    dirction:"",
    listCount:"",
    //歌曲的id
    privileges:"",
    //歌曲详情
    playList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //里面包含了我们需要的id数据
    let id = options.id
    let ids = []
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //接口访问
    wx.request({
      url: 'https://autumnfish.cn/playlist/detail?id='+id,
      success(data){
        // console.log(data.data.privileges)
        //变量里面的id利用,连接
        data.data.privileges.map((item)=>{
          ids.push(item.id)
        })
        //获取对应的数据进行赋值
        that.setData({
          pirUrl:data.data.playlist.coverImgUrl,
          title:data.data.playlist.name,
          playCount:util.formatCount(data.data.playlist.playCount),
          dirction:data.data.playlist.description,
          listCount:data.data.privileges.length,
          privileges:ids.join(",")
        })
        //歌曲详情的请求
        //https://autumnfish.cn/song/detail?ids=1869728598
        wx.request({
          url: 'https://autumnfish.cn/song/detail?ids='+ids.join(','),
          success(data){
            console.log(data)
            that.setData({
              playList:data.data.songs
            },function(){
              wx.hideLoading({
                success: (res) => {},
              })
            })
          }
        })
       
      }
    })

  },
  toPlay(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../play/play?id='+id,
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