<script>
import { mapState, mapActions } from 'vuex'
import { post } from './utils'
export default {
  async onLaunch () {
    // 校验用户
    let token = this.user.token
    const { data } = await post('/check', { token })
    if (data.code === 0) {
      console.log(data.data)
    } else {
      this.setUser({})
    }
  },
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['setUser'])
  }
}
</script>

<style lang="stylus">
page {
  height: 100%;
}

.container {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.form-input {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 10rpx 20rpx;
  background-color: #fff;
  font-size: 30rpx;

  input {
    height: 30rpx;
  }
}

image {
  width: 100%;
  vertical-align: middle;
}

.btn {
  position: relative;
  padding: 15rpx;
  border-radius: 15rpx;
  white-space: nowrap;
  font-size: 30rpx;
  text-align: center;
  overflow: hidden;
}

.btn:active::after {
  display: block;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(7, 17, 27, 0.1);
}
</style>
