import { Pipe, PipeTransform } from "@angular/core";

import type { Game } from "./game.service";

@Pipe({
  name: "gameFilter",
})
export class GameFilterPipe implements PipeTransform {
  transform(games: Game[], filter: string): Game[] {
    if (!games || !games.length) return [];
    if (!filter) return games;

    return games.filter((_) =>
      _.title.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
