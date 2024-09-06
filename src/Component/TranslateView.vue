<script lang="ts" setup>

import { translateState } from '../States';


</script>

<template>
    <div>
        <div class="dest-content">
            {{ translateState.dest }}
        </div>
        <input 
            class="transparent-input-box"
            type="text" 
            v-model="translateState.src" 
            @blur="translateState.translate"
            @keyup.enter="(evt) => { evt.target.blur() }"
        />
    </div>
</template>

<style scoped>

.transparent-input-box {
    border:0px transparent;
}
.transparent-input-box:focus {
    outline: none;
}


</style>