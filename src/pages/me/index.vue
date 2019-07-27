<template>
  <div class="me">
    <div class="me-info-wrap">
      <image mode="aspectFill"
             class="me-bg"
             :src="avatar"></image>
      <div class="me-info">
        <div class="avatar-wrap">
          <image @click="selectAvatar"
                 mode="aspectFit"
                 :src="avatar"
                 alt=""></image>
        </div>
        <div @click="navigationLogin"
             class="username">
          {{user.nickname || '点击登录'}}
        </div>
      </div>
      <button @click="scanBook"
              class="add-book">扫</button>
      <add-book v-if="isAddBook"
                @close="isAddBook = false"
                @add="addBook" />
    </div>
    <tab-page @clickItem="clickItem"
              :books="books"
              :comments="comments">
    </tab-page>
  </div>
</template>
<script>
import { chooseImage, post, get, success, info, loading, loaded } from '@/utils'
import { mapState, mapGetters } from 'vuex'
import addBook from '@/components/addBook'
import TabPage from '@/components/tabPage'
export default {
  data () {
    return {
      isAddBook: false,
      comments: [],
      books: [],
      currentPage: 1,
      size: 50
    }
  },
  async created () {
    this.loadAll()
  },
  methods: {

    // 跳转登录界面
    navigationLogin () {
      if (this.user.token) return
      mpvue.navigateTo({
        url: '/pages/login/main'
      })
    },
    // 上传头像
    selectAvatar () {
      if (!this.user.token) return
      chooseImage().then((result) => {
        console.log(result)
      }).catch(() => {
        console.log('取消')
      })
    },
    scanBook () {
      this.isAddBook = true
      // scanCode().then((result) => {
      //   console.log(result)
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    async addBook (code) {
      this.isAddBook = false
      try {
        loading('添加中...')
        const { data } = await post('/addbook', { code, token: this.user.token })
        if (data.code === 0) {
          success(`添加${data.data.title}成功`)
        } else {
          info(data.data)
        }
      } finally {
        loaded()
      }
    },
    async loadComments (userid) {
      const { data } = await get('/comment', { userid })
      if (data.code === 0) {
        this.comments = data.data
      } else {
        info(data.data)
      }
    },
    async loadBookList (refresh) {
      try {
        const { data } = await get('/booklist', { page: this.currentPage, size: this.size })
        if (data.code === 0) {
          if (refresh) {
            this.books = data.data
          } else {
            this.books = this.books.concat(data.data)
          }

          if (data.data.length < 5) { this.more = false }
        } else {
          info('网络错误')
        }
      } catch (e) {
        info('网络错误')
      }
    },
    clickItem (id) {
      mpvue.navigateTo({ url: `/pages/detail/main?id=${id}` })
    },
    async loadAll () {
      if (this.user.token) {
        mpvue.showNavigationBarLoading()
        await this.loadComments(this.user.id)
        await this.loadBookList(true)
        mpvue.hideNavigationBarLoading()
        mpvue.stopPullDownRefresh()
      }
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['avatar'])
  },
  components: {
    addBook,
    TabPage
  },
  watch: {
    user: {
      deep: true,
      handler () {
        this.loadAll()
      }
    }
  },
  onPullDownRefresh () {
    this.loadAll()
  }
}
</script>
<style lang="stylus" scoped>
.me {
  display: flex;
  flex-direction: column;
  width: 750rpx;
  height: 100%;

  .me-info-wrap {
    position: relative;
    height: 375rpx;
    overflow: hidden;

    .me-bg {
      position: absolute;
      width: 100%;
      height: 100%;
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
        color: #666;
      }
    }

    .add-book {
      position: absolute;
      top: 0;
      right: 0;
      padding: 10px;
      background-color: transparent;
      line-height: 30rpx;
      font-size: 30rpx;
      z-index: 1;
    }
  }
}
</style>
