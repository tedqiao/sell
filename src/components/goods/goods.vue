<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <div class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(good,index) in goods" :key="index" class="good">
          <h1 class="title">
              {{good.name}}
          </h1>
          <ul>
            <li v-for="(food,i) in good.foods" :key="i" class="food border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="description">
                  {{food.description}}
                </p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}</span><span
                  class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">¥ {{food.price}}</span>
                  <span v-show="food.oldPrice.length !== 0" class="old">
                    ¥{{food.oldPrice}}
                  </span>
                </div>
              </div>
              <div class="">

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import Bscroll from 'better-scroll';

const ERR_NO = 0;

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      goods: [],
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('http://localhost:3000/api/goods').then((res) => {
      const response = res.body;
      if (response.erron !== ERR_NO) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initBS();
        });
      }
    });
  },
  methods: {
    _initBS() {
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {});
      this.foodScroll = new Bscroll(this.$refs.foodWrapper, {});
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import './goods.styl'
</style>
