<template>
  <div class="organization">
    <div class="organization-left">
      <div class="div-btns">
        <el-button type="primary" size="mini" class="btn" @click="add">添加</el-button>
        <el-button type="primary" size="mini" class="btn" @click="onEdit">编辑</el-button>
        <el-button type="primary" size="mini" class="btn delete" @click="deletes">删除</el-button>
      </div>
      <div class="treeBar">
        <my-tree-nav-bar :tree-data="treeData" @clickTree="clickTree"></my-tree-nav-bar>
      </div>
    </div>
    <div class="organization-line"></div>
    <div class="organization-right">
      <div class="title">{{ title }}</div>
      <div class="content">
        <div class="upload-photo">
          <my-crom
            :init-avatar="imgUrl"
            :img-style="imgStyle"
            :btn-class="btnClass"
            :show-upload-btn="showUploadBtn"
            @cropSuccess="cropSuccess"
          ></my-crom>
        </div>
        <div class="introduce">
          <div class="list">
            <div class="div-name">
              <span>*</span>上级单位：
            </div>
            <el-input v-model="deptData.parentName" :readonly="readonly" size="small" clearable></el-input>
          </div>
          <div class="list">
            <div class="div-name">
              <span>*</span>部门名称：
            </div>
            <el-input v-model="deptData.name" :readonly="readonly" size="small" clearable></el-input>
          </div>
          <div class="list">
            <div class="div-name">
              <span>*</span>部门编码：
            </div>
            <el-input v-model="deptData.deptCode" :readonly="readonly" size="small" clearable></el-input>
          </div>
          <div class="list">
            <div class="div-name">
              <span>*</span>排序：
            </div>
            <el-input v-model="deptData.sort" :readonly="readonly" size="small" clearable></el-input>
          </div>
          <div class="list start">
            <div class="div-name">
              <span>*</span>部门简介：
            </div>
            <el-input
              v-model="deptData.remark"
              :readonly="readonly"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 10}"
              size="small"
            ></el-input>
          </div>
          <div class="btn-footer">
            <el-button type="primary" size="mini" class="btn" @click="onOk">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myTreeNavBar from '@/components/myTreeNavBar/index.vue';
