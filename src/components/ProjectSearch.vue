
<template>
<div class="project-search">
  <el-input
    placeholder="Project name"
    v-model="input"
    prefix-icon="el-icon-search"
    @keyup.enter.native="search"
    clearable>
  </el-input>


  <div class="info" v-if="project">
    <div class="project-info" v-if="project.name">
      <b>Project: </b> <a :href="project.homepage" target="_blank">{{project.name}}</a> ({{project.stargazers_count}}) Stars <br>
      <b>Project description:</b> {{project.description}} <br>
      <b>Forks:</b> {{project.forks}} <br>
      <b>Open issues:</b> {{project.open_issues_count}} <br>
      <b>License:</b> {{project.license && project.license.name}}
    </div>
    <div class="author boxed" v-if="authorWithMostCommits && authorWithMostCommits.author">
      <div class="is-flex">
        <figure class="image is-128x128">
          <img :src="authorWithMostCommits.author.avatar_url" :alt="authorWithMostCommits.author.login">
        </figure>
        Author with most commits: {{authorWithMostCommits.author.login}} <br>
      </div>
    </div>
    <div class="project-qualities boxed" v-if="authorWithMostCommits && authorWithMostCommits.author && project.name">
      <div class="has-license">
        <b>Has license:</b> {{project.license && project.license.name ? 1 : 0}}
      </div>
      <div class="bus-factor">
        <b>Bus factor:</b> {{busFactor}} of 1; 1 being the best
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
  data: object | object[]
}
interface GHResultArray {
  data: object[]
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
      {total: 0}
  }

  get secondAuthorWithMostCommits () {
    return this.projectContributorsStats.length > 1 ?
      this.projectContributorsStats[this.projectContributorsStats.length - 2]
      :
      {total: 0}
  }

  get busFactor () {
    if (this.authorWithMostCommits
      && this.secondAuthorWithMostCommits
      && this.secondAuthorWithMostCommits.total
      && this.secondAuthorWithMostCommits.total > 0) {
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
.boxed {
  border: 1px solid #afafaf;
  border-radius: 2px;
  padding: 5px;
}
</style>