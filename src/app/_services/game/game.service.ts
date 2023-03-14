import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { BackendApi } from "src/app/Consts";
import { Game, GameListItem, ListGamesDto } from "./types";

@Injectable({
  providedIn: "root",
})
export class GameService {
  constructor(private http: HttpClient) { }

  games: GameListItem[] = [];

  private getRemoteGameList(): Observable<GameListItem[]> {
    return this.http
      .get<ListGamesDto>(BackendApi + "game")
      .pipe(map((dto) => dto.games))
      .pipe(
        tap((g) => {
          this.games = g;
        })
      );
  }

  getGamesList() {
    return this.games.length ? of(this.games) : this.getRemoteGameList();
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(BackendApi + "game/" + id);
  }
}
