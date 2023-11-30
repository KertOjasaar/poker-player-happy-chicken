import {Suit} from '../interfaces';
import evaluateHand, {HandStrength} from '../evaluateHand';

describe('Evaluate hand', () => {
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
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
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
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
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
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
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

  it('should recognise three of a kind', () => {
    const holeCards = [
      { rank: '2', suit: Suit.DIAMONDS },
      { rank: 'A', suit: Suit.CLUBS },
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

  it.skip('should recognise a straight A-5', () => {
    const holeCards = [
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
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

  it.skip('should recognise a straight 7-J', () => {
    const holeCards = [
      { rank: 'J', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
    ];
    const communityCards = [
      {rank: '7', suit: Suit.DIAMONDS},
      {rank: '10', suit: Suit.CLUBS},
      {rank: '5', suit: Suit.HEARTS},
      {rank: '9', suit: Suit.CLUBS},
      {rank: '8', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.STRAIGHT);
  });
});
