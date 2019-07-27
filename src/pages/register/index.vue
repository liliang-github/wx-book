<template>
  <div class="register">
    <div class="logo">

    </div>
    <space height="30" />
    <line />
    <div class="form">
      <div class="form-input">
        <label>用户名</label>
        <input minlength="2"
               maxlength="10"
               type="text"
               placeholder="请输入用户名"
               v-model.lazy="form.username">
      </div>
      <line />
      <div class="form-input">
        <label>昵称</label>
        <input minlength="2"
               maxlength="10"
               type="text"
               placeholder="请输入昵称"
               v-model.lazy="form.nickname">
      </div>
      <line />
      <space height="30" />
      <line />
      <div class="form-input">
        <label>密码</label>
        <input minlength="6"
               maxlength="16"
               type="password"
               placeholder="请输入密码"
               v-model.lazy="form.password">
      </div>
      <line />
      <space height="30" />
      <a @click.stop.prevent="register"
         class="btn">注册</a>
    </div>
  </div>
</template>
<script>
import Line from '@/components/line'
import Space from '@/components/space'
import { post, loading, loaded, info, success } from '@/utils'
export default {
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  onReady () {
    this.form = {}
  },
  methods: {
    async register () {
      loading('注册中...')
      try {
        const { data } = await post('/register', this.form)
        if (data.code === 0) {
          // 注册成功
          mpvue.navigateBack()
          success('注册成功')
        } else {
          // 用户名或密码无效
          info(data.data)
        }
      } finally {
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
.register {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;

  .form {
    .form-input {
      align-items: center;

      label {
        width: 120rpx;
      }

      input {
        flex: 1;
      }
    }

    .btn {
      margin: 0 40rpx;
      color: #fff;
      background-color: #07c160;
    }
  }
}
</style>
