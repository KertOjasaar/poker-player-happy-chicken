import {Card, GameState, Suit} from '../interfaces';
import {evalPreFlop, evaluateHand, HandStrength} from '../evaluateHand';

const gameState: GameState = {"tournament_id":"6560936735ff2a0002fbb1e2","game_id":"656890054ae915000287bbd5","round":12,"players":[{"name":"Salakala2","stack":987,"status":"folded","bet":6,"version":"v.1.6.3","id":0},{"name":"Energetic Dolphin","stack":624,"status":"active","bet":24,"version":"2","id":1},{"name":"Happy Chicken","stack":1344,"status":"active","bet":15,"hole_cards":[{"rank":"J","suit":Suit.SPADES},{"rank":"4","suit":Suit.SPADES}],"version":"v0.6 :o","id":2}],"small_blind":3,"orbits":4,"dealer":1,"community_cards":[{"rank":"J","suit":Suit.HEARTS},{"rank":"Q","suit":Suit.HEARTS},{"rank":"3","suit":Suit.SPADES}],"current_buy_in":24,"pot":45,"in_action":2,"minimum_raise":9,"bet_index":3};

describe('Evaluate hand', () => {
  describe('Post flop', () => {
    it('should recognise high card', () => {
      const holeCards = [
        {rank: 'A', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.DIAMONDS},
      ];
      const communityCards = [
        {rank: 'K', suit: Suit.SPADES},
        {rank: 'J', suit: Suit.SPADES},
        {rank: '7', suit: Suit.HEARTS},
        {rank: '5', suit: Suit.CLUBS},
        {rank: '3', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.HIGH_CARD);
    });

    it('should recognise pair', () => {
      const holeCards = [
        {rank: 'A', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.DIAMONDS},
      ];
      const communityCards = [
        {rank: 'A', suit: Suit.DIAMONDS},
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.HEARTS},
        {rank: '7', suit: Suit.CLUBS},
        {rank: '5', suit: Suit.DIAMONDS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.PAIR);
    });

    it('should recognise two pairs', () => {
      const holeCards = [
        {rank: 'A', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.DIAMONDS},
      ];
      const communityCards = [
        {rank: 'A', suit: Suit.DIAMONDS},
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.HEARTS},
        {rank: '7', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.TWO_PAIRS);
    });

    it('should recognise three of a kind', () => {
      const holeCards = [
        {rank: 'A', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.DIAMONDS},
      ];
      const communityCards = [
        {rank: 'A', suit: Suit.DIAMONDS},
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.HEARTS},
        {rank: '7', suit: Suit.CLUBS},
        {rank: 'A', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.THREE_OF_A_KIND);
    });

    it('should recognise three of a kind in community cards', () => {
      const holeCards: Card[] = [];
      const communityCards = [
        {rank: 'A', suit: Suit.DIAMONDS},
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.HEARTS},
        {rank: 'A', suit: Suit.CLUBS},
        {rank: 'A', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.THREE_OF_A_KIND);
    });

    it('Does not fail without cards', () => {
      expect(evaluateHand([])).toEqual(HandStrength.HIGH_CARD);
    });

    it('should recognise three of a kind', () => {
      const holeCards = [
        {rank: '2', suit: Suit.DIAMONDS},
        {rank: 'A', suit: Suit.CLUBS},
      ];
      const communityCards = [
        {rank: 'A', suit: Suit.DIAMONDS},
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.HEARTS},
        {rank: '7', suit: Suit.CLUBS},
        {rank: 'A', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.THREE_OF_A_KIND);
    });

    it('should recognise a straight A-5', () => {
      const holeCards = [
        {rank: 'A', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.DIAMONDS},
      ];
      const communityCards = [
        {rank: '3', suit: Suit.DIAMONDS},
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '5', suit: Suit.HEARTS},
        {rank: '4', suit: Suit.CLUBS},
        {rank: 'A', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.STRAIGHT);
    });

    it('should recognise a straight 7-J', () => {
      const holeCards = [
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.DIAMONDS},
      ];
      const communityCards = [
        {rank: '7', suit: Suit.DIAMONDS},
        {rank: 'T', suit: Suit.CLUBS},
        {rank: '5', suit: Suit.HEARTS},
        {rank: '9', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.HEARTS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.STRAIGHT);
    });

    it('should recognise a flush', () => {
      const holeCards = [
        {rank: 'J', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.CLUBS},
      ];
      const communityCards = [
        {rank: 'T', suit: Suit.DIAMONDS},
        {rank: 'T', suit: Suit.CLUBS},
        {rank: '9', suit: Suit.HEARTS},
        {rank: '9', suit: Suit.CLUBS},
        {rank: '8', suit: Suit.CLUBS},
      ];

      expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.STRAIGHT);
    });
  });

  describe('Pre flop', () => {
    it('should fold bad hand', () => {
      const holeCards = [
        {rank: '9', suit: Suit.CLUBS},
        {rank: '2', suit: Suit.HEARTS},
      ];
      expect(evalPreFlop(gameState, holeCards)).toEqual(0);
    });
    it('should handle a pair', () => {
      const holeCards = [
        {rank: '9', suit: Suit.CLUBS},
        {rank: '9', suit: Suit.HEARTS},
      ];
      expect(evalPreFlop(gameState, holeCards)).toEqual(100);
    });
    it('should handle a pair', () => {
      const holeCards = [
        {rank: 'K', suit: Suit.CLUBS},
        {rank: 'A', suit: Suit.HEARTS},
      ];
      expect(evalPreFlop(gameState, holeCards)).toEqual(100);
    });
  });
});
