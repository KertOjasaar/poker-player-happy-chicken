import {Card} from './interfaces';
import preflopDecision from './preflopDecision';

export enum HandStrength {
    HIGH_CARD = 0,
    PAIR = 1,
    TWO_PAIRS = 2,
    THREE_OF_A_KIND = 3,
    STRAIGHT = 4,
    FLUSH = 5,
    FULL_HOUSE = 6,
    FOUR_OR_A_KIND = 7,
    STRAIGHT_FLUSH = 8,
    ROYAL_FLUSH = 9,
}

export default function evaluateHand(holeCards: Card[] = [], communityCards: Card[] = []): number {

    if (communityCards?.length == 0 && holeCards?.length == 2) {
        const first = holeCards[0].rank;
        const second = holeCards[1].rank;

        // @ts-ignore
        return preflopDecision[`${first}${second}`];
    }

    // const allCardRanks = [...holeCards, ...communityCards].map(c => c.rank);
    // let result2: RankCount[] = [];
    //
    // allCardRanks.forEach(rank => {
    //     if (!result2.find((r => r.rank === rank))) {
    //         result2.push({rank, count: allCardRanks.filter(r => r == rank).length});
    //     }
    // })
    //
    // let handStrength: any = getHandStrength(result2);
    // return handStrength;
    return 100;
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
