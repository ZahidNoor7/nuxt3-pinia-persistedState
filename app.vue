<template>
  <div>
    <!-- <NuxtWelcome /> -->

    <button @click="counter.decrement()">---</button>
    <br>
    <p>{{ counter.count }}</p>
    <br>
    <button @click="counter.increment()">+++</button>
    <br>
    <br>
    <br>
    <button @click="multiply.multi(4)">***</button>
    <br>
    <p>{{ multiply.count }}</p>
    <br>
    <!-- <button @click="counter.increment()">+++</button> -->
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import { useMultiplyStore } from './stores/multiply';


// access the `counter` variable anywhere in the component ✨
const counter = useCounterStore()
const multiply = useMultiplyStore()
</script>
