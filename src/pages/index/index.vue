<template>
  <div class="index">
    <hot-swiper @clickItem="clickItem"
                :books="hotbooks" />
    <book-item @clickCover="clickCover"
               @clickItem="clickItem"
               v-for="book in books"
               :book="book"
               :key="book.id"></book-item>
    <div v-show="!more"
         class="more">没有更多数据了</div>
  </div>
</template>

<script>
import BookItem from '@/components/BookItem'
import HotSwiper from '@/components/hotSwiper'
import { get, info } from '@/utils'
export default {
  data () {
    return {
      currentPage: 1,
      books: [],
      hotbooks: [],
      more: true,
      size: 5
    }
  },
  components: {
    BookItem,
    HotSwiper
  },
  created () {
    this.loadBookList(true)
    this.loadHotBooks()
  },
  methods: {
    async loadBookList (refresh) {
      try {
        mpvue.showNavigationBarLoading()
        const { data } = await get('/booklist', { page: this.currentPage, size: this.size })
        if (data.code === 0) {
          if (refresh) {
            this.books = data.data
          } else {
            this.books = this.books.concat(data.data)
          }

          if (data.data.length < this.size) { this.more = false }
        } else {
          info('网络错误')
        }
      } catch (e) {
        info('网络错误')
      } finally {
        mpvue.hideNavigationBarLoading()
        mpvue.stopPullDownRefresh()
      }
    },
    async loadHotBooks () {
      try {
        const { data } = await get('/hotbook')
        if (data.code === 0) {
          this.hotbooks = data.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    clickItem (book) {
      mpvue.navigateTo({ url: `/pages/detail/main?id=${book.id}` })
    },
    clickCover (book) {
      mpvue.previewImage({
        urls: [book.image]
      })
    }
  },
  onPullDownRefresh () {
    this.currentPage = 1
    this.loadBookList(true)
  },
  onReachBottom () {
    if (this.more) {
      this.currentPage++
      this.loadBookList(false)
    }
  }

}
</script>

<style lang="stylus" scoped>
.index {
  .more {
    padding: 20rpx 0;
    text-align: center;
    font-size: 30rpx;
  }
}
</style>