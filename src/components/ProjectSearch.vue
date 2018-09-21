<template>
<div class="project-search">
  <h1>Search for a project: {{input}}</h1>
  <el-input
    placeholder="Project name"
    v-model="input"
    prefix-icon="el-icon-search"
    @keyup.enter.native="search"
    clearable>
  </el-input>

  <div class="info" v-if="project">
    Project: {{project.name}} ({{project.stargazers_count}}) Stars <br>
    Project description: {{project.description}} <br>
    <div class="author" v-if="authorWithMostCommits">
      <img :src="authorWithMostCommits.author.avatar_url" alt=""> <br>
      Author with most commits: {{authorWithMostCommits.author.login}} <br>

      <div class="bus-factor">
        Bus factor: {{busFactor}} of 1: 1 being the best
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import GitHub from 'github-api'
const GitHub = require('github-api')

interface GHResult {
  data: Object | Array<Object>
}
interface GHResultArray {
  data: Array<any>
}

@Component
export default class ProjectSearch extends Vue {
  protected input = ''
  protected project = new Object()
  protected projectContributorsStats = []
  private gh = new GitHub()

  @Prop() private msg!: string

  get authorWithMostCommits () {
    return this.projectContributorsStats.length > 0 ?
      this.projectContributorsStats[this.projectContributorsStats.length - 1]
      :
      null
  }

  get secondAuthorWithMostCommits () {
    return this.projectContributorsStats.length > 1 ?
      this.projectContributorsStats[this.projectContributorsStats.length - 2]
      :
      null
  }

  get busFactor () {
    if (this.authorWithMostCommits && this.secondAuthorWithMostCommits) {
      return (this.secondAuthorWithMostCommits.total / this.authorWithMostCommits.total).toFixed(2)
    } else {
      return 0 // only one
    }
  }

  public search () {
    const repo = this.gh.getRepo(this.input)

    repo.getDetails().then((result: GHResult) => {
      this.project = result.data
    })

    repo.getContributorStats().then((result: any) => {
      this.projectContributorsStats = result.data
    })
  }
}
</script>

<style scoped lang="scss">
</style>