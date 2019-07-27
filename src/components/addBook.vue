<template>
  <div class="add-book">
    <div class="modal">
      <input class="input"
             type="text"
             v-model="code"
             placeholder="图书条形码">
      <div class="btn-group">
        <button @click="$emit('close')"
                type="warn">取消</button>
        <button @click="$emit('add',code)"
                type="primary">添加</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      code: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.add-book {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(7, 17, 27, 0.2);
  z-index: 30;

  .modal {
    box-sizing: border-box;
    width: 80%;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 10rpx;

    .input {
      border: 1px solid #eee;
      padding: 20rpx;
      border-radius: 10rpx;
    }

    .btn-group {
      display: flex;
      flex-direction: row;
      margin-top: 20rpx;

      button {
        flex: 1;
        padding: 10rpx;
        font-size: 30rpx;
      }
    }
  }
}
</style>
