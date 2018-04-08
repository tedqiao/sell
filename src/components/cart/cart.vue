<template lang="html">
<div class="cart-wrapper">
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlignt':totalCount>0}">
          <span class="icon-shopping_cart" :class="{'highlignt':totalCount>0}"></span>
        </div>
        <div v-show="totalCount>0" class="num">
          {{totalCount}}
        </div>
      </div>
      <div class="payment" :class="{'highlignt':totalPrice>0}">
        ¥ {{totalPrice}}
      </div>
      <div class="desc">
        另需配送费¥ {{deliveryPrice}}元
      </div>
    </div>
    <div class="content-right">
      <div class="pay"
      :class="{'checkout':this.minPrice<=this.totalPrice}">
        {{contentRdesc}}
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
    itemsInCart: {
      type: Array,
      default() {
        return [{ price: 10, count: 1 }];
      },
    },
  },
  computed: {
    totalCount() {
      let count = 0;
      this.itemsInCart.forEach((item) => {
        count += item.count;
      });
      return count;
    },
    totalPrice() {
      let price = 0;
      this.itemsInCart.forEach((item) => {
        price += item.price * item.count;
      });
      return price;
    },
    contentRdesc() {
      if (this.totalPrice === 0) {
        return `¥ ${this.minPrice}起送`;
      }

      if (this.totalPrice >= this.minPrice) {
        return '去结账';
      }
      return `还差¥ ${this.minPrice - this.totalPrice}起送`;
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import './cart';
</style>
