Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:"",    //placeholder的内容
    hotList:[],             //热搜榜内容
    searchList:[],
    searchShow:"",
    inputvalue:"",
    historyList:[],
    isFocus:false         //是否出现删除按钮
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://autumnfish.cn/search/default',
      success(result){
        that.setData({
          placeholderContent:result.data.data.showKeyword,
        })
        // console.log(that.data.placeholderContent);
       }
    });
    wx.request({
      url: 'https://autumnfish.cn/search/hot/detail',
      success(result){
        // console.log(result.data.data);
        that.setData({
          hotList:result.data.data
        })
        // console.log(that.data.hotList);
       }
    });
  },
  expInput:function(e){     //获取输入框的值
    var that=this;
    that.setData({
      searchShow:e.detail.value.trim(),
      isFocus:true
    });
    setTimeout(()=>{
      if(!that.data.searchShow){
        that.setData({
          searchList:[],
          isFocus:false,
          inputvalue:""
        })
        return;
      }
      wx.request({
        url: 'https://autumnfish.cn/cloudsearch?keywords='+that.data.searchShow,
        success(result){
          // console.log(result.data.result.songs);
          that.setData({
            searchList: result.data.result.songs,
          })
          // console.log(that.data.searchList);
         },
      });
    },300)
  },

  searchHot:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      inputvalue: e.currentTarget.dataset.id
    })
    this.setData({
      searchShow:e.currentTarget.dataset.id,
      isFocus:true
    });
    setTimeout(()=>{
      var that=this;
      if(!this.data.searchShow){
        this.setData({
          searchList:[],
          isFocus:false,
          inputvalue:""
        })
        return;
      }
      wx.request({
        url: 'https://autumnfish.cn/cloudsearch?keywords='+that.data.searchShow,
        success(result){
          // console.log(result.data.result.songs);
          that.setData({
            searchList: result.data.result.songs,
          })
          // console.log(that.data.searchList);
         },
      });
    },300)
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