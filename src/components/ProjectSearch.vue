<template>
<div class="project-search">
  <h1>Message: {{msg}}</h1>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProjectSearch extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
</style>