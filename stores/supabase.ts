import { defineStore } from "pinia";
interface Player {
  id: number;
  name: string;
  initiative: number;
  conditions: string[];
  isHero: boolean;
}

export const useSupabaseStore = defineStore('supabase', () => {
  const conditions = ref<string[]>([])
  const players = ref<Player[]>([])
  const gamesID = ref(null)
  const supabase = useSupabaseClient()
  const turnCounter = ref(0)
  const user = useSupabaseUser();

  async function addPlayer(player: Player) {
    const { data, error } = await supabase
      .from('players')
      .insert([
        { 
          games_id: gamesID.value, 
          name: player.name, 
          initiative: player.initiative, 
          conditions: [], 
          isHero: player.isHero 
        },
      ])
      .select();

    if (error) {
      console.error("Error adding player", error);
    }
  }

  function changeTurn(value: number) {
    turnCounter.value += value

    if (turnCounter.value < 0) {
      turnCounter.value = 0
    }
  }

  async function deletePlayersOfType(isHero: boolean = true) {
    const { data, error } = await supabase
      .from("players")
      .delete()
      .match({ isHero: isHero, games_id: gamesID.value })
      .select();

    if (error) {
      console.error("Error deleting monster", error);
    }
  }

  async function deletePlayerById(id: number) {
    const { data, error } = await supabase
      .from("players")
      .delete()
      .select()
      .eq("id", id);
          
    if (error) {
      console.error("Error deleting player", error);
    }
  }

  /**
   * Fetches active game from supabase and adds it to the store.
   */
  async function fetchPlayersData() {
    const { data, error } = await supabase
      .from("games")
      .select(
        `
        id,
        players (
          id,
          games_id,
          name,
          initiative,
          conditions,
          isHero
        )
      `
      )
      .match({uuid: user.value.id})
      .order("initiative", { referencedTable: "players", ascending: false })
      .single();

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      players.value = data.players as Player[];
      gamesID.value = data.id;
    }
  }

  function getPlayerById(id: number) {
    return players.value.find((player) => player.id === id);
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

  async function loadGameData() {
    await userHasGame();
    await fetchPlayersData();
    await loadConditions();
  }

  async function ResetInitiative() {
    const { data, error } = await supabase
      .from("players")
      .update({ initiative: 0 })
      .match({ isHero: true, games_id: gamesID.value })
      .select();

    if (error) {
      console.error("Error resetting initiative", error);
    }
  }

  function resetTurnCounter() {
    turnCounter.value = 0
  }

  function sortPlayers() {
    players.value.sort((a, b) => b.initiative - a.initiative);
  }

  function subscribeToTurnOrderChanges() {
    const subscription = supabase
      .channel("public:players")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        (payload) => {
          // console.log("Change received!", payload);
          const newPlayer = payload.new as Player;
          const oldPlayer = payload.old as Player;

          switch (payload.eventType) {
            case "INSERT":
              players.value.push(newPlayer);
              sortPlayers();
              break;
            case "UPDATE":
              const index = players.value.findIndex(
                (p) => p.id === newPlayer.id
              );
              if (index !== -1) {
                players.value[index] = newPlayer;
              }
              sortPlayers();
              break;
            case "DELETE":
              const deleteIndex = players.value.findIndex(
                (p) => p.id === oldPlayer.id
              );
              if (deleteIndex !== -1) {
                players.value.splice(deleteIndex, 1);
              }
              break;
          }
        }
      )
      .subscribe();

    return subscription;
  }

  /**
   * Change a value for the player in the database.
   * 
   * @param player <Player>
   *   The player object to update
   */
  async function updatePlayer(player: Player) {
    const conditionsString = `{${player.conditions
      .map((condition) => `"${condition}"`)
      .join(",")}}`;

    const { data, error } = await supabase
      .from("players")
      .upsert({
        id: player.id,
        games_id: gamesID.value,
        name: player.name,
        conditions: conditionsString,
        initiative: player.initiative,
        isHero: player.isHero,
      })
      .select();

    if (error) {
      console.error("Error updating player", error);
    }

    sortPlayers();
  }

  async function userHasGame() {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .match({uuid: user.value.id});

    if (error) {
      console.error("Error checking for game", error);
    }

    if (data.length === 0) {
      const { data, error } = await supabase
        .from("games")
        .insert([{ uuid: user.value.id }])
        .select();

      if (error) {
        console.error("Error creating game", error);
      } else {
        gamesID.value = data[0].id;
      }
    } else {
      gamesID.value = data[0].id;
    }
  }

  return {
    addPlayer,
    changeTurn,
    conditions,
    deletePlayersOfType,
    deletePlayerById,
    getPlayerById,
    loadConditions,
    loadGameData,
    players,
    ResetInitiative,
    resetTurnCounter,
    subscribeToTurnOrderChanges,
    turnCounter,
    updatePlayer,
  };
})
