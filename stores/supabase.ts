import { defineStore } from "pinia";
interface Player {
  name: string;
  initiative: number;
  conditions: string[];
  isHero: boolean;
}

export const useSupabaseStore = defineStore("supabase", () => {
  const supabase = useSupabaseClient()
  const players = ref<Player | null>(null)

  async function addPlayer(player: Player) {
    const { data, error } = await supabase
      .from('turnOrder')
      .insert([
        { name: player.name, initiative: player.initiative, isHero: player.isHero },
      ])
      .select();
          
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

  async function loadTurnOrder() {
    const { data, error } = await supabase.from("turnOrder").select("*");
    if (error) {
      console.error("Error loading turn order", error);
      return null
    }
    
    return data
  }

  return {
    addPlayer,
    loadConditions,
    loadTurnOrder,
  };
})
