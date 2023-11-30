import {GameState, PlayerI} from './interfaces';
import evaluateHand from './evaluateHand';

const TEAM_NAME = 'Happy Chicken';

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    let handStrength = 0;
    try {
      const us: PlayerI | undefined = gameState.players.find((player) => player.name === TEAM_NAME);
      if (us) {
        handStrength = evaluateHand(us.hole_cards, gameState.community_cards);
        betCallback(us.stack / handStrength);
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
