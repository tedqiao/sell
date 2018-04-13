<template lang="html">
<div class="seller-info">
  <div class="basic-info">
    <div class="name">
      {{seller.name}}
    </div>
    <div class="comments">
      <star class="star" :score="3" :size="36"></star>
      <span class="number">(661)</span>
      <span class="sells">月销售{{seller.sellCount}}单</span>
    </div>
    <div class="delivery-detail">
      <div class="extra">
      <div class="title">
        起送价
      </div>
      <div class="number">
        {{seller.minPrice}}<span class="unit">元</span>
      </div>
    </div>
    <div class="extra">
      <div class="title">
        单位配送
      </div>
      <div class="number">
        {{seller.deliveryPrice}}<span class="unit">元</span>
      </div>
    </div>
    <div class="extra">
      <div class="title">
        平均配送时间
      </div>
      <div class="number">
        {{seller.deliveryTime}}<span class="unit">分钟</span>
      </div>
    </div>
    </div>
  </div>
  <spliter></spliter>
  <cart
    :delivery-price="seller.deliveryPrice"
    :min-price="seller.minPrice"
    @clean-cart="clean"
    @removeEvent="removeEvent"
    @addEvent="addEvent"
    ></cart>
</div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
import spliter from '../spliter/spliter';
import cart from '../cart/cart';

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    star,
    spliter,
    cart,
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
.basic-info
  padding:18px 18px 0 18px
  .name
    font-size:14px
    color:rgb(7,17,27)
    line-height:14px
  .comments
    padding:8px 0 18px 0
    font-size:0
    border-bottom:1px solid rgba(0,0,0,0.1)
    .star
      display:inline-block
    .number, .sells
      display:inline-block
      vertical-align:top
      font-size:10px
      color:rgb(77,85,93)
      line-height:18px
    .number
      margin-left:8px
    .sells
      margin-left:12px
  .delivery-detail
    display:flex
    padding:18px 0
    font-size:0
    .extra
      flex:1
      text-align:center
      border-right:1px solid rgba(0,0,0,0.1)
      &:last-child
        border-right:0px
      .title
        font-size:10px
        color:rgb(147,153,159)
        line-height:10px
      .number
        margin-top:4px
        font-size:24px
        color:rgb(7,17,27)
        line-height:24px
        font-weight:200
        .unit
          font-size:10px
</style>
