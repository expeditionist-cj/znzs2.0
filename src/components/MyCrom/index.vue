<template>
  <div class="MyCrom">
    <div class="img-box" :style="imgStyle">
      <img v-if="!avatar" :src="initAvatar">
      <img v-else :src="avatar">
    </div>
    <cropImg
      v-model="show"
      field="img"
      img-format="png"
      :no-rotate="false"
      @crop-success="cropSuccess"
    ></cropImg>
    <div v-show="showUploadBtn" class="btn-box" :style="btnClass">
      <el-button type="primary" size="small" @click="show = true">上传图片</el-button>
    </div>
  </div>
</template>

<script>
import cropImg from 'vue-image-crop-upload';
export default {
  components: { cropImg },
  props: {
    showUploadBtn: {
      type: Boolean,
      default: true
    },
    initAvatar: {
      type: String,
      default: require('../../assets/role.png')
    },
    imgStyle: {
      type: String,
      default: 'width:30rem;height:30rem'
    },
    btnClass: {
      type: String,
      default: 'text-align:center'
    }
  },
  data() {
    return {
      show: false,
      avatar: ''
    };
  },

  computed: {},
  watch: {
    initAvatar(value) {
      this.avatar = value || require('../../assets/role.png')
    }
  },
  created() {},
  mounted() {
    if (this.initAvatar) {
      this.avatar = this.initAvatar;
    } else {
      this.avatar = require('../../assets/role.png')
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    // 剪切成功后的回调函数
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是图片的base64data码
      this.avatar = imgDataUrl;
      const formData = new FormData();
      const file = this.dataURLtoFile(imgDataUrl, 'xxx.png');
      formData.append('file', file);
      this.$emit('cropSuccess', formData, file);
    },
    // blob转file
    dataURLtoFile(dataurl, filename) {
      // 将base64转换为文件
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }
};
</script>

<style scoped lang="less">
.MyCrom {
  width: 100%;
  height: 100%;
  .img-box {
    width: 300rem;
    height: 300rem;
    margin: 0 auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .btn-box {
    margin-top: 2rem;
    text-align: center;
  }
}
</style>
