import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game, GameService } from "../game.service";

import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-add-or-modify-game",
  templateUrl: "./add-or-modify-game.component.html",
  styleUrls: ["./add-or-modify-game.component.css"],
})
export class AddOrModifyGameComponent {
  newGame: any;

  constructor(
    private dialogRef: MatDialogRef<AddOrModifyGameComponent>,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public game?: Game
  ) {
    this.newGame = this.createFormGroup(game);
  }

  private createFormGroup(game?: Game) {
    const _game: Game = game ?? { cover: "", title: "", price: 0, starts: 0 };
    return new FormGroup({
      cover: new FormControl(_game.cover, Validators.required),
      title: new FormControl(_game.title, Validators.required),
      starts: new FormControl(_game.starts, Validators.required),
      price: new FormControl(_game.price, Validators.required),
    });
  }

  openSnackbar(m: string) {
    this.snackBar.open(m, "cerrar", { duration: 3000 });
  }

  addOrModifyGame() {
    try {
      if (this.isNewGame()) {
        this.gameService.addGame(this.newGame.value as any);
      } else {
        this.gameService.modifyGameByTitle(
          this.game!.title,
          this.newGame.value as any
        );
      }
      this.dialogRef.close();
    } catch (e) {
      this.openSnackbar((e as Error).message);
    }
  }

  isNewGame() {
    return !Boolean(this.game);
  }

  cancel() {
    this.dialogRef.close();
  }
}
