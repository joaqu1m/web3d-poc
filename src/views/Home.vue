<script setup lang="ts">
export default {
	setup() {
		console.log("a")
	}
}
</script>

<template>
  	<div>
		<h2>tipos de modelagem 3d na web sem libs:</h2>
		<ul>
			<li>Css3d</li>
			<li @click="$router.push("/webgl")">WebGL</li>
		</ul>
	</div>
</template>

<style scoped></style>
