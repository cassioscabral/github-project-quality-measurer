<template>
<div class="project-search">
  <h1>Search for the project: {{input}}</h1>
  <el-input
    placeholder="Project name"
    v-model="input"
    prefix-icon="el-icon-search"
    @keyup.enter.native="search"
    clearable>
  </el-input>

  Project: {{project}}
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProjectSearch extends Vue {
  protected input = ''
  protected project = {} // TODO it should be a Project object

  @Prop() private msg!: string

  public search() {
    this.project = {name: 'test', stars: 1000}
  }
}
</script>

<style scoped lang="scss">
</style>