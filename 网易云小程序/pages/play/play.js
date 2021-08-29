Page({

  /**
   * 页面的初始数据
   */
  data: {
    songName:"",
    imgUrl:"",
    lyric:[],
    top: 50,
    id:"",
    musicUrl:"",
    isPlay:true,
    location: 0,
    Wonderfulcomments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    var that = this
    let id = options.id;
    console.log(id)
    // 查询出对应的歌曲
     //歌曲详情的请求
        //https://autumnfish.cn/song/detail?ids=1869728598
        wx.request({
          url: 'https://autumnfish.cn/song/detail?ids='+id,
          success(data){
            // console.log(data)
            that.setData({
             id:id,
             imgUrl:data.data.songs[0].al.picUrl,
             songName:data.data.songs[0].name
            },async()=>{
               //给头部赋值
              wx.setNavigationBarTitle({
                title:that.data.songName
              })
                //歌词
                let lrcTime = []
                wx.request({
                  url: 'https://autumnfish.cn/lyric?id='+that.data.id,
                  success(res){
                    let result = res.data.lrc.lyric
                    //分隔后的数组 
                    //[00:12.570]难以忘记初次见你
                    //正则来匹配
                    let resultArray = result.split("\n")
                    //声明正则对象来区分时间和歌词
                    let regx = /\[\d{2}:\d{2}\.\d{2,3}\]/
                    //利用正则来匹配每一句歌词
                    for(let i=0;i<resultArray.length;i++){
                      //进行歌词和时间的拆分
                      //获取匹配的结果
                      let date = resultArray[i].match(regx)
                      // console.log(date)
                      if(date!=null){
                        //将时间替换为空
                        var lrc = resultArray[i].replace(regx,"")
                        //获取时间字符串
                        var timeStr = date[0]
                        //将前后的中括号和后面的去除
                        var timeSlice = timeStr.slice(1,-1)
                        //将时分秒全部换成秒
                        var splitTimes = timeSlice.split(":")
                        var m = splitTimes[0]
                        var s = splitTimes[1]
                        //将时间组成秒
                        var time = Number(m)*60+Number(s)
                        // console.log(time)
                        // console.log(lrc)
                        //将对应的秒钟和歌词组成数组
                        lrcTime.push([time,lrc])
                      }
                    }
                    //  console.log(lrcTime)
                    that.setData({
                      lyric:lrcTime
                    },function(){
                      wx.hideLoading({
                        success: (res) => {},
                      })
                    })
                  }
                })
                //播放url地址
                wx.request({
                  url: 'https://autumnfish.cn/song/url?id='+that.data.id,
                  success(res){
                    that.setData({
                      musicUrl:res.data.data[0].url
                    },function(){
                      this.audioCtx.play()
                    })
                  }
                })
            })
          }
        })
  //  setTimeout(() => {
  //   wx.hideLoading({
  //     success: (res) => {},
  //   })
  //  }, 2000);

  //获取评论数
  wx.request({
    url: 'https://autumnfish.cn/comment/music?id='+id+'&limit',
    success(res){
      console.log(res);
      that.setData({
        Wonderfulcomments: res.data.hotComments,
      })
      console.log(that.data.Wonderfulcomments);
    }
  })
  },
  
  //歌词进度
  bindtimeupdate(e){
    // console.log('bindtimeupdate', parseInt(e.detail.currentTime), '时间总时长-->', parseInt(e.detail.duration));
    var realtime = parseFloat(e.detail.currentTime)
    for (var i = 0; i < this.data.lyric.length; i++) {
      if (realtime < this.data.lyric[i][0]) {
         this.setData({
          top : (i*20) ,
          location: i-1
         })
          // console.log(this.data.top)
        break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  playOrPause:function(){
    if(this.data.isPlay){
      this.audioCtx.pause()
    }else{
      this.audioCtx.play()
    }
    this.setData({
      isPlay:!this.data.isPlay
    })
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