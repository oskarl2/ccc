<template>
  <div>
    <workers-add-modal
      :isShown="shownModal"
      :workersList="data"
    />
    <workers-table-container
      :columnsList="columns"
      :data="data"
    >
    </workers-table-container>
  </div>
</template>

<script>
import WorkersAddModal from './WorkersAddModal/WorkersAddModal.vue'
import WorkersTableContainer from './WorkersTableContainer/WorkersTableContainer.vue'
import { COLUMNS_TITLE } from './WorkersTableContainer/helpers.js'
import { loadWorkers } from './dataLayer.js';

export default {
  components: {
    WorkersAddModal,
    WorkersTableContainer
  },
  data() {
    return {
      columns: COLUMNS_TITLE,
      data: [],
      workersList: [],
      shownModal: false
    }
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.data = await loadWorkers();
    }
  }
}
</script>