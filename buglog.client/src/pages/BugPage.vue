<template>
  <div class="container-fluid">
    <div class="row text-center pt-3">
      <div class="col-12 col-md-6">
        <h1>Current bugs</h1>
      </div>
      <div class="col-12 col-md-4 pt-1">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#report-bug">
          Report
        </button>
      </div>
      <div class="col-12 col-md-2 pt-1">
        <div>
          <button type="button" class="btn btn-primary" @click="filterClosed">
            {{ state.closed ? 'Show Closed' : 'Hide Closed' }}
          </button>
        </div>
      </div>
    </div>
    <div class="row text-center bg-white font-weight-bold">
      <div class="col-12 d-none d-md-block col-md-6 border-right">
        Issue
      </div>
      <div class="col-12 d-none d-md-block col-md-4 border-right">
        Reported By
      </div>
      <div class="col-12 d-none d-md-block col-md-2 border-right">
        Status
      </div>
    </div>
    <div class="row">
      <Bug class="col-12" v-for="bug in state.bugs" :key="bug._id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const route = useRoute()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      closed: false
    })
    onMounted(() => {
      bugsService.getAll()
    })
    return {
      state,
      route,
      async filterClosed() {
        await bugsService.filterClosed(state.closed)
        state.closed = !state.closed
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
