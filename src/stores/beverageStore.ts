import { defineStore } from "pinia";
import tempretures from "../data/tempretures.json";
import syrups from "../data/syrups.json";
import creamers from "../data/creamers.json";
import bases from "../data/bases.json";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    Temps: tempretures,
    currentTemp: tempretures[0],
    Base: bases,
    currentBase: bases[0],
    Cream: creamers,
    currentCream: creamers[0],
    Syrup: syrups,
    currentSyrup: syrups[0],

    savedBeverages: [] as {
      id: string;
      name: string;
      temp: string;
      baseId: string;
      creamId: string;
      syrupId: string;
    }[],
  }),

  actions: {
    makeBeverage(name: string) {
      const newBeverage = {
        id: String(Math.floor(Math.random()*10)),
        name,
        temp: this.currentTemp,
        baseId: this.currentBase.id,
        creamId: this.currentCream.id,
        syrupId: this.currentSyrup.id,
      };
      this.savedBeverages.push(newBeverage);
    },

    showBeverage(id: string) {
      const bev = this.savedBeverages.find((b) => b.id === id);
      if (!bev) return;

      this.currentTemp = bev.temp;
      this.currentBase = this.Base.find((b) => b.id === bev.baseId)!;
      this.currentCream = this.Cream.find((c) => c.id === bev.creamId)!;
      this.currentSyrup = this.Syrup.find((s) => s.id === bev.syrupId)!;
    },

  deleteBeverage(id: string) {
    this.savedBeverages = this.savedBeverages.filter((b) => b.id !== id);
  },

  },

  persist: true, // still persists via pinia-plugin-persistedstate
});

