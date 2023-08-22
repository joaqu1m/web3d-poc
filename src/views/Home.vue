<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function recusar() {
    alert("ainda não");
}
</script>

<template>
    <h2>tipos de modelagem 3d na web:</h2>
    <ul>
        <li @click="recusar">Css3d</li>
        <li @click="router.push('/webgl')">WebGL</li>
        <li @click="recusar">ThreeJS</li>
    </ul>
</template>

<style scoped></style>
