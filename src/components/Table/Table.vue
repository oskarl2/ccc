<template>
  <div>
    <div class="rs-table">
      <div
        v-if="hasColumns"
        class="rs-table-header"
      >
        <header-cell
          v-for="(col, col_index) in columns"
          :key="`header_${col.key}_${col_index}`"
          :style="{width: col.width + 'px'}"
          @click="handleSort(col.value)"
        >
          {{ col.title }}
        </header-cell>
      </div>
      <div class="rs-table-body">
<!--eslint-disable-next-line-->
        <div v-if="hasData" v-for="(row, row_index) in data" :key="`row_${row_index}`" >
          <div
            class="rs-table-body-row"
          >
            <rs-expand-icon
              :item="row"
              :expanded="row.isShow"
              :hasChildren="row.children.length !== 0"
              :style="{top: 7 + 'px'}"
              @changeExpandStatus="changeExpandStatus"
            ></rs-expand-icon>
            <body-cell
              v-for="(col, col_index) in columns"
              :key="`cell_${col.key}_${col_index}_${row_index}`"
              :style="{width: col.width + 'px'}"
            >
              <div>{{row[col.value]}}</div>
            </body-cell>
          </div>

          <template v-if="row.children && row.isShow">
            <div
              v-for="(row_children, row_index_children) in row.children"
              :key="`row_${row_index_children}_${row_index}`"
              class="rs-table-body-row rs-table-body-row-children"
            >
              <body-cell
                v-for="(col, col_index) in columns"
                :key="`cell_${col.key}_${col_index}_${row_index_children}`"
                :style="{width: col.width + 'px'}"
              >
                <div>{{row_children[col.value]}}</div>
              </body-cell>
            </div>
          </template>
        </div>

        <div v-if="!hasData" class="rs-table-body-empty">
          <template>
            {{ noDataPlaceholder }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderCell from './HeaderCell.vue';
import BodyCell from './BodyCell.vue';
import { sortByType } from './tableUtils.js';

export default {
  components: {
    BodyCell,
    HeaderCell,
  },
  props: {
    striped: {
      type: Boolean,
      default() {
        return false;
      },
    },
    columns: {
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
    totalData: {
      type: Object,
      default() {
        return {};
      },
    },
    noDataPlaceholder: {
      type: String,
      default() {
        return 'Нет данных для отображения';
      },
    },
    hideCellBorders: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      shownChildRow: false,
      sorting: false
    };
  },
  computed: {
    hasColumns() {
      return this.columns.length > 0;
    },
    hasData() {
      return this.data.length > 0;
    }
  },
  methods: {
    changeExpandStatus(status) {
      if (status.item.children) {
        status.item.isShow = !status.item.isShow;
      }
    },
    handleSort(columnKey) {
      sortByType(this.data, columnKey, this.sorting);
      this.sorting = !this.sorting;
    }
  }
};
</script>

<style lang="less" scoped>
.rs-table {
  background: #fff;
  box-shadow: 0 0 2px rgba(43, 36, 24, .2), 0 0 2px rgba(43, 36, 24, .2);
  width: fit-content;
  margin: 0 auto;
  &-header {
    display: flex;
    flex-direction: row;
    height: 40px;
    box-shadow: 0 0 2px rgba(43, 36, 24, 0.2), 0 0 2px rgba(43, 36, 24, 0.2);
  }
  &-body {
    &-row {
      position: relative;
      display: flex;
      flex-direction: row;
      min-height: 30px;
      &:nth-child(n+2) {
        box-shadow: inset 0 1px 0 0 #e8e9ea;
      }
      &-children {
        background: #bfe1ff;
      }
    }
    &-empty {
      padding: 15px;
      font-size: 13px;
    }
  }
}
</style>
