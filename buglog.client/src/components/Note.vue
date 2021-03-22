<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card">
          Hey there!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'

export default {
  name: 'Note',
  props: {
    bug: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      bugsService.getCreator(props.bug)
    })
    return {
      state,
      getDate(id) {
        bugsService.getDate(id)
      }
    }
  }
}
</script>

<style scoped>
  .align-text-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media(max-width:767px) {
    .border-sm-bottom {
      border-bottom: 1px solid black;
    }

    .card-decoration {
      filter: drop-shadow(5px 3px 6px #000);
    }
  }

  @media(min-width: 768px) {
    .align-text-md-center {
      display: flex;
    align-items: center;
    justify-content: center;
    }
  }

</style>
