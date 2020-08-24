<template>
  <div>
    <Swiper :list="homeData.headList"></Swiper>
    <Floor :list="homeData.floorList"></Floor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Swiper from "./components/swiper/swiper.vue";
import Floor from "./components/floor/index.vue";
import { State, Mutation, Action } from "vuex-class";
import { homeData, DataProps } from "../../mock/data";

@Component({
  components: {
    Swiper,
    Floor
  }
})
export default class Home extends Vue {
  homeData: DataProps = homeData;

  @Action("judgeLoginStatus") judgeLoginStatus: Function

  created() {
    this.judgeLoginStatus();
  }
}
</script>
