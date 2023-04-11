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

    <h1>Made By Getters</h1>
    <div v-for="user in counter.getUsers" :key="user.id">
      {{ user.id }} {{ user.name }} {{ user.address }}
    </div>
    <h1>Made By Actions</h1>
    <div v-for="user in counter.users" :key="user.id">
      {{ user.id }} {{ user.name }} {{ user.address }}
    </div>

    <br>
    <br>
    useFetch Api Call
    <br>
    <br>

    <div v-for="p in products">
      {{ p.title }}
      <!-- <NuxtLink :to="`/products/${p.id}`">{{ p.title }}</NuxtLink> -->
    </div>
  </div>
</template>

<script setup>

import { useCounterStore } from '@/stores/counter'
import { useMultiplyStore } from './stores/multiply';


// access the `counter` variable anywhere in the component ✨
const counter = useCounterStore()
const multiply = useMultiplyStore()

// Api Function Call from Pina Store
// counter.fetchUsers()

const { data: products } = await
  useFetch('https://fakestoreapi.com/products')
counter.setData(products)

console.log("Response", products);
</script>
