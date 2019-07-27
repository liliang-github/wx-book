<template>
  <div class="hot-swiper">
    <swiper>
      <swiper-item v-for="(page,index) in boosPages"
                   :key="index">
        <div class="pages">
          <div class="page-item"
               v-for="(book,i) in page"
               :key="i"
               @click="clickItem(book)">
            <image :src="book.image" />
            <p>{{book.title}}</p>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { chunk } from '@/utils'
export default {
  props: {
    books: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    clickItem (book) {
      this.$emit('clickItem', book)
    }
  },
  computed: {
    boosPages () {
      return chunk(this.books, 3)
    }
  }
}
</script>
<style lang="stylus" scoped>
.hot-swiper {
  width: 100%;

  .pages {
    display: flex;
    width: 100%;

    .page-item {
      flex: 1;
      text-align: center;
      overflow: hidden;

      image {
        max-width: 200rpx;
        max-height: 300rpx;
      }

      p {
        font-size: 30rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
