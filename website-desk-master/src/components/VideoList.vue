<template>
    <el-menu mode="vertical">
      <chapter-item v-for="chapter in chapters" :key="chapter.id" :item="chapter" />
    </el-menu>
</template>

<script>
import ChapterItem from "./ChapterItem";

export default {
  name: "VideoList",
  components: { ChapterItem },
  props: {
    chapters: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;

  text-align: left;
}
.el-menu-item {
  height: 30px;
  line-height: 30px;
}
.el-submenu >>> .el-submenu__title {
  height: 30px;
  line-height: 30px;
}
</style>