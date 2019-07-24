<template>
  <div class="space"
       :style="{height:height+'rpx',backgroundColor:color}"></div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 10
    },
    color: {
      type: String,
      default: 'transparent'
    }
  }
}
</script>
<style lang="stylus" scoped>
.space {
  width: 100%;
}
</style>
