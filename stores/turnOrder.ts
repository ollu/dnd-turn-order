import { defineStore } from 'pinia'
interface Player {
  name: string
  initiative: number
  conditions: string[]
  type: string
}

export const useTurnOrderStore = defineStore('turnOrder', {
  state: () => ({
    players: [] as Player[],
    turnCounter: 0,
  }),
  actions: {
    addPlayer(player: Player) {
      this.players.push({ ...player, conditions: [] })
      this.sortPlayers()
      this.saveToLocalStorage()
    },
    deleteAllHeroes() {
      // Remove all players that are heroes.
      this.players = this.players.filter((player) => player.type === "monster");
      this.saveToLocalStorage()
    },
    deleteAllMonsters() {
      // Remove all players that are NOT heroes.
      this.players = this.players.filter((player) => player.type === "hero");
      this.saveToLocalStorage()
    },
    removePlayer(index: number) {
      this.players.splice(index, 1)
      this.saveToLocalStorage()
    },
    resetFight() {
      this.deleteAllMonsters()

      // Reset conditions and initiative for all players.
      this.players.forEach((player) => {
        player.conditions = []
        player.initiative = 0
      })

      this.turnCounter = 0
      this.saveToLocalStorage();
    },
    resetTurnCounter() {
      this.turnCounter = 0
      this.saveToLocalStorage()
    },
    sortPlayers() {
      this.players.sort((a, b) => b.initiative - a.initiative)
    },
    changeTurn(value: number) {
      this.turnCounter += value

      if (this.turnCounter < 0) {
        this.turnCounter = 0
      }
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('turnOrder', JSON.stringify(this.$state))
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('turnOrder')
      if (data) {
        const parsedData = JSON.parse(data)
        parsedData.players.forEach((player: Player) => {
          if (!player.conditions) {
            player.conditions = []
          }
        })
        this.$state = parsedData
      }
    },
  },
})
