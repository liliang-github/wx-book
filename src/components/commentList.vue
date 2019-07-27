<template>
  <div class="comment-list">
    <div class="title">评论列表</div>
    <div class="comment-item"
         @click="clickItem(comment)"
         v-for="comment in comments"
         :key="comment.id">
      <div class="header">
        <div class="left">
          <image src="http://47.112.192.52/static/img/icons/4.png" />
          {{ comment.nickname }}
        </div>
        <div class="right">
          {{comment.phone || '未知型号'}}|{{comment.location || '未知位置'}}
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
    <div v-show="!comments.length"
         class="no-comment">
      空空如也
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    clickItem (comment) {
      this.$emit('clickItem', comment)
    }
  }
}
</script>
<style lang="stylus" scoped>
.comment-list {
  width: 100%;

  .title {
    line-height: 80rpx;
    text-indent: 1em;
    font-size: 32rpx;
    background-color: #eee;
    color: #666;
  }

  .comment-item {
    padding: 20rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
      font-size: 30rpx;

      image {
        display: inline-block;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
    }

    .content {
      margin: 20rpx 0;
      font-size: 30rpx;
    }
  }

  .no-comment {
    width: 100%;
    padding: 30rpx;
    text-align: center;
  }
}
</style>
