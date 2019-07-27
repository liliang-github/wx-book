<template>
  <div class="star">
    <div class="star-detail">
      ☆☆☆☆☆
    </div>
    <div class="star-master"
         :style="{width:width}">
      ★★★★★
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0
    }
  },
  computed: {
    width () {
      return (this.rating / 10 * 100) + '%'
    }
  }
}
</script>
<style lang="stylus" scoped>
.star {
  display: inline-block;
  position: relative;

  .star-master {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
