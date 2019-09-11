<template>
  <div>
    <rs-table
      :columns="formattedColumnList"
      :data="data"
    />
  </div>
</template>

<script>
  import { getFormattedColumns } from './helpers';

  export default {
    props: {
      columnsList: {
        type: Array,
        default() {
          return [];
        },
      },
      data: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    created() {
      this.loadData();
    },
    data() {
      return {
        formattedColumnList: []
      };
    },
    methods: {
      loadData() {
        this.formattedColumnList = getFormattedColumns(this.columnsList);
      }
    }
  };
</script>
