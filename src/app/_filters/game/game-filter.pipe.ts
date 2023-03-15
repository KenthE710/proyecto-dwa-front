import { Pipe, PipeTransform } from "@angular/core";
import { GameListItem } from "src/app/_services/game";

@Pipe({
  name: "gameFilter",
})
export class GameFilterPipe implements PipeTransform {
  transform(games: GameListItem[] | null, filter: string): GameListItem[] {
    if (!games || !games.length) return [];
    if (!filter) return games;

    return games.filter((_) =>
      _.title.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
