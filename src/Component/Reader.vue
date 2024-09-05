<script lang="ts" setup>
import { readingFileState } from '@src/States'

</script>

<template>
    <div class="reader">
        <input type="text" v-model="readingFileState.path" @keyup.enter="readingFileState.get_content"/>
        <button @click="readingFileState.get_content">read it</button>
        <button @click="readingFileState.clean">clean</button>
        <div class="viewer">
            {{ readingFileState.content }}
        </div>
    </div>
</template>

<style scoped>
</style>  

