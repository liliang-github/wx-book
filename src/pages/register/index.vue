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
               v-model.lazy.trim="form.username">
      </div>
      <line />
      <div class="form-input">
        <label>昵称</label>
        <input minlength="2"
               maxlength="10"
               type="text"
               placeholder="请输入昵称"
               v-model.lazy.trim="form.nickname">
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
               v-model.lazy.trim="form.password">
      </div>
      <line />
      <space height="30" />
      <a class="btn">注册</a>
    </div>
  </div>
</template>
<script>
import Line from '@/components/line'
import Space from '@/components/space'
export default {
  data () {
    return {
      form: {

      }
    }
  },
  methods: {

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
