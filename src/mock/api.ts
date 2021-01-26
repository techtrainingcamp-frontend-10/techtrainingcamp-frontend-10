import Mock, { Random } from 'mockjs'

console.log('mockjs start')

Mock.setup({
  timeout: '200-600' // 设置响应时间
})

function getRandomArrayElements (arr: Array<any>, count: number) {
  const shuffled = arr.slice(0); let i = arr.length; const min = i - count; let temp; let index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

Random.extend({
  // 自定义占位符名字tags
  tags: function () {
    // 随机选择1-4个作为返回值
    const tags = ['一个普通公司的8年', '一个普通公司的7年', '一个普通公司的6年', '一个普通公司的5年']
    return getRandomArrayElements(tags, Math.floor(1 + Math.random() * 4))
  }
})

const url = {
  getVideoList: /.*\/getVideoList/,
  getLiveList: /.*\/getLiveList/
}

Mock.mock(url.getVideoList, {
  'videoList|5': [{
    'id|+1': Random.increment(),
    'author|1': ['字节君', '蛤蛤蛤', '肆无忌惮', '摩天大楼', '初学者'],
    'url|1': Random.pick([
      'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
      'https://tx.dogevideo.com/vcloud/17/v/20190424/1556036075_818c4125ec9c8cbc7a7a8a7cc1601512/1037/7d515b22c4958598c0fbd1e6290a5ca5.mp4?vkey=DE5721&tkey=16116692538a237d0f2a&auth_key=1611683653-yM7rkeMd7knW6RWb-0-50267a7035a2239ed1757fcef78228a7'
    ]),
    'description|1': Random.pick([
      '字节跳动8周年，不忘初心，Always Day1',
      '哈哈哈测试测试',
      '苟利国家生死以，岂因祸福避趋之'
    ]),
    'tagList|1': ['@tags'],
    'likes|100-10000': 10000,
    'comments|100-10000': 10000
  }]
})

Mock.mock(url.getLiveList, {
  'liveList|5': [{
    'id|+1': Random.increment(),
    'author|1': ['字节君', '蛤蛤蛤', '肆无忌惮', '摩天大楼', '初学者'],
    'url|1': Random.pick([
      '//sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8'
    ]),
    'description|1': Random.pick([
      '字节跳动8周年，不忘初心，Always Day1',
      '哈哈哈测试测试',
      '苟利国家生死以，岂因祸福避趋之'
    ]),
    'tagList|1': ['@tags'],
    'likes|100-10000': 10000,
    'comments|100-10000': 10000
  }]
})
