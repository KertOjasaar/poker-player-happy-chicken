import {Card, GameState, PlayerI} from './interfaces';
import evaluateHand from './evaluateHand';
import preflopDecision from './preflopDecision';

const TEAM_NAME = 'Happy Chicken';

export class Player {
  private us: PlayerI | undefined;

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    let handStrength = 0;
    try {
      this.us = gameState.players.find((player) => player.name === TEAM_NAME);
      if (this.us) {
        if (gameState.community_cards?.length == 0 && this.us.hole_cards?.length == 2) {
          handStrength = this.evalPreFlop(gameState, this.us.hole_cards);
        } else {
          handStrength = evaluateHand(this.us.hole_cards, gameState.community_cards);
        }
        betCallback(handStrength > 0 ? this.evalGoodCards(gameState, betCallback, handStrength) : gameState.small_blind * 2);
        return;
      } else {
        console.warn('Our cards don\'t exist');
      }
    } catch (error) {
      console.error('betRequest error', error);
    }

    betCallback(0);
  }

  private evalPreFlop(gameState: GameState, holeCards: Card[]) {
    const first = holeCards[0].rank;
    const second = holeCards[1].rank;

    // @ts-ignore
    const handStrength: number = preflopDecision[`${first}${second}`] || 0;
    const currentBet =  gameState.current_buy_in - gameState.players[gameState.in_action].bet;

    if (handStrength >= 80) {
      return gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise;
    }
    if (handStrength > 0 && currentBet < (this.us?.stack || 1000) / 100) {
      return currentBet;
    }
    return 0;
  }

  public evalGoodCards(gameState: GameState, betCallBack: (bet: number) => void, handStrength: number): number {
    const currentBet =  gameState.current_buy_in - gameState.players[gameState.in_action].bet;
    const ourBet = Math.round((this.us?.stack || 1000) * handStrength / 1000);
    if (ourBet > currentBet) {
      // min raise
      return gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise;
    }
    return currentBet;
  }

  public showdown(gameState: GameState): void {

  }
}

export default Player;
