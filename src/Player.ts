import {GameState, PlayerI} from './interfaces';
import { evalPreFlop, evalGoodCards, evaluateHand } from './evaluateHand';

const TEAM_NAME = 'Happy Chicken';

export class Player {
  private us: PlayerI | undefined;

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    let handStrength = 0;
    try {
      this.us = gameState.players.find((player) => player.name === TEAM_NAME);
      if (this.us) {
        const isPreFlop = gameState.community_cards?.length == 0 && this.us.hole_cards?.length == 2;
        if (isPreFlop) {
          // @ts-ignore
          handStrength = evalPreFlop(gameState, this.us.hole_cards);
        } else {
          handStrength = evaluateHand(this.us.hole_cards, gameState.community_cards);
        }
        betCallback(handStrength > 0 ? evalGoodCards(gameState, betCallback, handStrength, isPreFlop) : 0);
        return;
      } else {
        console.warn('Our cards don\'t exist');
      }
    } catch (error) {
      console.error('betRequest error', error);
    }

    betCallback(0);
  }

  public showdown(gameState: GameState): void {

  }
}

export default Player;
