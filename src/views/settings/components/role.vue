<template>
  <div class="roleManagement">
    <div class="tool">

      <el-select v-model="flag" :popper-append-to-body="false" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="fuzzy" class="ipt" size="small"></el-input>
      <el-button class="btn" type="primary" size="small" @click="onCheck">查询</el-button>
      <el-button class="btn" type="primary" icon="el-icon-plus" size="small" @click="clickAdd">新增</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        v-if="tableShow"
        v-loading="tableLoading"
        size="small"
        :data="tableData"
        border
        :max-height="tableHeight"
      >
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="120" align="center"></el-table-column>
        <el-table-column prop="roleCode" label="角色标识" min-width="120" align="center"></el-table-column>
        <el-table-column prop="roleDesc" min-width="300" label="角色描述" align="center"></el-table-column>
        <el-table-column prop="dsScope" min-width="120" label="数据权限" align="center"></el-table-column>
        <!-- <el-table-column prop="createTime" min-width="140" label="创建时间" align="center"></el-table-column> -->
        <el-table-column prop="remark" min-width="120" label="备注" align="center"></el-table-column>
        <el-table-column prop="name" label="操作" min-width="120" align="center">
          <template #default="scope">
            <el-button type="text" size="small" @click="onWatch(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color:#F75858" @click="onDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :popper-append-to-body="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!-- 弹窗框 -->
    <MyDialog
      v-show="dialogShow"
      :title="dialogTitle"
      class="my-dialog"
      :show-cancel="showCancel"
      @closeSettings="dialogShow=false"
      @saveSettings="saveSettings"
      @onConfirm="onConfirm"
    >
      <template #content>
        <div class="dialog-content clearfix">
          <div class="treeBar">
            <div class="title">功能权限选择：</div>
            <el-tree
              ref="treeBar"
              :data="treeData"
              default-expand-all
              node-key="id"
              :props="defaultProps"
              :default-checked-keys="menuIdList"
              highlight-current
              show-checkbox
              :check-strictly="checkStrictly"
              @node-click="clickTree"
            ></el-tree>
          </div>
          <div>
            <div class="introduce">
              <div class="list">
                <div class="div-name">角色名称：</div>
                <el-input v-model="roleData.roleName" size="small" :readonly="isDisable" clearable></el-input>
              </div>
              <div class="list">
                <div class="div-name">角色标识：</div>
                <el-input v-model="roleData.roleCode" size="small" :readonly="isDisable" clearable></el-input>
              </div>
              <div class="list">
                <div class="div-name">角色描述：</div>
                <el-input v-model="roleData.roleDesc" size="small" :readonly="isDisable" clearable></el-input>
              </div>
              <div class="list">
                <div class="div-name">数据权限:</div>
                <el-select v-model="roleData.dsScope" size="small" :disabled="isDisable">
                  <el-option
                    v-for="item in dsScope"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <el-checkbox-group
              v-show="roleData.dsScope == 3"
              v-model="checkedList"
              class="checkbox-group"
            >
              <el-checkbox
                v-for="(item,index) in selfData"
                :key="index"
                :disabled="isDisable"
                :label="item.deptCode"
              >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </template>
    </MyDialog>
    <!-- 遮罩层 -->
    <div v-if="dialogShow" class="mask"></div>
  </div>
</template>

