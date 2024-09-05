<script lang="ts" setup>

import { translateState } from '../States';


</script>

<template>
    <div>
        <input 
            type="text" 
            v-model="translateState.src" 
            @blur="translateState.translate"
            @keyup.enter="(evt) => { evt.target.blur() }"
        />
        <div class="src-content">
            {{ translateState.src }}
        </div>
        <div class="dest-content">
            {{ translateState.dest }}
        </div>
    </div>
</template>

<style scoped>
</style>