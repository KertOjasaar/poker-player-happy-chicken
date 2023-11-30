import {Card, Suit} from '../interfaces';
import evaluateHand, {HandStrength} from '../evaluateHand';

describe('Evaluate hand', () => {
  it('should recognise high card', () => {
    const holeCards: Card[] = [
      {rank: 'A', suit: Suit.CLUBS},
      {rank: '2', suit: Suit.DIAMONDS},
    ];
    const communityCards: Card[] = [
      {rank: 'K', suit: Suit.SPADES},
      {rank: 'J', suit: Suit.SPADES},
      {rank: '7', suit: Suit.HEARTS},
      {rank: '5', suit: Suit.CLUBS},
      {rank: '3', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.HIGH_CARD);
  });

  it('should recognise pair', () => {
    const holeCards: Card[] = [
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
    ];
    const communityCards: Card[] = [
      {rank: 'A', suit: Suit.DIAMONDS},
      {rank: 'J', suit: Suit.CLUBS},
      {rank: '8', suit: Suit.HEARTS},
      {rank: '7', suit: Suit.CLUBS},
      {rank: '5', suit: Suit.DIAMONDS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.PAIR);
  });

  it('should recognise two pairs', () => {
    const holeCards: Card[] = [
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
    ];
    const communityCards: Card[] = [
      {rank: 'A', suit: Suit.DIAMONDS},
      {rank: 'J', suit: Suit.CLUBS},
      {rank: '8', suit: Suit.HEARTS},
      {rank: '7', suit: Suit.CLUBS},
      {rank: '2', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.TWO_PAIRS);
  });

  it('should recognise three of a kind', () => {
    const holeCards: Card[] = [
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
    ];
    const communityCards: Card[] = [
      {rank: 'A', suit: Suit.DIAMONDS},
      {rank: 'J', suit: Suit.CLUBS},
      {rank: '8', suit: Suit.HEARTS},
      {rank: '7', suit: Suit.CLUBS},
      {rank: 'A', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.THREE_OF_A_KIND);
  });

  it('should recognise three of a kind', () => {
    const holeCards: Card[] = [
      { rank: '2', suit: Suit.DIAMONDS },
      { rank: 'A', suit: Suit.CLUBS },
    ];
    const communityCards: Card[] = [
      {rank: 'A', suit: Suit.DIAMONDS},
      {rank: 'J', suit: Suit.CLUBS},
      {rank: '8', suit: Suit.HEARTS},
      {rank: '7', suit: Suit.CLUBS},
      {rank: 'A', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.THREE_OF_A_KIND);
  });

  it('should recognise a straight A-5', () => {
    const holeCards: Card[] = [
      { rank: 'A', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
    ];
    const communityCards: Card[] = [
      {rank: '3', suit: Suit.DIAMONDS},
      {rank: 'J', suit: Suit.CLUBS},
      {rank: '5', suit: Suit.HEARTS},
      {rank: '4', suit: Suit.CLUBS},
      {rank: 'A', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.STRAIGHT);
  });

  it('should recognise a straight 7-J', () => {
    const holeCards: Card[] = [
      { rank: 'J', suit: Suit.CLUBS },
      { rank: '2', suit: Suit.DIAMONDS },
    ];
    const communityCards: Card[] = [
      {rank: '7', suit: Suit.DIAMONDS},
      {rank: '10', suit: Suit.CLUBS},
      {rank: '5', suit: Suit.HEARTS},
      {rank: '9', suit: Suit.CLUBS},
      {rank: '8', suit: Suit.HEARTS},
    ];

    expect(evaluateHand(holeCards, communityCards)).toEqual(HandStrength.STRAIGHT);
  });
});
