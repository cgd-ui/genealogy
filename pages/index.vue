<template>
  <Home/>
</template>
<script setup lang="ts">
import Home from '~/components/Home';

const name = "index";

const components = { Home };

definePageMeta({
  layout: "index",
});

</script>
<!-- <router>
{
	name: 'index'
}
</router> -->
