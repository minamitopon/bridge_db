<script lang="ts" setup>
interface Props {
  hasEvent: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  hasEvent: false,
});

interface Emits {
  (e: "click"): void;
}
const emits = defineEmits<Emits>();
const emitClick = () => emits("click");
</script>

<template lang="pug">
template(v-if="hasEvent")
  tr.am-common-table-row(@click="emitClick")
    slot
template(v-else)
  tr.am-common-table-row
    slot
</template>

<style lang="sass">
.am-common-table-row
  &:hover
    background-color: $sub-green
</style>
