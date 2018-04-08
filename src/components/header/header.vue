<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt=""/>
      </div>
      <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetails">
        <span class="count">
          {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right" @click="showDetails"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width=100% height=100% alt="">
    </div>
    <transition name="fade">
      <div v-show="details" class="details">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">
              <h1>{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="content">
              <li v-for="(support, index) in seller.supports" :key="index"
                   class="support">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="bulletin-content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDetails">
          <i class="icon-close"></i>
        </div>
      </div>
     </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    star,
  },
  data() {
    return {
      details: false,
    };
  },
  methods: {
    showDetails() {
      this.details = !this.details;
    },
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
//
 @import '../../common/stylus/mixin'
 @import './header.styl'
</style>
