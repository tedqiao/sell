<template lang="html">
  <div class="cartControl">
    <transition name="slide-fade">
      <div class="remove" @click="removeOne(item,$event)" v-show="show">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="count" v-show="show">
        <div>
          {{count}}
        </div>
      </div>
    </transition>
    <div class="add" @click="addOne(item,$event)">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      good: {},
    };
  },
  props: {
    item: {
      type: Object,
    },
    checkOutList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    show() {
      const good = this.checkOutList.filter(i => this.item.name === i.name)[0];
      if (good) {
        return good.count > 0;
      }
      return false;
    },
    count() {
      const good = this.checkOutList.filter(i => this.item.name === i.name)[0];
      if (good) {
        return good.count;
      }
      return 0;
    },
  },
  methods: {
    removeOne(i, e) {
      // console.log('cartC - called');
      if (!e._constructed) {
        return;
      }
      this.$emit('removeEvent', i);
    },
    addOne(i, e) {
      if (!e._constructed) {
        return;
      }
      // console.log('cartC + called');
      this.$emit('addEvent', i);
    },
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
.cartControl
  position: relative
  display: flex
  color: rgb(0,160,220)
  line-height:24px
  font-size:24px
  bottom:0
  right:0
  .remove
    flex:1
    padding:6px
  .count
    flex:1
    color:rgb(147,153,159)
    font-size:10px
    padding:6px 0
  .add
    flex:1
    padding:6px
</style>
