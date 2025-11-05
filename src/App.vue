<template>
  <div>
    <Beverage :isIced="currentTemp === 'Cold'" />

    <ul>
      <!-- Temperature -->
      <li>
        <template v-for="temp in Temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>

      <!-- Base -->
      <li>
        <template v-for="base in Base" :key="base.id">
          <label>
            <input
              type="radio"
              name="base"
              :id="`r${base.id}`"
              :value="base.id"
              v-model="currentBaseId"
            />
            {{ base.name }}
          </label>
        </template>
      </li>

      <!-- Cream -->
      <li>
        <template v-for="cream in Cream" :key="cream.id">
          <label>
            <input
              type="radio"
              name="cream"
              :id="`r${cream.id}`"
              :value="cream.id"
              v-model="currentCreamId"
            />
            {{ cream.name }}
          </label>
        </template>
      </li>

      <!-- Syrup -->
      <li>
        <template v-for="syrup in Syrup" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`r${syrup.id}`"
              :value="syrup.id"
              v-model="currentSyrupId"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>

  <div class="actions">
    <ul>
      <input v-model="newName" placeholder="Name your drink" />
      <button @click="makeBeverage">Save</button>
    </ul>  
      <ul class="Saved">
        <template v-for="bev in savedBeverages" :key="bev.id">
          <label>
            <input
              type="button"
              name="Saved Beverage"
              :id="`r${bev.id}`"
              :value="bev.name"
              v-model="bev.name"
              @click="showBeverage(bev.id)"
            />
          </label>
          <button @click="deleteBeverage(bev.id)">X</button>
        </template>
        </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import { storeToRefs } from "pinia";
import { currentBaseId, currentCreamId, currentSyrupId } from "./stores/beverageComputed";
import { ref } from "vue";

const beverageStore = useBeverageStore();
const { Temps, Base, Cream, Syrup, currentTemp, savedBeverages } = storeToRefs(beverageStore);

const newName = ref("");

function makeBeverage() {
  if (!newName.value.trim()) return;
  beverageStore.makeBeverage(newName.value.trim());
  newName.value = "";
}

function showBeverage(id: string) {
  beverageStore.showBeverage(id);
}

function deleteBeverage(id: string) {
  beverageStore.deleteBeverage(id);
}

</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}

.Saved {
  display: grid;
  grid-template-columns:  40% 10%;
  justify-content: center;
  gap: 0.75rem;
  padding: 0;
}

</style>
