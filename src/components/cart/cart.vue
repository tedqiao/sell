<template lang="html">
<div class="cart-wrapper">
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo">
          <span class="icon-shopping_cart"></span>
        </div>
      </div>
      <div class="spend">
        ¥ 0
      </div>
      <div class="desc">
        另需配送费¥ {{deliveryPrice}}元
      </div>
    </div>
    <div class="content-right">
      <div class="desc">
        ¥ {{minPrice}}起送
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    deliveryPrice: {
      type: Number,
    },
    minPrice: {
      type: Number,
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import './cart';
</style>
