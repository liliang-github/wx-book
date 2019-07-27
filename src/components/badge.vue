<template>
  <div class="badge"
       :style="{borderColor:color,color:color}">{{value}}</div>
</template>
<script>
export default {
  props: ['value', 'color']
}
</script>
<style lang="stylus" scoped>
.badge {
  display: inline-block;
  padding: 10rpx 20rpx;
  margin: 5rpx 20rpx;
  border: 1px solid #99aa00;
  border-radius: 30rpx;
  font-size: 30rpx;
}
</style>
