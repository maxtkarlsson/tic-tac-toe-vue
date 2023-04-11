import { Player } from "./Player";

export class GameState {
  constructor(
    public players: Player[],
    public gameboard: number[],
    public currentPlayer: number,
    public isGamerOver: boolean
  ) {}
}
