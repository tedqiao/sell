<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index"
        :class="{'current':currentIndex === index}"
        @click="selectMenu(index,$event)" class="menu-item  border-1px">
          <div class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(good,index) in goods" :key="index" class="good food-list-hook">
          <h1 class="title">
              {{good.name}}
          </h1>
          <ul>
            <li v-for="(food,i) in good.foods" :key="i" class="food border-1px ">
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
                  <span class="sellCount">月售{{food.sellCount}}份</span><span
                  class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">¥ {{food.price}}</span>
                  <span v-show="food.oldPrice.length !== 0" class="old">
                    ¥{{food.oldPrice}}
                  </span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control
                  :item="food"
                  :checkOutList="checkOutList"
                  @removeEvent="removeEvent"
                  @addEvent="addEvent"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <cart
    :itemsInCart="checkOutList"
    :delivery-price="seller.deliveryPrice"
    :min-price="seller.minPrice"></cart>
  </div>
</template>

<script type="text/ecmascript-6">

import Bscroll from 'better-scroll';
import cart from '../cart/cart';
import cartControl from '../cartcontrol/cartControl';

const ERR_NO = 0;

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    cart,
    'cart-control': cartControl,
  },
  data() {
    return {
      goods: [],
      foodsListHeight: [],
      scorllY: 0,
      checkOutList: JSON.parse(localStorage.getItem(1)) || [],
    };
  },
  computed: {
    currentIndex() {
      let l = 0;
      let r = this.foodsListHeight.length - 1;
      const y = Math.round(this.scorllY);
      const list = this.foodsListHeight;
      if (list.length === 0) {
        return 0;
      }

      if (list.length === 1) {
        return list[0] < y ? 1 : 0;
      }

      while (l <= r) {
        const mid = Math.round((l + r) / 2);
        if (y === list[mid]) {
          return mid;
        } else if (y > list[mid]) {
          if (y < list[mid + 1]) {
            return mid;
          }
          l = mid + 1;
        } else {
          if (y > list[mid - 1]) {
            return mid - 1;
          }
          r = mid - 1;
        }
      }
      return 0;
    },
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('http://localhost:3000/api/goods').then((res) => {
      const response = res.body;
      if (response.erron !== ERR_NO) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initBS();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    _initBS() {
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
        click: true,
      });

      this.foodScroll = new Bscroll(this.$refs.foodWrapper, {
        probeType: 3,
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scorllY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      const foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      this.foodsListHeight.push(0);
      for (let i = 0; i < foodList.length; i += 1) {
        this.foodsListHeight.push(foodList[i].clientHeight + this.foodsListHeight[i]);
      }
    },
    selectMenu(i, e) {
      // eslint-disable-next-line
      if (!e._constructed) {
        return;
      }
      const foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      this.foodScroll.scrollToElement(foodList[i], 300);
    },
    removeEvent(i) {
      const food = this.checkOutList.filter(item => i.name === item.name)[0];
      if (food && food.count > 0) {
        food.count -= 1;
      } else {
        delete this.checkOutList[food];
      }
      localStorage.setItem(1, JSON.stringify(this.checkOutList));
    },
    addEvent(i) {
      const food = this.checkOutList.filter(item => i.name === item.name)[0];
      if (food) {
        food.count += 1;
      } else {
        this.checkOutList.push({ name: i.name, count: 1, price: i.price });
      }
      localStorage.setItem(1, JSON.stringify(this.checkOutList));
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import './goods.styl'
</style>
