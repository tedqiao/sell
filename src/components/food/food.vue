<template lang="html">
<div v-show="show" class="food-detail" ref="foodDetail">
  <div>
    <div class="icon">
      <img :src="food.image" alt="">
      <div class="back" @click="showFoodDetails()">
        <span class="icon-arrow_lift"></span>
      </div>
    </div>
    <div class="details">
      <h1 class="name">
        {{food.name}}
      </h1>
      <div class="extra">
        <span class="sell">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%
        </span>
      </div>
      <div class="price">
        <span class="new">¥ {{food.price}} </span>
        <span v-show="food.oldPrice" class="old">
          ¥{{food.oldPrice}}
        </span>
      </div>
      <div  v-show="showButton" class="cart-control-wrapper">
        <cart-control
        :item="food"
        :checkOutList="checkOutList"
        @removeEvent="removeEvent"
        @addEvent="addEvent"></cart-control>
      </div>
      <div v-show="!showButton" @click="addEvent(food)" class="buy-button">
         加入购物车
      </div>
    </div>
    <spliter></spliter>
    <div class="food-info">
      <h1 class="title">
        产品介绍
      </h1>
      <div class="content">
        {{food.info}}
      </div>
    </div>
    <spliter></spliter>
    <div class="food-ratings">
      <h1 class="title">
        商品评价
      </h1>
      <div class="rating-types">
        <div class="all">
          全部 <span class="num">{{comments.all}}</span>
        </div>
        <div class="recommend">
          推荐 <span class="num">{{comments.recommend}}</span>
        </div>
        <div class="complaint">
          吐槽 <span class="num">{{comments.complaint}}</span>
        </div>
      </div>
    </div>
    <div class="comments-filter">
      <span class="icon-check_circle"></span><div class="content">
      只看有内容的评价
      </div>
    </div>
    <div class="comment-list">
      <ul>
        <li v-for="rating in this.food.ratings">
          <div class="comment-wrapper">
            <div class="rating-time">
              {{getTime(rating.rateTime)}}
            </div>
            <div class="commnet-content">
              <span class="commnet-icon" :class="rateType[rating.rateType]"></span>
              <div class="commnet-text">
                {{rating.text}}
              </div>
            </div>
            <div class="comment-user">
              <span class="user">{{rating.username}}</span>
              <img class="avatar" :src="rating.avatar" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Bs from 'better-scroll';
import cartcontrol from '../cartcontrol/cartControl';
import spliter from '../spliter/spliter';

export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    food: {
      type: Object,
      default() {
        return null;
      },
    },
    checkOutList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    this.rateType = ['icon-thumb_up', 'icon-thumb_down'];
  },
  methods: {
    showFoodDetails() {
      this.show = !this.show;
      if (this.fd) {
        this.fd.refresh();
      } else {
        this.$nextTick(() => {
          this.fd = new Bs(this.$refs.foodDetail, {
            click: true,
          });
        });
      }
    },
    getTime(timeStamp) {
      const d = new Date(timeStamp);
      return d;
    },
    removeEvent(i) {
      this.$emit('removeEvent', i);
    },
    addEvent(i) {
      this.$emit('addEvent', i);
    },
  },
  components: {
    'cart-control': cartcontrol,
    spliter,
  },
  computed: {
    showButton() {
      return this.checkOutList.filter(i => i.name === this.food.name).length > 0;
    },
    comments() {
      const comment = {
        all: 0,
        recommend: 0,
        complaint: 0,
      };
      if (this.food.ratings) {
        this.food.ratings.forEach((i) => {
          if (i.rateType === 0) {
            comment.recommend += 1;
          } else {
            comment.complaint += 1;
          }
          comment.all += 1;
        });
      }
      return comment;
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import './food'
</style>
