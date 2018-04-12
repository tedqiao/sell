<template lang="html">
<div class="">
  <div class="rating-types">
    <div class="all" @click="seleteType(2)" :class="{'active':seletedType===2}">
    {{ratingTypes[0]}} <span class="num">{{ratings.length || 0}}</span>
    </div>
    <div class="recommend" @click="seleteType(0)" :class="{'active':seletedType===0}">
    {{ratingTypes[1]}} <span class="num">{{recommend}}</span>
    </div>
    <div class="complaint" @click="seleteType(1)" :class="{'active':seletedType===1}">
    {{ratingTypes[2]}} <span class="num">{{complaint}}</span>
    </div>
  </div>
  <div class="comments-filter" @click="filterContent(contentFilter)">
    <span class="icon-check_circle" :class="{'active':contentFilter}"></span><div class="content">
    只看有内容的评价
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
// const TYPE_ALL = 2;
const TYPE_RECONMEND = 0;
const TYPE_COMPLAIN = 1;

export default {
  data() {
    return {
      seletedType: 2,
    };
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      },
    },
    ratingTypes: {
      type: Array,
      default() {
        return [];
      },
    },
    contentFilter: {
      type: Boolean,
    },
  },
  computed: {
    recommend() {
      return this.ratings.filter(r => r.rateType === TYPE_RECONMEND).length;
    },
    complaint() {
      return this.ratings.filter(r => r.rateType === TYPE_COMPLAIN).length;
    },
  },
  methods: {
    seleteType(num) {
      this.seletedType = num;
      this.$emit('typeHandler', num);
    },
    filterContent(o) {
      this.$emit('contentFilterHandler', !o);
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
.rating-types
  margin-left:18px
  font-size:0px
  padding:18px 0
  border-bottom: 1px solid rgba(7,17,27,0.1)
  .num
    font-size:8px
  .all
    display:inline-block
    height:16px
    margin-right:8px
    padding:8px 12px
    background:rgba(0,160,220,0.2)
    border-radius:2px
    font-size:12px
    line-height:16px
    color:rgb(77,85,93)
  .recommend
    display:inline-block
    height:16px
    margin-right:8px
    padding:8px 12px
    background:rgba(0,160,220,0.2)
    border-radius:2px
    font-size:12px
    line-height:16px
    color:rgb(77,85,93)
  .complaint
    display:inline-block
    height:16px
    padding:8px 12px
    background:rgba(77,85,93,0.2)
    border-radius:2px
    font-size:12px
    line-height:16px
    color:rgb(77,85,93)
  .active
    color:#fff
    background:rgb(0,160,220)
.comments-filter
  padding: 12px 0
  border-bottom: 1px solid rgba(7,17,27,0.1)
  .icon-check_circle
    margin-left:18px
    display:inline-block
    vertical-align:top
    font-size:24px
    line-height:24px
    color:rgb(147,153,159)
  .content
    display:inline-block
    font-size:12px
    line-height:24px
    margin-left:4px
    color:rgb(147,153,159)
  .active
    color:#00dc5d
</style>
