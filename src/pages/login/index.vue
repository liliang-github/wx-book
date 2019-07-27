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
               placeholder="用户名"
               v-model.lazy="form.username">
      </div>
      <line />
      <div class="form-input">
        <span class="icon"></span>
        <input type="text"
               placeholder="密码"
               v-model.lazy="form.password">
      </div>
      <line />
      <space height="30" />
      <div class="form-group">
        <a @click="navigationRegister"
           class="btn reg">注册</a>
        <a @click="login"
           class="btn log">登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import Line from '@/components/line'
import Space from '@/components/space'
import { mapActions } from 'vuex'
import { post, loading, loaded, success, info } from '../../utils/index'

export default {
  data () {
    return {
      bg: '',
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['setUser']),
    navigationRegister () {
      mpvue.navigateTo({ url: '/pages/register/main' })
    },
    async login () {
      try {
        loading('登录中...')
        const { data } = await post('/login', this.form)
        if (data.code === 0) {
          mpvue.navigateBack()
          this.setUser(data.data)
          success('登录成功')
        } else {
          info('用户名或密码错误')
        }
      } catch (e) {
        console.log(e)
        loaded()
      }
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
