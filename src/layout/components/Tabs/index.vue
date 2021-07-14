<template>
  <div class="tabs">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      size="mini"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    removeTab () {

    }
  }
}
</script>
<style lang="less" scoped>
.tabs {
  margin-left: 2rem;
}
</style>
<style lang="less" >
.el-tabs .el-tabs__header {
  margin: 0;
}
</style>
