import {Suit} from '../interfaces';
import evaluateHand from '../evaluateHand';
import preflopDecision from '../preflopDecision';

describe('Pre-flop', () => {
  it('AA is 100', () => {
    const holeCards = [
      {rank: 'A', suit: Suit.CLUBS},
      {rank: 'A', suit: Suit.DIAMONDS},
    ];

    expect(evaluateHand(holeCards)).toEqual(preflopDecision.AA);
  });

  it('K9 is 80', () => {
    const holeCards = [
      {rank: 'K', suit: Suit.CLUBS},
      {rank: '9', suit: Suit.DIAMONDS},
    ];

    expect(evaluateHand(holeCards)).toEqual(preflopDecision.K9);
  });

  it('AK is 100', () => {
    const holeCards = [
      {rank: 'A', suit: Suit.CLUBS},
      {rank: 'K', suit: Suit.DIAMONDS},
    ];

    expect(evaluateHand(holeCards)).toEqual(preflopDecision.AK);
  });

  it('KA is 100', () => {
    const holeCards = [
      {rank: 'K', suit: Suit.CLUBS},
      {rank: 'A', suit: Suit.DIAMONDS},
    ];

    expect(evaluateHand(holeCards)).toEqual(preflopDecision.AK);
  });
});
