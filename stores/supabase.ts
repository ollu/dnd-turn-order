import { defineStore } from "pinia";
interface Player {
  id: number;
  name: string;
  initiative: number;
  conditions: string[];
  isHero: boolean;
}

export const useSupabaseStore = defineStore('supabase', () => {
  const supabase = useSupabaseClient()
  const players = ref<Player[]>([])
  const conditions = ref<string[]>([])

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
      return null;
    }

    if (data) {
      conditions.value = data.map((condition: any) => condition.name);
    }

    return data;
  }

  async function loadTurnOrder() {
    const { data, error } = await supabase.from("turnOrder").select("*");
    if (error) {
      console.error("Error loading turn order", error);
      return null;
    }

    if (data) {
      players.value = data as Player[];
    }

    return data;
  }

  async function loadGameData() {
    await loadConditions();
    await loadTurnOrder();
  }

  function getPlayerById(id: number) {
    console.log(players.value);
    
    return players.value.find((player) => player.id === id);
  }

  async function updatePlayer(player: Player) {
    const { data, error } = await supabase
      .from("turnOrder")
      .upsert({
        id: player.id,
        name: player.name,
        conditions: player.conditions,
        initiative: player.initiative,
        isHero: player.isHero,
      })
      .select();

    if (error) {
      console.error("Error updating player", error);
    }
    
  }

  return {
    addPlayer,
    conditions,
    getPlayerById,
    loadConditions,
    loadGameData,
    loadTurnOrder,
    players,
    updatePlayer,
  };
})
