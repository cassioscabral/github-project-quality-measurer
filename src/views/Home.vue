<template>
  <div class="home">
    <div class="comparator flex">
      <ProjectSearch @project-found="projectA = $event" msg="Project A"/>
      <ProjectSearch @project-found="projectB = $event" msg="Project B"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ProjectSearch from '@/components/ProjectSearch.vue' // @ is an alias to /src

@Component({
  components: {
    ProjectSearch,
  },
})
export default class Home extends Vue {
   @Prop(Object) projectA: object
   @Prop(Object) projectB: object
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.comparator {
  justify-content: space-evenly;
}
</style>
