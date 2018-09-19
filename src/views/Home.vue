<template>
  <div class="home">
    <ProjectSearch msg="My Project Search"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectSearch from '@/components/ProjectSearch.vue'; // @ is an alias to /src

@Component({
  components: {
    ProjectSearch,
  },
})
export default class Home extends Vue {}
</script>
