import { defineStore } from "pinia";
interface Player {
  name: string;
  initiative: number;
  conditions: string[];
  isHero: boolean;
}

export const useSupabaseStore = defineStore("supabase", () => {
  const supabase = useSupabaseClient();

  async function addPlayer(player: Player) {
    const { data, error } = await supabase.from("fight").insert(player);
    if (error) {
      console.error("Error adding player", error);
    }
  }

  async function loadConditions() {
    const { data, error } = await supabase.from("conditions").select("*");
    if (error) {
      console.error("Error loading conditions", error);
    }

    return data;
  }

  return {
    loadConditions,
    addPlayer,
  };
})
