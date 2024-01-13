<script lang="ts" setup></script>

<template lang="pug">
th.am-common-table-header-cell
  slot
</template>

<style lang="sass">
.am-common-table-header-cell
	background: $main-green
	font-weight: bold
	color: #fff
	border: solid 2px #646464
	padding: 4px 8px
	position: relative
	&:not(:last-child)::after
		display: block
		content: ''
		width: 2px
		height: 100%
		background-color: #fff
		position: absolute
		top: 0
		right: -2px
</style>
