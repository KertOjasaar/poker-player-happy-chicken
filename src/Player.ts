import {GameState, PlayerI} from './interfaces';
import evaluateHand from './evaluateHand';

const TEAM_NAME = 'Happy Chicken';

export class Player {
  private us: PlayerI | undefined;

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    let handStrength = 0;
    try {
      this.us = gameState.players.find((player) => player.name === TEAM_NAME);
      if (this.us) {
        handStrength = evaluateHand(this.us.hole_cards, gameState.community_cards);
        betCallback(handStrength > 0 ? this.evalGoodCards(gameState, betCallback, handStrength) : 10);
        return;
      } else {
        console.warn('Our cards don\'t exist');
      }
    } catch (error) {
      console.error('betRequest error', error);
    }

    betCallback(0);
  }

  public evalGoodCards(gameState: GameState, betCallBack: (bet: number) => void, handStrength: number): number {
    const currentBet =  gameState.current_buy_in - gameState.players[gameState.in_action].bet;
    const ourBet = Math.round((this.us?.stack || 1000) * handStrength / 100);
    if (ourBet > currentBet) {
      return ourBet;
    }
    return currentBet;
  }

  public showdown(gameState: GameState): void {

  }
}

export default Player;
