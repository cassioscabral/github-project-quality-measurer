<template>
  <div class="home">
    <div class="comparator flex">
      <ProjectSearch msg="Project A"/>
      <ProjectSearch msg="Project B"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProjectSearch from '@/components/ProjectSearch.vue' // @ is an alias to /src

@Component({
  components: {
    ProjectSearch,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.comparator {
  justify-content: space-evenly;
}
</style>
