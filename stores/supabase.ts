import { defineStore } from "pinia";
interface Player {
  id: number;
  name: string;
  initiative: number;
  conditions: string[];
  isHero: boolean;
  lastInTurn: boolean;
}

interface Game {
  id: number;
  fumble: number;
  turnCounter: number;
}

interface Condition {
  name: string;
  description: string;
}

export const useSupabaseStore = defineStore('supabase', () => {
  const conditions = ref<string[]>([])
  const players = ref<Player[]>([])
  const theGame = ref<Game>()
  const supabase = useSupabaseClient()
  const turnCounter = ref(0)
  const user = useSupabaseUser();
  const isLoaded = ref(false)

  async function addPlayer(player: Player) {
    if (!theGame.value) return;

    const { data, error } = await supabase
      .from('players')
      .insert([
        { 
          games_id: theGame.value.id, 
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

  async function changeTurn(value: number) {
    const { data, error } = await supabase
      .from("games")
      .update({ turnCounter: theGame.value.turnCounter + value })
      .match({ id: theGame.value.id })
      .select();
    
      if (error) {
      console.error("Error updating turn count: ", error);
    }
  }

  async function deletePlayersOfType(isHero: boolean = true) {
    const { data, error } = await supabase
      .from("players")
      .delete()
      .match({ isHero: isHero, games_id: theGame.value.id })
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
    if (!theGame.value) return;

    const { data, error } = await supabase
      .from("players")
      .select("*")
      .match({games_id: theGame.value.id})
      .order("initiative", { ascending: false })

    if (error) {
      console.error('Error fetching players:', error);
    }

    return data;
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

    // return data.map((condition: any) => condition.name);
    return data.map((condition: Condition) => {
      return {
        name: condition.name,
        description: condition.description,
      };
    });

  }

  async function loadGameData() {
    theGame.value = await userHasGame();
    players.value = await fetchPlayersData() as Player[];
    sortPlayers()
    conditions.value = await loadConditions() as string[];
    isLoaded.value = true;
  }

  async function ResetPlayerValues() {
    const { data, error } = await supabase
      .from("players")
      .update({ initiative: 0, lastInTurn: false })
      .match({ isHero: true, games_id: theGame.value.id })
      .select();

    if (error) {
      console.error("Error resetting initiative", error);
    }
  }

  async function resetTurnCounter() {
    const { data, error } = await supabase
    .from("games")
    .update({ turnCounter: 0 })
    .match({ id: theGame.value.id })
    .select();
  }

  /**
   * Sorts the players array in place.
   */
  function sortPlayers() {
    players.value.sort((a, b) => {
      // Move player a to the end if player a is last in turn and player b is not
      if (a.lastInTurn && !b.lastInTurn) return 1;
      // Move player b to the end if player a is not last in turn and player b is last in turn
      if (!a.lastInTurn && b.lastInTurn) return -1;
      // Sort by initiative within lastInTurn group in descending order
      if (a.lastInTurn && b.lastInTurn) return b.initiative - a.initiative;

      // If both initiatives are 0, sort alphabetically by name
      if (a.initiative === 0 && b.initiative === 0) {
        return a.name.localeCompare(b.name);
      }

      // Sort by initiative for others in descending order
      return b.initiative - a.initiative;
    });
  }

  function subscribeToGameChanges() {
    const subscription = supabase
      .channel("public:games")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "games" },
        (payload) => {
          // console.log("Change received!", payload);
          const newGame = payload.new as Game;

          switch (payload.eventType) {
            case "INSERT":
              theGame.value = newGame;
              break;
            case "UPDATE":
              theGame.value = newGame;
              break;
          }
        }
      )
      .subscribe();

    return subscription;
  }

  function subscribeToPlayersChanges() {
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
        games_id: theGame.value.id,
        name: player.name,
        conditions: conditionsString,
        initiative: player.initiative,
        isHero: player.isHero,
        lastInTurn: player.lastInTurn,
      })
      .select();

    if (error) {
      console.error("Error updating player", error);
    }
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
      }
    }
    
    return data[0];
  }

  return {
    addPlayer,
    changeTurn,
    conditions,
    deletePlayersOfType,
    deletePlayerById,
    getPlayerById,
    isLoaded,
    loadConditions,
    loadGameData,
    players,
    ResetPlayerValues,
    resetTurnCounter,
    subscribeToGameChanges,
    subscribeToPlayersChanges,
    theGame,
    turnCounter,
    updatePlayer,
  };
})
