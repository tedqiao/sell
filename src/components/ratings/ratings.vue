<template lang="html">
  <div class="ratings">
    <div class="ratings-info">
      <div class="info-left">
        <div class="overall-score">
          {{seller.serviceScore}}
        </div>
        <div class="text">
          综合评分
          <div class="comparsion">
            高于周边商家{{seller.rankRate}}%
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="service-score">
          <span class="">服务态度</span><star
          class="star-wapper"
          :size="36"
          :score="seller.serviceScore"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="service-score">
          <span class="">服务态度</span><star
          class="star-wapper"
          :size="36"
          :score="seller.foodScore"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery">
          <span class="text">送达时间</span><span class="delivery-time">44分钟</span>
        </div>
      </div>
    </div>
    <spliter></spliter>
    <comments-tookit
    :ratings="ratings"
    :ratingTypes="ratingTypes"
    :contentFilter="contentFilter"
    :seletedType = "commentsType"
    @typeHandler="handleratingsType"
    @contentFilterHandler="handleContentFilter"></comments-tookit>
    <div class="comments-list">
      <ul>
        <li v-for="(rating,index) in computedRatings" :key="index">
          <div class="comment">
            <div class="top">
              <div class="top-left">
                <img :src="rating.avatar" alt="">
              </div>
              <div class="top-middle">
                <div class="username">
                  {{rating.username}}
                </div>
                <div class="star-wrapper">
                  <star class="star"
                  :size="24"
                  :score="rating.score"></star>
                  <div v-show="rating.deliveryTime && rating.deliveryTime > 0"
                    class="delivery-time">{{rating.deliveryTime}}送达时间</div>
                </div>
              </div>
              <div class="top-right">
                {{rating.rateTime}}
              </div>
            </div>
            <div class="middle">
              {{rating.text}}
            </div>
            <div class="bottom">
              <div class="icon">
                <span :class="rateType[rating.rateType]"></span>
                <span class="recommend"
                v-for="(recommend,index) in rating.recommend"
                :key="index">
                      {{recommend}}
                 </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import spliter from '../spliter/spliter';
import star from '../star/star';
import commentsTookit from '../commentsTookit/commentsTookit';

const ERR_NO = 0;
export default {
  data() {
    return {
      ratings: [],
      commentsType: 2,
      contentFilter: false,
    };
  },
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    spliter,
    star,
    commentsTookit,
  },
  created() {
    this.ratingTypes = ['全部', '满意', '不满意'];
    this.$http.get('http://localhost:3000/api/ratings').then((res) => {
      const response = res.body;
      if (response.erron !== ERR_NO) {
        this.ratings = response.data;
        this.$nextTick(() => {
        });
      }
    });
    this.rateType = ['icon-thumb_up thumb_up', 'icon-thumb_down'];
  },
  methods: {
    handleratingsType(i) {
      this.commentsType = i;
    },
    handleContentFilter(i) {
      this.contentFilter = i;
    },
  },
  computed: {
    computedRatings() {
      if (this.commentsType === 2 && !this.contentFilter) {
        return this.ratings;
      } else if (this.commentsType === 2 && this.contentFilter) {
        return this.ratings.filter(r => r.text.length !== 0);
      }
      if (this.contentFilter) {
        return this.ratings.filter(r => r.rateType === this.commentsType
        && r.text.length !== 0);
      }
      return this.ratings.filter(r => r.rateType === this.commentsType);
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
.ratings-info
  padding: 18px 0
  font-size:0px
  .info-left
    display: inline-block
    box-sizing:border-box
    text-align:center
    width:137px
    border-right:1px solid rgba(0,0,0,0.1)
    .overall-score
      font-size:24px
      color:rgb(255,153,0)
      line-height:28px
    .text
      padding:6px 0
      font-size:12px
      color:rgb(7,17,27)
      line-height:12px
      .comparsion
        margin-top:8px
        font-size:10px
        color:rgba(7,17,27,0.4)
        line-height:10px
  .info-right
    display: inline-block
    vertical-align:top
    box-sizing:border-box
    padding-left:24px
    .service-score
      font-size:12px
      color:rgb(7,17,27)
      line-height:18px
      padding-bottom:8px
      .star-wapper
        display: inline-block
        font-size:12px
        line-height:12px
        vertical-align:middle
        padding:0 12px
    .score
      font-size:12px
      color:rgb(255,153,0)
      line-height:18px
    .delivery
      font-size:12px
      color:rgb(7,17,27)
      line-height:18px
      .delivery-time
        margin-left:12px
        font-size:12px
        color:rgb(147,153,159)
        line-height:18px
.comments-list
  padding: 0 18px
  .comment
    padding: 18px 0
    border-bottom:1px solid rgba(7,17,27,0.1)
    .top
      position:relative
      font-size:0
      .top-left
        display:inline-block
        width:28px
        height:28px
        img
          width:28px
          height:28px
          border-radius:50%
      .top-middle
        display:inline-block
        vertical-align:top
        margin-left:12px
        .username
          font-size:10px
          color:rgb(7,17,27)
          line-height:12px
        .star-wrapper
          padding-top:4px
          .star
            display:inline-block
          .delivery-time
            display:inline-block
            margin-left:6px
            font-size:10px
            color:rgb(147,153,159)
            line-height:12px
      .top-right
        position:absolute
        right:0
        top:0
        font-size:10px
        color:rgb(147,153,159)
        line-height:12px
        font-weight:200
    .middle
      margin-top: 6px
      margin-left: 40px
      font-size:12px
      color:rgb(7,17,27)
      line-height:18px
    .bottom
      margin-left: 40px
      margin-top:8px
      vertical-align:top
      font-size:0
      .icon
        vertical-align:top
        width:300px
        font-size:12px
        color:rgb(183,187,191)
        line-height:16px
        .thumb_up
          color:rgb(0,160,220)
        .recommend
          margin-left:8px
          padding:0 6px
          width:50px
          height:12px
          font-size:9px
          color:rgb(147,153,159)
          line-height:12px
          border:1px solid rgba(7,17,27,0.1)
          border-radius:1px
          overflow:hidden
</style>
