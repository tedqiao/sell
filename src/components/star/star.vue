<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in classItems" :key="index" :class="item" class="star-item">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
const LEN = 5;
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';

export default {
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },
  computed: {
    starType() {
      return `star-${this.size}`;
    },
    classItems() {
      const res = [];

      const int = Math.floor(this.score * 2) / 2;
      const half = int % 1 !== 0;
      for (let i = 0; i < int; i += 1) {
        res.push(CLS_ON);
      }
      if (half) {
        res.push(CLS_HALF);
      }
      while (res.length < LEN) {
        res.push(CLS_OFF);
      }
      return res;
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">

@import '../../common/stylus/mixin.styl'

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0px
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0px
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0px
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')


</style>
