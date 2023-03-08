import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

import { AddOrModifyGameComponent } from "../add-or-modify-game/add-or-modify-game.component";

import { Game, GameService } from "../game.service";
import { SessionService } from "../session.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  gameTableDisplayedColumns: string[] = [
    "position",
    "cover",
    "title",
    "starts",
    "price",
    "actions",
  ];
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private gameService: GameService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (
      !this.sessionService.isLogged() ||
      !this.sessionService.getLoggedUser()?.admin
    ) {
      this.router.navigate(["/"]);
    }
  }

  edit(game: Game) {
    this.dialog.open(AddOrModifyGameComponent, {
      width: "50%",
      data: game,
    });
  }

  delete(game: Game) {
    this.gameService.removeGameByTitle(game.title);
  }

  getGameSource() {
    return new MatTableDataSource(
      this.gameService.games.map((g, i) => ({ position: i + 1, ...g }))
    );
  }

  openAddGameDialog() {
    this.dialog.open(AddOrModifyGameComponent, {
      width: "50%",
    });
  }
}
