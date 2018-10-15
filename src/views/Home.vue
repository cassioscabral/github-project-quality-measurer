<template>
  <div class="home">
    <div class="comparator flex">
      <ProjectSearch @project-found="projectA = $event" msg="Project A"/>
      <div class="result">
        <div class="table is-striped is-bordered">
          <thead>
            <tr>
              <th>Property</th>
              <th>{{projectA ? projectA.project.name : 'Project A'}}</th>
              <th>{{projectB ? projectB.project.name : 'Project B'}}</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>{{projectA ? totalScoreProjectA : 0}}</th>
              <th>{{projectB ? totalScoreProjectB : 0}}</th>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <th>1 - Has docs or Readme</th>
              <td>{{projectA ? projectA.hasDocs : 'Not found'}}</td>
              <td>{{projectB ? projectB.hasDocs : 'Not found'}}</td>
            </tr>
            <tr>
              <th>2 - Has license</th>
              <td>{{projectA ? projectA.hasLicense : 'Not found'}}</td>
              <td>{{projectB ? projectB.hasLicense : 'Not found'}}</td>
            </tr>
            <tr>
              <th>3 - Activity</th>
              <td>{{projectA ? projectA.activity : 'Not found'}}</td>
              <td>{{projectB ? projectB.activity : 'Not found'}}</td>
            </tr>
            <tr>
              <th>4 - Bus Factor</th>
              <td>{{projectA ? projectA.busFactor : 'Not found'}}</td>
              <td>{{projectB ? projectB.busFactor : 'Not found'}}</td>
            </tr>
          </tbody>
        </div>
      </div>
      <ProjectSearch @project-found="projectB = $event" msg="Project B"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ProjectSearch from '@/components/ProjectSearch.vue' // @ is an alias to /src

function totalScoreSum (project: any) {
  if (project) {
    let hasDocs = Number(project.hasDocs)
    let hasLicense = Number(project.hasLicense)
    let activity = Number(project.activity)
    let busFactor = Number(project.busFactor)
    return hasDocs + hasLicense + activity + busFactor
  }

  return 0
}
@Component({
  components: {
    ProjectSearch,
  },
})
export default class Home extends Vue {
  protected projectA = null
  protected projectB = null

  get totalScoreProjectA () {
    return totalScoreSum(this.projectA)
  }

  get totalScoreProjectB () {
    return totalScoreSum(this.projectB)
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.comparator {
  justify-content: space-evenly;

  .result {
    min-width: 25vw;
    margin: 0 3rem;
  }
}
</style>
