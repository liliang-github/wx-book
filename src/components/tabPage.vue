<template>
  <div class="tab">
    <div class="tab-title">
      <div @click="clickTab(0)"
           class="tab-title-item"
           :class="{active:current==0}">图书</div>
      <div @click="clickTab(1)"
           class="tab-title-item"
           :class="{active:current==1}">评论</div>
    </div>
    <div class="tab-content">
      <swiper easing-function="easeOutCubic"
              class="swiper"
              :current="current"
              @change="swiperChange">
        <swiper-item class="swiper-item">
          <scroll-view scroll-y="true"
                       class="scroll">
            <book-item @clickItem="clickBook"
                       v-for="book in books"
                       :book="book"
                       :key="book.id"></book-item>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view scroll-y="true"
                       class="scroll">
            <comment-list @clickItem="clickComment"
                          :comments="comments" />
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
import CommentList from '@/components/commentList'
import BookItem from '@/components/BookItem'
export default {
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    books: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    clickTab (index) {
      this.current = index
    },
    swiperChange (e) {
      this.clickTab(e.mp.detail.current)
    },
    clickBook (book) {
      this.$emit('clickItem', book.id)
    },
    clickComment (comment) {
      this.$emit('clickItem', comment.bookid)
    }
  },
  components: {
    CommentList,
    BookItem
  }
}
</script>
<style lang="stylus" scoped>
.tab {
  display: flex;
  flex-direction: column;
  flex: 1;

  .tab-title {
    display: flex;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    font-size: 30rpx;

    .tab-title-item {
      flex: 1;
      box-sizing: border-box;

      &.active {
        color: darkgreen;
        border-bottom: 1rpx solid darkgreen;
      }
    }
  }

  .tab-content {
    flex: 1;

    .swiper, .scroll {
      height: 100%;
    }
  }
}
</style>
