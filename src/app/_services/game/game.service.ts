import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BackendApi } from "src/app/Consts";
import { Game, GameListItem, ListGamesDto } from "./types";

@Injectable({
  providedIn: "root",
})
export class GameService {
  constructor(private http: HttpClient) { }

  getGamesList(): Observable<GameListItem[]> {
    return this.http
      .get<ListGamesDto>(BackendApi + "game")
      .pipe(map((dto) => dto.games));
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(BackendApi + "game/" + id);
  }
}
