<template>
  <div class="account">
    <div class="ipt">
      <span class="text">筛选：</span>
      <el-select
        v-model="value"
        :popper-append-to-body="false"
        size="small"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="input"
        size="small"
        placeholder="请输入内容"
        @keyup.enter="onCheck"
      ></el-input>
      <el-button
        type="primary"
        size="small"
        style="margin-left: 0.1rem"
        @keyup.enter="onCheck"
        @click="onCheck"
      >查询</el-button>
    </div>
    <div class="tool">
      <div class="btn">
        <el-button
          type="primary"
          size="small"
          @click="batchReset"
        >批量重置</el-button>
        <el-button
          type="primary"
          size="small"
          @click="batchDelete"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="
            dialogShow = true;
            dialogTitle = '人员新增';
          "
        >新增</el-button>
      </div>
      <div class="excl">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-upload2"
          @click="importExcelDialogVisible = true"
        >Excel导入</el-button>
        <el-button
          :loading="downloadLoading"
          type="primary"
          size="small"
          icon="el-icon-download"
          @click="downloadExcel"
        >Excel导出</el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-download"
          @click="downTemplate"
        >模板下载</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        size="small"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          label="全选"
          align="center"
        >
        </el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录名"
          min-width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="人员姓名"
          min-width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userCode"
          label="人员编号"
          min-width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="fDeptName"
          min-width="140"
          label="所属单位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="deptName"
          min-width="140"
          label="所属部门"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          min-width="140"
          label="人员岗位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="lockFlagName"
          min-width="140"
          label="账号状态"
          align="center"
        >
          <template #default="scope">
            <span
              :style="{
                color: scope.row.lockFlagName === '启用' ? '' : '#f75858',
              }"
            >{{ scope.row.lockFlagName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          min-width="140"
          label="备注"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          fixed="right"
          label="操作"
          min-width="180"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="onEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="onRest([{ userId: scope.row.userId }])"
            >重置</el-button>
            <el-button
              type="text"
              size="small"
              @click="
                onOpt(
                  [{ userId: scope.row.userId }],
                  scope.row.lockFlagName === '启用' ? 'stop' : 'open'
                )
              "
            >{{
              scope.row.lockFlagName === "启用" ? "停用" : "启用"
            }}</el-button>
            <el-button
              type="text"
              size="small"
              style="color: #f75858"
              @click="onDel([{ userId: scope.row.userId }])"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      >
      </el-pagination>
    </div>
    <!-- 导入excel弹框提示 -->
    <MyUpload
      ref="myUpload"
      :submit-loading="submitLoading"
      :import-excel-dialog-visible="importExcelDialogVisible"
      @submitUpload="submitUpload"
      @changeImportExcelDialogVisible="changeImportExcelDialogVisible"
    />

    <!-- 弹窗框 -->
    <MyDialog
      v-show="dialogShow"
      :title="dialogTitle"
      @closeSettings="closeSettings"
      @saveSettings="saveSettings"
    >
      <template #content>
        <div class="dialog-content">
          <div class="dialog-left">
            <MyCrom
              v-if="dialogShow"
              :init-avatar="avatar"
              av
              @cropSuccess="cropSuccess"
            ></MyCrom>
          </div>
          <div class="dialog-right">
            <el-form
              ref="elForm"
              :model="formData"
              :rules="rules"
              size="medium"
              label-width="100px"
            >
              <el-col :span="23">
                <el-form-item
                  label-width="120px"
                  label="人员姓名"
                  prop="userName"
                >
                  <el-input
                    v-model="formData.userName"
                    placeholder="请输入人员姓名"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item
                  label-width="120px"
                  label="人员编号"
                  prop="userCode"
                >
                  <el-input
                    v-model="formData.userCode"
                    placeholder="请输入人员编号"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="所属单位" prop="comId">
                  <el-cascader
                    v-model="formData.comId"
                    placeholder="请选择所属单位"
                    clearable
                    :style="{ width: '100%' }"
                    :options="comIdOptions"
                    :props="comIdProps"
                    filterable
                    @change="changeComId"
                  >
                  <!-- <el-option
                    v-for="(item, index) in comIdOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option> -->
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="所属部门" prop="deptId">
                  <el-cascader
                    v-model="formData.deptId"
                    placeholder="请选择所属部门"
                    clearable
                    :style="{ width: '100%' }"
                    :options="deptIdOptions"
                    :props="deptIdProps"
                    filterable
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item
                  label-width="120px"
                  label="岗位（角色）"
                  prop="roleId"
                >
                  <el-select
                    v-model="formData.roleId"
                    placeholder="请选择岗位（角色）"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in roleIdOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="备注" prop="remark">
                  <el-input
                    v-model="formData.remark"
                    type="textarea"
                    placeholder="请输入备注"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="账号启停" prop="lockFlag">
                  <el-radio-group v-model="formData.lockFlag" size="medium">
                    <el-radio
                      v-for="(item, index) in lockFlagOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import 'babel-polyfill';
import MyUpload from '@/components/myUpload';
// import { userExcelTemp } from '@/global';
import { userExcelTemp } from '@/config/config'
import {
  getUserData,
  batchDelete,
  batchReset,
  batchStop,
  batchStart,
  importUser,
  getTree,
  getProject,
  getRole,
  uploadImg,
  insertUser,
  updateUser
} from '@/api/settings/account';
import MyDialog from '@/components/MyDialog';
import MyCrom from '@/components/MyCrom';
export default {
  components: { MyUpload, MyDialog, MyCrom },
  props: {},
  data() {
    return {
      options: [
        {
          value: 'userName',
          label: '人员姓名'
        },
        {
          value: 'userCode',
          label: '人员编号'
        },
        {
          value: 'fDeptName',
          label: '所属单位'
        },
        {
          value: 'deptName',
          label: '所属部门'
        },
        {
          value: 'roleName',
          label: '人员岗位'
        },
        {
          value: 'lockFlagName',
          label: '账号状态'
        },
        {
          value: 'remark',
          label: '备注'
        }
      ],
      value: '',
      input: '',
      tableData: [],
      total: 400,
      currentPage: 1,
      pageSize: 20,
      multipleSelection: [],
      downloadLoading: false,
      importExcelDialogVisible: false,
      submitLoading: false,
      avatar: '', // 用于存储剪切完图片的base64Data和显示回调图片
      dialogShow: false,
      // 新增人员

      formData: {
        userName: undefined,
        userCode: undefined,
        comId: undefined,
        deptId: undefined,
        roleId: undefined,
        remark: undefined,
        lockFlag: '0'
      },

      rules: {
        userName: [
          {
            required: true,
            message: '请输入人员姓名',
            trigger: 'blur'
          }
        ],
        userCode: [
          {
            required: true,
            message: '请输入人员编号',
            trigger: 'blur'
          }
        ],
        comId: [
          {
            required: true,
            message: '请选择所属单位',
            trigger: 'change'
          }
        ],
        deptId: [
          {
            required: true,
            message: '请选择所属部门',
            trigger: 'change'
          }
        ],
        roleId: [
          {
            required: true,
            message: '请选择岗位（角色）',
            trigger: 'change'
          }
        ],
        lockFlag: [
          {
            required: true,
            message: '账号启停不能为空',
            trigger: 'change'
          }
        ]
      },
      comIdOptions: [],
      deptIdOptions: [],
      roleIdOptions: [],
      lockFlagOptions: [
        {
          label: '启用',
          value: '0'
        },
        {
          label: '停用',
          value: '9'
        }
      ],
      comIdProps: {
        multiple: false,
        label: 'name',
        value: 'deptId',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      },
      deptIdProps: {
        multiple: false,
        label: 'name',
        value: 'deptId',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      },
      dialogTitle: '人员新增' // 新增弹窗修改
    };
  },
  computed: {},
  watch: {
    'formData.comId'(val) {
      if (!this.dialogShow) {
        return false;
      }
      this.$nextTick(() => {
        getProject({
          parentId: Array.isArray(val) ? val[val.length - 1] : val
        }).then((res) => {
          const data = res.data;
          this.deptIdOptions = data;
        });
      });
    },
    dialogShow(val) {
      if (!val) {
        this.personUrl = '';
        this.avatar = '';
        this.$refs['elForm'].resetFields();
      }
    }
  },
  created() {},
  mounted() {
    // this.init();
  },
  methods: {

    handleSizeChange(val) {
      this.getUserData({
        current: this.currentPage,
        size: val
      });
    },
    handleCurrentChange(val) {
      this.getUserData({
        current: val,
        size: this.pageSize
      });
    },
    // 初始化
    init() {
      this.getUserData({
        current: 1,
        size: this.pageSize
      });
      this.getTree();
      getRole().then((res) => {
        const data = res.data;
        data.forEach((item) => {
          item.value = item.roleId;
          item.label = item.roleName;
        });
        this.roleIdOptions = data;
      });
    },
    // table 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const arry = [];
      val.forEach((item) => {
        const obj = {};
        obj.userId = item.userId;
        arry.push(obj);
      });
      this.multipleSelection = arry;
    },
    // 查询分页数据
    getUserData(query) {
      getUserData(query).then((res) => {
        const data = res.data;
        const { records, total, size, current } = data;
        this.tableData = records;
        this.total = total;
        this.currentPage = current;
        this.pageSize = size;
      });
    },
    // 查询
    onCheck() {
      const query = {
        [this.value]: this.input,
        current: this.currentPage,
        size: this.pageSize
      };
      this.getUserData(query);
    },
    // 批量重置
    batchReset() {
      if (!this.multipleSelection.length) {
        return this.$message.info('请选择要操作的用户');
      }
      batchReset(this.multipleSelection).then((res) => {
        const data = res.data;
        if (data === 'ok') {
          this.$message.success('操作成功');
          this.getUserData({
            current: this.currentPage,
            size: this.pageSize,
            [this.value]: this.input
          });
        } else {
          this.$message.error('操作失败');
        }
      });
    },
    // 批量删除
    batchDelete() {
      if (!this.multipleSelection.length) {
        return this.$message.info('请选择要操作的用户');
      }
      batchDelete(this.multipleSelection).then((res) => {
        const data = res.data;
        if (data === 'ok') {
          this.$message.success('操作成功');
          this.getUserData({
            current: this.currentPage,
            size: this.pageSize,
            [this.value]: this.input
          });
        } else {
          this.$message.error('操作失败');
        }
      });
    },
    // delete single
    onDel(data) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDelete(data).then((res) => {
            const data = res.data;
            if (data === 'ok') {
              this.$message.success('删除成功');
              this.getUserData({
                current: this.currentPage,
                size: this.pageSize
              });
            } else {
              this.$message.error('删除失败');
            }
          });
        })
        .catch(() => {});
    },
    // 启用，停用
    onOpt(data, opt) {
      if (opt === 'stop') {
        batchStop(data).then((res) => {
          const data = res.data;
          if (data === 'ok') {
            this.$message.success('操作成功');
            this.getUserData({
              current: this.currentPage,
              size: this.pageSize,
              [this.value]: this.input
            });
          } else {
            this.$message.error('操作失败');
          }
        });
      } else {
        batchStart(data).then((res) => {
          const data = res.data;
          if (data === 'ok') {
            this.$message.success('操作成功');
            this.getUserData({
              current: this.currentPage,
              size: this.pageSize,
              [this.value]: this.input
            });
          } else {
            this.$message.error('操作失败');
          }
        });
      }
    },
    // 单个重置
    onRest(data) {
      batchReset(data).then((res) => {
        const data = res.data;
        if (data === 'ok') {
          this.$message.success('操作成功');
          this.getUserData({
            current: this.currentPage,
            size: this.pageSize,
            [this.value]: this.input
          });
        } else {
          this.$message.error('操作失败');
        }
      });
    },
    // 模板下载
    downTemplate() {
      window.location.href = userExcelTemp + '/%D5%CB%BA%C5%C4%A3%B0%E5.xlsx';
    },
    // excel下载
    downloadExcel() {
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          '人员命名',
          '人员编号',
          '所属单位',
          '所属部门',
          '人员岗位',
          '账号状态',
          '备注'
        ];
        const filterVal = [
          'userName',
          'userCode',
          'fDeptName',
          'deptName',
          'roleName',
          'lockFlagName',
          'remark'
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户名单',
          autoWidth: true,
          bookType: 'xlsx'
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            // return parseTime(v[j]);
            return v[j];
          } else {
            return v[j];
          }
        })
      );
    },
    // 导入excel
    submitUpload(formData) {
      this.submitLoading = true;
      this.$refs.myUpload.clearFils(); // 清空已上传的文件
      importUser(formData)
        .then((res) => {
          if (!res.data.length || res.data === '成功') {
            this.$message.success('上传成功！！！');
            this.submitLoading = false;
            this.importExcelDialogVisible = false;
            this.$refs.myUpload.clearFils(); // 清空已上传的文件
            this.getUserData({
              current: this.currentPage,
              size: this.pageSize,
              [this.value]: this.input
            });
          } else {
            this.submitLoading = false;
            this.$message({
              showClose: true,
              message: `人员姓名：${res.data.join()} 这些行输入有错误`,
              type: 'error',
              duration: 0
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.submitLoading = false;
          this.$message.error('上传失败');
        });
    },
    changeImportExcelDialogVisible(value) {
      this.importExcelDialogVisible = value;
    },

    // 查询组织机构数
    getTree() {
      getTree().then((res) => {
        const data = res.data;
        this.comIdOptions = [data];
      });
    },
    // 上传头像
    cropSuccess(formData, file) {
      const size = file.size / 1024;
      if (size >= 2048) {
        return this.$message.error('图片大小不能大于2M');
      }
      uploadImg(formData)
        .then((res) => {
          const data = res.data;
          if (data.fileDownloadUri) {
            // 保存上传图片地址
            this.personUrl = data.fileDownloadUri;
            this.$message.success('成功上传头像');
          } else {
            this.$message.error('上传头像失败');
          }
        })
        .catch((e) => {});
    },

    // 用户新增
    saveSettings() {
      let feptId = this.formData['comId'];
      if (Array.isArray(feptId)) {
        feptId = feptId[feptId.length - 1];
      }
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return;
        if (this.dialogTitle === '人员新增') {
          // TODO 提交表单
          insertUser({
            ...this.formData,
            avatar: this.personUrl,
            deptId: this.formData['deptId'][0],
            feptId: feptId
          })
            .then((res) => {
              const data = res.data;
              if (data === 'ok') {
                this.$message.success('操作成功');
                this.getUserData({
                  current: this.currentPage,
                  size: this.pageSize,
                  [this.value]: this.input
                });
                this.$nextTick(() => {
                  this.dialogShow = false;
                });
              } else {
                this.$message.error(data);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          updateUser({
            ...this.formData,
            avatar: this.personUrl ? this.personUrl : this.formData.avatar, // 头像图片
            deptId: Array.isArray(this.formData.deptId)
              ? this.formData['deptId'][0]
              : this.formData.deptId,
            feptId: feptId
          })
            .then((res) => {
              const data = res.data;
              if (data === 'ok') {
                this.$message.success('操作成功');
                this.getUserData({
                  current: this.currentPage,
                  size: this.pageSize,
                  [this.value]: this.input
                });
                this.$nextTick(() => {
                  this.dialogShow = false;
                });
              } else {
                this.$message.error(data);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    },
    // 关闭弹窗
    closeSettings() {
      // this.$alert("没保存，确定要关闭吗？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   callback: (action) => {
      this.dialogShow = false;
      //   },
      // });
    },
    // 编辑人员
    onEdit(item) {
      this.dialogTitle = '人员修改';
      this.dialogShow = true;
      this.formData = JSON.parse(JSON.stringify(item));
      this.formData.comId = item.fDeptId;
      this.formData.deptId = item.deptId;
      this.avatar = item.avatar;
    },
    changeComId(val) {
      if (this.dialogShow === false) {
        return false;
      }
      this.formData.deptId = '';
      getProject({
        parentId: Array.isArray(val) ? val[val.length - 1] : val
      }).then((res) => {
        const data = res.data;
        this.deptIdOptions = data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.account {
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  background: url("../../../assets/images/border.png") no-repeat center;
  background-size: 100% 100%;
  padding: 2rem;
  .ipt {
    height: 3rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid rgba(241, 241, 241, 0.1);
    padding-bottom: 2.4rem;
    .text {
      font-size: 1.4rem;
      font-weight: 400;
      color: rgba(163, 178, 255, 1);
    }
    .el-select {
      width: 10rem;
    }
    .el-input {
      width: 10rem;
    }
  }
  .tool {
    display: flex;
    height: 6rem;
    align-items: center;
    justify-content: space-between;
    padding-top: 2.2rem;
  }
  .table {
    padding-top:  2.2rem;

  }
  .page {
    height: 5rem;
    line-height: 6rem;
    text-align: right;
  }
  .dialog-content {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .dialog-left {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-right {
      width: 60%;
      height: 100%;
      // float: left;
    }
  }
  .dialog {
    z-index: 2000;
    background-color: transparent;
  }
}
</style>
