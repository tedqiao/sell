<template lang="html">
<div>
  <div class="cart-wrapper">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="showCart">
          <div class="logo" :class="{'highlignt':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlignt':totalCount>0}"></span>
          </div>
          <transition name="bounce">
            <div v-show="totalCount>0" class="num">
              {{totalCount}}
            </div>
          </transition>
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
    <transition name="cart-fade">
      <div v-show="displayCart" class="cart-list-wrapper">
        <div class="title-wrapper">
          <h1 class="title">
            购物车
          </h1>
          <div class="clean-wrapper" @click="cleanCart()">
            <a herf="" class="clean-button">清空</a>
          </div>
        </div>
        <div class="cart-content" ref="cartList">
          <ul>
          <li v-for="(item,index) in itemsInCart" :key="index" class="cart-item">
              <span class="name">
                {{item.name}}
              </span>
              <div class="price">
                <span class="sign">¥</span><span class="">{{item.price}}
                </span>
              </div>
              <div class="cart">
                <cart-control
                  :item="item"
                  :checkOutList="itemsInCart"
                  @removeEvent="removeEvent"
                  @addEvent="addEvent"></cart-control>
              </div>
          </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="mask-fade">
  <div class="mask" v-show="displayCart">
  </div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
import Bs from 'better-scroll';
import cartcontrol from '../cartcontrol/cartControl';

export default {
  data() {
    return {
      show: false,
    };
  },
  components: {
    'cart-control': cartcontrol,
  },
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
    displayCart() {
      return this.itemsInCart.length > 0 && this.show;
    },
  },
  methods: {
    removeEvent(i) {
      if (this.itemsInCart.length === 0) {
        this.show = false;
      }
      this.$emit('removeEvent', i);
    },
    addEvent(i) {
      this.$emit('addEvent', i);
    },
    cleanCart() {
      this.show = false;
      this.$emit('clean-cart', {});
    },
    showCart() {
      if (this.cartScroll) {
        this.cartScroll.refresh();
      } else {
        this.$nextTick(() => {
          this.cartScroll = new Bs(this.$refs.cartList, {
            click: true,
          });
        });
      }
      if (this.itemsInCart.length > 0) {
        this.show = !this.show;
      }
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import './cart';
</style>
