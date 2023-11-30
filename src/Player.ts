import { GameState } from './interfaces';

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    betCallback(1000);
  }

  public showdown(gameState: GameState): void {

  }
}

export default Player;
