<template>
  <div class="login">
    <div class="logo">
      <image style="height:300rpx"
             mode="aspectFill"
             src="/static/images/logo.gif" />
    </div>
    <div class="form">
      <div class="form-input">
        <span class="icon"></span>
        <input type="text"
               placeholder="用户名">
      </div>
      <line />
      <div class="form-input">
        <span class="icon"></span>
        <input type="text"
               placeholder="密码">
      </div>
      <line />
      <space height="30" />
      <div class="form-group">
        <a @click="navigationRegister"
           class="btn reg">注册</a>
        <a class="btn log">登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import Line from '@/components/line'
import Space from '@/components/space'
export default {
  data () {
    return {
      bg: ''
    }
  },
  methods: {
    navigationRegister () {
      mpvue.navigateTo({ url: '/pages/register/main' })
    }
  },
  components: {
    Line,
    Space
  }
}
</script>
<style lang="stylus" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;

  .logo {
  }

  .form {
    .form-group {
      display: flex;
      padding: 0 20rpx;

      .btn {
        flex: 1;
        margin: 0 20rpx;
      }

      .btn.reg {
        background-color: #fbfbfb;
      }

      .btn.log {
        background-color: #07c160;
        color: #fff;
      }
    }
  }
}
</style>
