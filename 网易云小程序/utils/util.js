const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
//将对应的播放数量转为亿为单位
const formatCount = (count)=>{
  count = count.toString()
  let index
  //如果当前是万就写万如果是亿就写亿
  if(count.length>4 && count.length<8){
    //除以1万
    count = Number(count)/10000
    //找到.的位置
    index = count.toString().charAt(".")
    //截取后面取一位
    return count.toString().substring(0,index+2)+"万"
  }
   //如果是亿就写亿
   if(count.length>8){
    //除以1万
    count = Number(count)/100000000
    //找到.的位置
    index = Number(count.toString().charAt("."))+2
    //截取
    return count.toString().substring(0,index)+"亿"
  }
}
module.exports = {
  formatTime,
  formatCount
}
