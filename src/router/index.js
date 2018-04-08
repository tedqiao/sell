import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';
import home from '@/components/home/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/seller/:id',
      name: 'seller',
      component: seller,
      children: [
        {
          path: '/ratings',
          component: ratings,
        },
        {
          path: '/goods',
          component: goods,
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      component: home,
    },
  ],
  linkActiveClass: 'active',
});
