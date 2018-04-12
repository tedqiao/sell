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
    <comments-tookit
    :ratings="food.ratings"
    :ratingTypes="ratingTypes"
    :contentFilter="contentFilter"
    @typeHandler="handleratingsType"
    @contentFilterHandler="handleContentFilter"></comments-tookit>
    <div class="comment-list">
      <ul>
        <li v-for="(rating,index) in ratings" :key="index">
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
import commentsTookit from '../commentsTookit/commentsTookit';

export default {
  data() {
    return {
      show: false,
      commentsType: 2,
      contentFilter: false,
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
    this.rateType = ['icon-thumb_up thumb_up', 'icon-thumb_down'];
    this.ratingTypes = ['全部', '推荐', '吐槽'];
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
    handleratingsType(i) {
      this.commentsType = i;
    },
    handleContentFilter(i) {
      this.contentFilter = i;
    },
  },
  components: {
    'cart-control': cartcontrol,
    'comments-tookit': commentsTookit,
    spliter,
  },
  computed: {
    showButton() {
      return this.checkOutList.filter(i => i.name === this.food.name).length > 0;
    },
    ratings() {
      if (this.commentsType === 2 && !this.contentFilter) {
        return this.food.ratings;
      } else if (this.commentsType === 2 && this.contentFilter) {
        return this.food.ratings.filter(r => r.text.length !== 0);
      }
      if (this.contentFilter) {
        return this.food.ratings.filter(r => r.rateType === this.commentsType
        && r.text.length !== 0);
      }
      return this.food.ratings.filter(r => r.rateType === this.commentsType);
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import './food'
</style>
