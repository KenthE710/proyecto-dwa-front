import { Injectable } from "@angular/core";

export interface Game {
  cover: string;
  title: string;
  starts: number;
  price: number;
}

export const DEF_GAMES = [
  {
    cover:
      "https://cdn.lorem.space/images/game/.cache/300x441/assassins-creed.jpg",
    title: "Assassin's Creed II",
    starts: 5,
    price: 20,
  },
  {
    cover:
      "https://cdn.lorem.space/images/game/.cache/300x441/the-walking-dead.jpg",
    title: "The Walking Dead",
    starts: 3,
    price: 12,
  },
  {
    cover: "https://cdn.lorem.space/images/game/.cache/300x441/pes-2018.jpg",
    title: "PES 2018",
    starts: 4,
    price: 14,
  },
  {
    cover:
      "https://cdn.lorem.space/images/game/.cache/300x441/ghost-of-tsushima.jpg",
    title: "Ghost of Tsushima",
    starts: 5,
    price: 49,
  },
  {
    cover:
      "https://cdn.lorem.space/images/game/.cache/300x441/assasins-creed-odyssey.jpg",
    title: "Assassin's Creed Odyssey",
    starts: 3,
    price: 49,
  },
  {
    cover:
      "https://cdn.lorem.space/images/game/.cache/300x441/back-4-blood.jpg",
    title: "Back 4 Blood",
    starts: 3,
    price: 11,
  },
  {
    cover: "https://cdn.lorem.space/images/game/.cache/300x441/portal-2.jpg",
    title: "Portal 2",
    starts: 4,
    price: 25,
  },
  {
    cover: "https://cdn.lorem.space/images/game/.cache/300x441/god-of-war.jpg",
    title: "God of War Ragnarök",
    starts: 5,
    price: 45,
  },
  {
    cover: "https://cdn.lorem.space/images/game/.cache/300x441/half-life2.jpg",
    title: "Half Life 2",
    starts: 4,
    price: 15,
  },
  {
    cover: "https://cdn.lorem.space/images/game/.cache/300x441/spider-man.jpg",
    title: "SpiderMan",
    starts: 4,
    price: 59,
  },
];

const KEYS = {
  games: "eg-games",
};

@Injectable({
  providedIn: "root",
})
export class GameService {
  games: Game[] = DEF_GAMES;

  constructor() {
    const localGames = this.getLocalGames();
    if (localGames !== null) {
      this.games = localGames;
    } else {
      this.saveGamesLocally(DEF_GAMES);
    }
  }

  findGameByTitle(title: string) {
    return this.games.find((g) => g.title === title);
  }

  addGame(game: Game) {
    if (this.findGameByTitle(game.title) !== undefined)
      throw new Error("Juego ya existe");
    this.games.push(game);
    this.saveGamesLocally(this.games);
  }

  modifyGameByTitle(title: string, game: Game) {
    const gameIndex = this.games.findIndex((g) => g.title === title);
    if (gameIndex === -1) throw new Error("Juego no existe");
    this.games[gameIndex] = game;
    this.saveGamesLocally(this.games);
  }

  removeGameByTitle(title: string) {
    this.games = this.games.filter((g) => g.title !== title);
    this.saveGamesLocally(this.games);
  }

  private getLocalGames(): Game[] | null {
    return JSON.parse(localStorage.getItem(KEYS.games)!);
  }
  private saveGamesLocally(games: Game[]) {
    localStorage.setItem(KEYS.games, JSON.stringify(games));
  }
}
