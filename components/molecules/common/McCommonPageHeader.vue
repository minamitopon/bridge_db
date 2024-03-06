<script lang="ts" setup>
/** interface */
interface Props {
  title: string;
}
interface Emits {
  (e: "back"): void;
}
/** defines */
const Props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits<Emits>();

/** emits */
const emitBack = () => {
  emits("back");
};
</script>

<template lang="pug">
.page-header
  el-page-header(@back="emitBack")
    template(#content)
      span.page-header-title
        | {{ title }}
</template>
