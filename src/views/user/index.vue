<template>
  <div class="user-wrap">
    <HeadInfo />
    <TabList />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HeadInfo from "./components/head-info/index.vue";
import TabList from "./components/tab-list/index.vue";

@Component({
  components: {
    HeadInfo,
    TabList
  }
})
export default class User extends Vue {}
</script>

<style scoped lang="scss" src="./index.scss"></style>
