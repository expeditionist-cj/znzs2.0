<template>
  <div>
    <iframe
      ref="frame"
      class="iframe"
      :src="query.modelUrl"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      query: state => state.application.query
    })
  },
  mounted() {
    window.addEventListener('message', (event) => {
      // event.data获取传过来的数据
      if (typeof event.data === 'string') {
        this.sendMsg()
        this.msgFromIframe = event.data
      }
    });
  },
  methods: {
    sendMsg() {
      const frame = this.$refs['frame'];
      frame.contentWindow.postMessage('29', '*');
    }
  }
}
</script>
<style lang="less" scoped>
.iframe {
  width: 100%;
  height: calc(100vh - 9.5rem);
}
</style>
