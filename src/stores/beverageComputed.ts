import { computed } from "vue";
import { useBeverageStore } from "./beverageStore";

// Helper to safely get the store only when Pinia is ready
function getStore() {
  return useBeverageStore();
}

// Colors
export const Bcolor = computed(() => getStore().currentBase.color);
export const Ccolor = computed(() => getStore().currentCream.color);
export const Scolor = computed(() => getStore().currentSyrup.color);

// Computed IDs
export const currentBaseId = computed({
  get: () => getStore().currentBase.id,
  set: (id: string) => {
    getStore().currentBase = getStore().Base.find((b) => b.id === id)!;
  },
});

export const currentCreamId = computed({
  get: () => getStore().currentCream.id,
  set: (id: string) => {
    getStore().currentCream = getStore().Cream.find((c) => c.id === id)!;
  },
});

export const currentSyrupId = computed({
  get: () => getStore().currentSyrup.id,
  set: (id: string) => {
    getStore().currentSyrup = getStore().Syrup.find((s) => s.id === id)!;
  },
});
