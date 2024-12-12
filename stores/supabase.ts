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
    
    if (data) {
      players.value.push(data[0])
    }

    sortPlayers()
  }

  async function deletePlayer(id: number) {
    const { data, error } = await supabase
      .from('turnOrder')
      .delete()
      .match({ id: id })
      .select();
          
    if (error) {
      console.error("Error deleting player", error);
    }

    if (data) {
      const index = players.value.findIndex((player) => player.id === id);
      if (index !== -1) {
        players.value.splice(index, 1);
      }
    }
    
    sortPlayers()
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
    const { data, error } = await supabase.from("turnOrder").select("*").order("initiative", { ascending: false });
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

    // Update the players array with the new values from the updated player
    const index = players.value.findIndex((p) => p.id === player.id)
    
    if (index !== -1) {
      players.value[index] = { ...player }
    }

    sortPlayers()
  }

  function sortPlayers() {
    players.value.sort((a, b) => b.initiative - a.initiative);
  }

  return {
    addPlayer,
    conditions,
    deletePlayer,
    getPlayerById,
    loadConditions,
    loadGameData,
    loadTurnOrder,
    players,
    updatePlayer,
  };
})
