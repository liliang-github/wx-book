<template>
  <div class="me">
    <div class="me-info-wrap">
      <image mode="aspectFill"
             class="me-bg"
             :src="avatarUrl"></image>
      <div class="me-info">
        <div class="avatar-wrap">
          <image mode="aspectFit"
                 :src="avatarUrl"
                 alt=""></image>
        </div>
        <div @click="navigationLogin"
             class="username">
          点击登录
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      avatarUrl: 'http://47.112.192.52/static/img/icons/4.png'
    }
  },
  methods: {
    navigationLogin () {
      mpvue.navigateTo({
        url: '/pages/login/main'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.me {
  width: 750rpx;

  .me-info-wrap {
    position: relative;
    height: 375rpx;
    overflow: hidden;

    .me-bg {
      position: absolute;
      width: 100%;
      filter: blur(10px);
    }

    .me-info {
      display: flex;
      width: 750rpx;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;

      .avatar-wrap {
        width: 200rpx;
        height: 200rpx;
        border: 1rpx solid rgb(230, 230, 230);
        padding: 10rpx;
        border-radius: 50%;

        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .username {
        margin-top: 20rpx;
        line-height: 50rpx;
        font-size: 36rpx;
        color: #fff;
      }
    }
  }
}
</style>
