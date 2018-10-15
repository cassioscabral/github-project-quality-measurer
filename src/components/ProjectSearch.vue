
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
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { emit } from 'cluster';
const GitHub = require('github-api')

interface GHResult {
  data: object | object[]
}
interface GHResultArray {
  data: object[]
}

interface Project {
  license: object
}

@Component
export default class ProjectSearch extends Vue {
  protected input = ''
  protected project = new Object()
  protected repoReadme = new Object()
  protected repoCommits = new Object()
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
      return 0 // only one author
    }
  }

  get commitScore () {
    if (this.repoCommits) {
      // all: is an array with 52 weeks of commits counts
      let {all, owner} = this.repoCommits
      console.log('all, owner', all, owner);
      let sumOfZeroCommitWeeks = all.reduce((total, week) => {
        week === 0 ? total += 1 : 0
        return total
      }, 0)

      const totalOfWeeks = all.length // if a project has enough weeks(13 months) it will be 52
      let score = 1 - sumOfZeroCommitWeeks / totalOfWeeks
      return score > 0 ? score.toFixed(2) : 0
    }
  }

  public async search () {
    const repo = this.gh.getRepo(this.input)
    console.log('repo', repo);
    const repoDetailsResult = await repo.getDetails()
    this.project = repoDetailsResult.data
    console.log('this.project', this.project);
    const repoContributorStatsResult = await repo.getContributorStats()
    this.projectContributorsStats = repoContributorStatsResult.data
    console.log('this.projectContributorsStats', this.projectContributorsStats);

    const repoReadme = await repo.getReadme()
    this.repoReadme = repoReadme.data;
    console.log('this.repoReadme', this.repoReadme);

    let repoCommits = await window.fetch(`https://api.github.com/repos/${this.input}/stats/participation`)
    repoCommits = await repoCommits.json()
    this.repoCommits = repoCommits;
    console.log('this.repoCommits', this.repoCommits);

    this.$emit('project-found', {
      project: this.project,
      projectContributorsStats: this.projectContributorsStats,
      hasDocs: this.repoReadme? this.repoReadme.size > 0 ? 1 : 0 : 0,
      hasLicense: repoDetailsResult.data.license && repoDetailsResult.data.license.name ? 1 : 0,
      busFactor: this.busFactor,
      activity: this.commitScore,
    })
  }
}
</script>

<style scoped lang="scss">
.boxed {
  border-top: 1px solid #afafaf;
  padding: 5px;
}

.project-search {
  border: 1px solid #afafaf;
  border-radius: 6px;

  .project-info {
    text-align: left;
    padding-left: 5px;
  }
}
</style>