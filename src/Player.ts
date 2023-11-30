import { GameState } from './interfaces';
import evaluateHand from './evaluateHand';

const TEAM_NAME = 'Happy Chicken';

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    try {
      console.log('GameState', gameState);
      const us = gameState.players.find((player) => player.name === TEAM_NAME);
      const handStrength = evaluateHand(us!.hole_cards, gameState.community_cards);
      console.log('betRequest evaluation:', {
        us,
        communityCards: gameState.community_cards,
        handStrength,
      });
    } catch (error) {
      console.error('betRequest error', error);
    }

    betCallback(1000);
  }

  public showdown(gameState: GameState): void {

  }
}

export default Player;
