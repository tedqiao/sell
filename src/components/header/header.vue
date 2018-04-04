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
    <div v-show="details" class="details" transition="fade">
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
            <li v-for="support in seller.supports"
                 :key="$index"
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
  .header
    position: relative
    overflow: hidden
    color: #fff
    background-color: rgba(7,17,27,0.5)
    .content-wrapper
      position: relative
      padding: 24px 18px 12px 24px
      font-size: 0px;
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px;
      .content
        display: inline-block
        vertical-align: top
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0px 8px 0px
          .brand
            display:inline-block;
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-top: 8px
          line-height: 12px
          font-size: 12px
          font-weight: 200
        .support
          margin-top: 10px
          font-size: 0px
          .icon
            vertical-align: top
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('./img/decrease_1')
            &.discount
              bg-image('./img/discount_1')
            &.special
              bg-image('./img/special_1')
            &.invoice
              bg-image('./img/invoice_1')
            &.guarantee
              bg-image('./img/guarantee_1')
          .text
            display: inline-block
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0px 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color:rgba(0,0,0,0.2)
        text-align: center;
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7,17,27,0.2)
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        margin-left: 12px
        margin-top: 8px
        bg-image('./img/bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin:0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        bottom: 8px
        text-align: center
    .background
      position: absolute
      top:0
      left:0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .details
      position: fixed
      top:0
      left:0
      width: 100%
      height: 100%
      z-index: 100
      overflow: auto
      transition: all 0.5s
      &.fade-transition
        opacity: 1
        background:rgba(7,17,27,0.8)
      &.fade-enter,&.fade-leave
        opacity: 0
        background:rgba(7,17,27,0.8)
      .detail-wrapper
        min-height: 100%
        width:100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
            .star-wrapper
              margin-top: 18px
              padding:2px 0
              text-align: center
          .title
            display:flex
            font-size:0
            width:80%
            margin: 28px auto 24px auto
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
            .line
              flex:1
              position: relative
              top:-6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
          .content
            width:80%
            margin: 0 auto
            .support
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                vertical-align: top
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('./img/decrease_2')
                &.discount
                  bg-image('./img/discount_2')
                &.special
                  bg-image('./img/special_2')
                &.invoice
                  bg-image('./img/invoice_2')
                &.guarantee
                  bg-image('./img/guarantee_2')
              .text
                font-size: 12px
                font-weight: 200
                line-height:16px
          .bulletin
            width:80%
            margin: 0 auto
            .bulletin-content
              padding:0 12px
              line-height: 24px
              font-size: 12px



      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear:both
        font-size: 32px

</style>
