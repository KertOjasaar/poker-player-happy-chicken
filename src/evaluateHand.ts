import {Card} from './interfaces';
import preflopDecision from './preflopDecision';

export enum HandStrength {
    HIGH_CARD = 0,
    PAIR = 50,
    TWO_PAIRS = 100,
    THREE_OF_A_KIND = 100,
    STRAIGHT = 100,
    FLUSH = 100,
    FULL_HOUSE = 100,
    FOUR_OR_A_KIND = 100,
    STRAIGHT_FLUSH = 100,
    ROYAL_FLUSH = 100,
}

export default function evaluateHand(holeCards: Card[] = [], communityCards: Card[] = []): number {

    const allCardRanks = [...holeCards, ...communityCards].map(c => c.rank);
    let result2: RankCount[] = [];

    allCardRanks.forEach(rank => {
        if (!result2.find((r => r.rank === rank))) {
            result2.push({rank, count: allCardRanks.filter(r => r == rank).length});
        }
    })

    let handStrength: any = getHandStrength(result2);
    return handStrength;
}

function getHandStrength(rankCount: RankCount[]): HandStrength {
    function countExistsInRankCount(number: number) {
        return rankCount.filter(x => x.count == number).length > 0;
    }

    if (countExistsInRankCount(4)) {
        return HandStrength.FOUR_OR_A_KIND;
    }
    if (countExistsInRankCount(3) && countExistsInRankCount(2)) {
        return HandStrength.FULL_HOUSE;
    }
    if (countExistsInRankCount(3)) {
        return HandStrength.THREE_OF_A_KIND;
    }
    if (rankCount.filter(x => x.count == 2).length >= 2) {
        return HandStrength.TWO_PAIRS;
    }
    if (countExistsInRankCount(2)) {
        return HandStrength.PAIR;
    }
    return HandStrength.HIGH_CARD;
}

interface RankCount {
    rank: string;
    count: number;
}
