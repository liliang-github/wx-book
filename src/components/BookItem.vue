<template>
  <div class="book-item"
       @click="clickItem">
    <div class="image-wrap">
      <image @click.stop="clickCover"
             mode="aspectFit"
             class="image"
             :src="book.image" />
    </div>
    <div class="desc">
      <div class="desc-row">
        <div>{{book.title}}</div>
        <div>{{book.rating}}
          <star :rating="book.rating" />
        </div>
      </div>
      <div class="desc-row">
        <div>{{book.author}}</div>
        <div>浏览量{{book.hot}}</div>
      </div>
      <div class="desc-row">
        <div>{{book.publisher}}</div>
        <div>{{book.nickname}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Star from './star'
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickItem () {
      this.$emit('clickItem', this.book)
    },
    clickCover () {
      this.$emit('clickCover', this.book)
    }
  },
  components: {
    Star
  }
}
</script>
<style lang="stylus" scoped>
.book-item {
  display: flex;
  height: 300rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid #eee;

  .image-wrap {
    width: 200rpx;
    height: 100%;
    margin-right: 20rpx;

    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .desc {
    flex: 1;
    line-height: 60rpx;
    font-size: 30rpx;

    .desc-row {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
