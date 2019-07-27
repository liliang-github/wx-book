<template>
  <div class="detail">
    <div class="cover-wrap">
      <image class="bg"
             :src="book.image" />
      <div class="cover-desc">
        <image mode="aspectFill"
               :src="book.image" />
        <p class="title">{{book.title}}</p>
        <p class="title">{{book.author}}</p>
      </div>
    </div>
    <div class="content">
      <div class="row">
        <div>{{book.nickname}}</div>
        <div>{{book.rating}}</div>
      </div>
      <div class="row">
        <div>{{book.publisher}}</div>
        <div>{{book.price}}</div>
      </div>
      <badge v-for="tag in tags"
             :key="tag"
             :value="tag"
             color="#FF3030" />

      <div class="summary">
        <p class="sum"
           v-for="sum in summary"
           :key="sum">
          {{sum}}
        </p>
      </div>
    </div>
    <div class="comment"
         v-show="isComment">
      <textarea class="textarea"
                v-model="comment"
                maxlength="100"
                rows="4"
                placeholder="请输入评论"></textarea>
      <div class="location">
        地理位置:
        <switch @change="locationChange" />
        {{location}}
      </div>
      <div class="phone">
        手机型号:
        <switch @change="phoneChange" />
        {{phone}}
      </div>
      <button @click="commentSubmit"
              type="primary"
              class="btn">评论</button>
    </div>
    <comment-list :comments="comments" />
    <button type="warn"
            class="share"
            open-type="share">发送给好友</button>
  </div>
</template>
<script>
import { get, post, info } from '@/utils'
import { mapState } from 'vuex'
import Badge from '@/components/badge'
import CommentList from '@/components/commentList'
export default {
  data () {
    return {
      book: {},
      comment: '',
      location: '',
      phone: '',
      comments: [],
      commenting: false
    }
  },
  onLoad () {
    const id = this.$root.$mp.query.id
    this.loadBook(id)
    this.loadComments(id)
    this.comment = ''
    this.location = ''
    this.phone = ''
  },
  methods: {
    async loadBook (id) {
      const { data } = await get('/book', { id })
      if (data.code === 0) {
        this.book = data.data
      }
    },
    async loadComments (bookid) {
      const { data } = await get('/comment', { bookid })
      if (data.code === 0) {
        this.comments = data.data
      } else {
        info(data.data)
      }
    },
    phoneChange (e) {
      if (e.target.value) {
        const info = mpvue.getSystemInfoSync()
        this.phone = info.model
      } else {
        this.phone = ''
      }
    },
    locationChange (e) {
      if (e.target.value) {
        mpvue.getLocation({
          success: (res) => {
            this.location = res.latitude + res.longitude
          }
        })
      } else {
        this.location = ''
      }
    },
    async commentSubmit () {
      if (!this.comment && !this.commenting) return
      this.commenting = true
      let params = {
        comment: this.comment,
        bookid: this.book.id,
        userid: this.user.id,
        phone: this.phone,
        location: this.location,
        token: this.user.token
      }
      const { data } = await post('/comment', params)
      if (data.code === 0) {
        info(data.data)
        this.loadComments(this.book.id)
      } else {
        info(data.data)
      }
      this.commenting = false
    }
  },
  computed: {
    tags () {
      return this.book.tags && this.book.tags.split(',')
    },
    summary () {
      return this.book.summary && this.book.summary.split('\n')
    },
    ...mapState(['user']),
    isComment () {
      if (!this.user.token) {
        return false
      }
      if (this.comments.find(el => el.userid === this.user.id)) {
        return false
      }
      return true
    }
  },
  components: {
    Badge,
    CommentList
  }
}
</script>
<style lang="stylus" scoped>
.detail {
  height: 400rpx;

  .cover-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    overflow: hidden;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      filter: blur(10px);
    }

    .cover-desc {
      position: relative;
      z-index: 10;
      text-align: center;

      image {
        width: 200rpx;
        height: 300rpx;
      }

      .title {
        text-align: center;
        color: #fff;
      }
    }
  }

  .content {
    padding: 20rpx;

    .row {
      display: flex;
      justify-content: space-between;
      font-size: 30rpx;
      line-height: 50rpx;
    }

    .summary {
      padding: 20rpx;
      font-size: 30rpx;

      .sum {
        text-indent: 2em;
      }
    }
  }

  .comment {
    font-size: 30rpx;

    .textarea {
      width: 100%;
      height: 200rpx;
      padding: 20rpx;
      box-sizing: border-box;
      background-color: #eeeeee;
    }

    .location, .phone {
      display: flex;
      align-items: center;
      padding: 10rpx;
    }

    .btn {
      padding: 10rpx;
    }
  }

  .share {
    padding: 10rpx;
    font-size: 30rpx;
  }
}
</style>