import MyCrom from '@/components/MyCrom/index.vue';
import {
  uploadPhoto,
  getTree,
  addTree,
  deleteTree,
  updateTree
} from '@/api/settings/organization.js';
import { compare } from '../js/organization.js';
export default {
  name: 'Organization',
  components: {
    myTreeNavBar,
    MyCrom
  },
  data() {
    return {
      title: '查看机构',
      readonly: true,
      deptData: {},
      submitLoading: false,
      btnClass: 'text-align: right',
      imgStyle: 'width:48rem;height:36rem;',
      imgUrl: '',
      formData: new FormData(),
      treeData: [],
      currentName: '',
      showUploadBtn: false
    };
  },
  watch: {
    title(value) {
      if (value === '查看机构') {
        this.readonly = true;
        this.showUploadBtn = false;
      } else {
        this.readonly = false;
        this.showUploadBtn = true;
      }
    }
  },
  mounted() {
    this.getTreeData();
  },
  methods: {
    // 上传图片
    cropSuccess(formData, file) {
      const size = file.size / 1024;
      if (size >= 2048) {
        return this.$message.error('图片大小不能大于2M');
      }
      uploadPhoto(formData).then((res) => {
        const data = res.data;
        if (data.fileDownloadUri) {
          this.imgUrl = data.fileDownloadUri;
        }
      });
    },
    // 添加按钮
    add() {
      this.title = '添加机构';
      const { name, children, deptId } = this.deptData;
      const data = {
        children,
        deptId,
        parentId: deptId,
        name: '',
        remark: '',
        deptCode: '',
        sort: children.length + 1,
        parentName: name
      };
      this.deptData = data;
    },
    // 编辑按钮
    onEdit() {
      this.title = '编辑机构';
    },
    // 删除
    deletes() {
      if (this.deptData.children.length > 0) {
        return this.$message.error('请先删除子级部门');
      }
      const deptId = this.deptData.deptId;
      deleteTree(deptId).then((res) => {
        if (res.data) {
          this.$message.success('删除成功');
        }
        this.getTreeData();
        this.deptData = {};
        this.imgUrl = '';
      });
    },
    // 点击确定
    onOk() {
      if (!this.deptData.deptId) {
        return this.$message.error('请选择要操作的部门');
      }
      // 添加机构
      if (this.title === '添加机构') {
        const { name, deptCode, sort, parentId, remark } = this.deptData;
        const query = { name, deptCode, sort, parentId, remark };
        for (var key in query) {
          if (!query[key]) {
            return this.$message.error('带*的为必填项，请补充完整');
          }
        }
        addTree({ ...query, img: this.imgUrl })
          .then((res) => {
            if (res.data) {
              this.$message.success('添加成功');
            } else {
              this.$message.error('添加机构失败');
            }
            this.getTreeData();
          })
          .catch((err) => {
            this.$message.error('添加机构失败');
            console.log(err);
          });
      } else if (this.title === '编辑机构') {
        // 编辑机构
        const { name, deptCode, deptId, sort, remark, parentId } = this.deptData;
        const query = {
          name,
          parentId,
          remark,
          deptCode,
          sort,
          deptId
        };
        updateTree({ ...query, img: this.imgUrl }).then((res) => {
          if (res.code !== 0) {
            return this.$message.error('修改失败');
          } else if (res.data) {
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败');
          }
          this.getTreeData();
        });
      }
    },
    // 获取树形导航内容
    getTreeData() {
      getTree().then((res) => {
        const data = res.data;
        this.treeData = [{ ...data }];
      });
    },
    // 点击树形导航
    clickTree(data) {
      this.title = '查看机构';
      const {
        name,
        remark,
        deptCode,
        sort,
        parentId,
        children,
        deptId,
        img
      } = data;
      this.currentName = name;
      this.deptData = {
        name,
        remark,
        deptCode,
        sort,
        children,
        deptId,
        parentId
      };
      this.deptData.parentName = compare(this.treeData[0], data.parentId);
      this.imgUrl = img;
    }
  }
};
</script>
<style lang="less" >
.organization {
  width: 100%;
  height: calc(100% - 4rem);
  background: url("../../../assets/images/border.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  padding: 2rem;
  .organization-left {
    width: 20%;
    padding: 0 4rem;
    overflow: hidden;
    .treeBar {
      height: 90%;
      overflow: scroll;
    }
    .treeBar::-webkit-scrollbar {
      display: none;
    }
    .div-btns {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      .btn {
        font-size: 1.4rem;
        // color: rgba(36, 50, 81, 1);
        padding: 0.6rem 1.5rem;
        text-align: center;
        border: 0;
        border-radius: 0.5rem;
        cursor: pointer;
        position: relative;
        outline: none;
        // background-color: rgba(105, 255, 249, 1);
      }
      .delete {
        background-color: rgba(247, 88, 88, 1);
      }
    }
  }

  .organization-line {
    height: 100%;
    border-width: 0 0.1rem 0 0;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.4);
  }
  .organization-right {
    .title {
      padding: 0.5rem 4rem;
      font-size: 2rem;
      // color: rgba(105, 255, 249, 1);
    }
    .content {
      display: flex;
      .upload-photo {
        margin: 2rem 4rem;
        .photo {
          width: 48.2rem;
          height: 36.2rem;
          border: 0.1rem solid rgba(255, 255, 255, 0.4);
          margin-bottom: 2rem;
          // overflow: hidden;
          .image {
            width: 480rem;
            height: 360rem;
          }
        }
        .upload-file {
          text-align: right;
          .btn {
            // color: rgba(36, 50, 81, 1);
            padding: 0.8rem 1.5rem;
            text-align: center;
            border: 0;
            border-radius: 0.5rem;
            cursor: pointer;
            position: relative;
            outline: none;
            // background-color: rgba(105, 255, 249, 1);
          }
        }
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
          // color: rgba(176, 213, 220, 1);
          .div-name {
            display: inline-block;
            min-width: 15rem;
            span {
              color: #f75858;
            }
          }
        }
        .start {
          align-items: flex-start !important;
        }
        .btn-footer {
          text-align: right;
          .btn {
            // color: rgba(36, 50, 81, 1);
            padding: 1rem 2rem;
            text-align: center;
            border: 0;
            border-radius: 0.5rem;
            cursor: pointer;
            position: relative;
            outline: none;
            // background-color: rgba(105, 255, 249, 1);
            margin-right: 2rem;
          }
        }
      }
    }
  }
}
</style>