<script>
import 'babel-polyfill';
import $ from 'jquery';
import {
  getRole,
  getAllRoleTree,
  addTree,
  getRoleTree,
  updateTree,
  deleteTree,
  getRolePlants
} from '@/api/settings/roleManagement.js';
import MyDialog from '@/components/MyDialog';
export default {
  components: { MyDialog },
  props: {},
  data() {
    return {
      tableLoading: false,
      showCancel: true,
      dialogTitle: '角色新增',
      checkStrictly: false,
      roleData: {
        roleName: '',
        roleCode: '',
        roleDesc: '',
        dsScope: ''
      },
      menuIdList: [],
      checkedList: [],
      isDisable: false,
      dsScope: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '本级'
        },
        {
          value: '2',
          label: '本级及子级'
        },
        {
          value: '3',
          label: '自定义'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'mname'
      },
      treeData: [],
      selfData: [],
      fuzzy: '',
      options: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '角色名称'
        },
        {
          value: '2',
          label: '角色标识'
        },
        // {
        //   value: "3",
        //   label: "角色描述",
        // },
        {
          value: '4',
          label: '数据权限'
        }
      ],
      flag: '0',
      tableHeight: '600',
      tableShow: true,
      tableData: [],
      total: 400,
      currentPage: 1,
      pageSize: 20,
      dialogShow: false,
      query: {
        current: 1,
        size: 10
      }
    };
  },
  computed: {},
  watch: {
    flag(value) {
      this.query.flag = value;
    },
    dialogTitle(value) {
      if (value === '角色查看') {
        this.showCancel = false;
        this.isDisable = true;
      } else {
        this.showCancel = true;
        this.isDisable = false;
      }
    },
    fuzzy(value) {
      this.query.value = value || null;
    },
    'roleData.dsScope'(value) {
      if (value === 3) {
        getRolePlants().then((res) => {
          const data = res.data;
          this.selfData = data;
        });
      }
    },
    dialogShow(value) {
      if (!value) {
        this.$nextTick(() => {
          this.$refs.treeBar.setCheckedKeys([]);
          this.roleData = {};
        });
      }
    }
  },
  created() {},
  mounted() {
    this.mathTableHeight();
    this.init();
  },
  methods: {
    // 初始化
    init() {
      getRole(this.query).then((res) => {
        const { records, size, total, current } = res.data;
        this.tableData = records;
        this.total = total;
        this.currentPage = current;
        this.pageSize = size;
      });
      getAllRoleTree().then((res) => {
        this.treeData = res.data;
      });
    },
    // 点击保存
    saveSettings() {
      let menuIdList = this.$refs.treeBar.getCheckedKeys();
      const acsPlants = this.checkedList.join(',');
      const halfChecked = this.$refs.treeBar.getHalfCheckedKeys();
      menuIdList = halfChecked.concat(menuIdList);
      // 新增
      if (this.dialogTitle === '角色新增') {
        addTree({
          role: { ...this.roleData, acsPlants },
          menuIdList
        }).then((res) => {
          if (res.msg === '成功') {
            this.$message.success('新增成功');
            this.init();
          } else {
            this.$message.error('新增失败');
          }
        });
      } else if (this.dialogTitle === '角色编辑') {
        // 编辑
        updateTree({
          role: { ...this.roleData, acsPlants },
          menuIdList
        }).then((res) => {
          if (res.msg === '成功') {
            this.$message.success('修改成功');
            this.init();
          } else {
            this.$message.error('修改失败');
          }
        });
      }
      this.$nextTick(() => {
        this.dialogShow = false;
      });
    },

    // 点击确定
    onConfirm() {
      this.dialogShow = false;
    },
    clickTree() {
      this.checkStrictly = false;
    },
    // 点击新增按钮
    clickAdd() {
      this.dialogShow = true;
      this.dialogTitle = '角色新增';
      this.checkStrictly = false;
    },
    // 点击查看
    onWatch(value) {
      this.dialogShow = true;
      this.dialogTitle = '角色查看';
      this.getRoleDetails(value);
    },
    // 点击编辑
    onEdit(value) {
      this.dialogShow = true;
      this.dialogTitle = '角色编辑';
      this.getRoleDetails(value);
    },
    // 查询角色详情
    getRoleDetails(value) {
      this.checkStrictly = true;
      getRoleTree(value.roleId).then((res) => {
        const { menuIdList, role } = res.data;
        this.menuIdList = menuIdList;
        this.roleData = role;
        this.checkedList = role.acsPlants ? role.acsPlants.split(',') : [];
      });
    },
    // 点击删除
    onDel(value) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTree(value.roleId).then((res) => {
          if (res.msg === '成功') {
            this.$message.success('删除成功');
            this.init();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    // 计算table高度
    mathTableHeight() {
      const h1 = $('.roleManagement').height();
      const h2 = $('.tool').height();
      const h3 = $('.page').height();
      this.$nextTick((item) => {
        this.tableHeight = Math.ceil(h1 - h2 - h3 - 40);
        this.tableShow = true;
      });
    },
    handleSizeChange(val) {
      this.query.size = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.query.current = val;
      this.init();
    },
    // 查询
    onCheck() {
      this.init();
    }
  }
};
</script>

<style scoped lang="less">
.roleManagement {
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  background: url("../../../assets/images/border.png") no-repeat center;
  background-size: 100% 100%;
  padding: 2rem;

  .tool {
    display: flex;
    height: 6rem;
    align-items: center;
    padding-top: 2.2rem;
    padding-bottom: 2.4rem;
    border-bottom: 0.1rem solid rgba(241, 241, 241, 0.1);
    .ipt {
      width: 20rem;
      margin-right: 1rem;
    }
    .btn {
      margin-right: 1rem;
    }
  }
  .table {
    padding-top: 2.2rem;
    flex: 1;
  }
  .page {
    height: 5rem;
    line-height: 6rem;
    text-align: right;
  }
  .my-dialog {
    height: 60rem;
    .dialog-content {
      margin-top: 3rem !important;
      padding-left: 2rem;
      height: 75%;
      display: flex;
      justify-content: center;
      .treeBar {
        height: 100%;
        overflow: scroll;
        .title {
          padding: 0.5rem 0;
          font-size: 1.6rem;
          color: rgba(105, 255, 249, 1);
        }
      }
      .treeBar::-webkit-scrollbar {
        display: none;
      }
      .introduce {
        width: 60rem;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        .list {
          display: flex;
          align-items: center;
          text-align: right;
          margin-bottom: 2rem;
          color: rgba(176, 213, 220, 1);
          .div-name {
            display: inline-block;
            min-width: 15rem;
          }
        }
      }
      .checkbox-group {
        width: 15rem;
        height: 21rem;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        margin-left: 22rem;
      }
      .checkbox-group::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .dialog {
    z-index: 2000;
    background-color: transparent;
  }
}

.mask {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background: rgba(2, 7, 50, 0.7);
}
</style>
<style lang="less">
.roleManagement {
  .el-checkbox__inner {
    background-color: #69fff9 !important;
  }
  .el-button--text {
    color: #69fff9;
  }
  .el-textarea__inner {
    text-indent: 0 !important;
  }
  .el-form-item__label {
    color: rgba(255, 255, 255, 0.6);
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #69fff9;
    background: #69fff9;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: rgba(255, 255, 255, 0.6);
  }
  .el-table__body-wrapper {
    overflow-y: scroll;
  }

  //滚动条的宽度
  ::-webkit-scrollbar {
    width: auto;
  }
  //滚动条的滑块
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.3rem;
  }
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    // background: #253553;
  }
}
.el-checkbox {
  color: #b0d5dc;
}
.el-checkbox.is-checked .el-checkbox__label {
  color: #b0d5dc;
}
</style>
