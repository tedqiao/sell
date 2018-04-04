<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
          <router-link to="ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script type="text/ecmascript-6">
import header from '@/components/header/header';
import star from '@/components/star/star';

const ERR_NO = 0;
export default {
  name: 'App',
  data() {
    return {
      seller: {},
    };
  },
  created() {
    this.$http.get('http://localhost:3000/api/seller').then((res) => {
      const response = res.body;
      if (response.erron !== ERR_NO) {
        this.seller = response.data;
      }
    });
  },
  components: {
    'v-header': header,
    star,
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import "./common/stylus/mixin.styl"

#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    .tab-item
      flex: 1
      text-align: center
      &>a
        display: block
        font-size: 14px
        color: rgb(77,85,93)
        &.active
          color: rgb(240,20,20)
</style>
