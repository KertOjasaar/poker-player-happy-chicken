import {Card, Suit} from './interfaces';
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
    const allCardSuites: Suit[] = [...holeCards, ...communityCards].map(c => c.suit);
    let result2: RankCount[] = [];

    allCardRanks.forEach(rank => {
        if (!result2.find((r => r.rank === rank))) {
            result2.push({rank, count: allCardRanks.filter(r => r == rank).length});
        }
    })

    let handStrengthFromCounts: any = getHandStrength(result2);
    let straightStrength: any = getStraightHandStrength(allCardRanks);
    if (straightStrength > handStrengthFromCounts)
        return straightStrength;

    if (isFlush(allCardSuites)) {
        return HandStrength.FLUSH;
    }

    return handStrengthFromCounts;
}

function isFlush(allCardSuites: string[]): boolean {
    const suites = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
    return suites.some(s => allCardSuites.filter(x => x === s).length >= 5);
}

function getStraightHandStrength(allCardRanks: string[]) {

    let needles: string[][] = [
        ["A", "2", "3", "4", "5"],
        ["2", "3", "4", "5", "6"],
        ["3", "4", "5", "6", "7"],
        ["4", "5", "6", "7", "8"],
        ["5", "6", "7", "8", "9"],
        ["6", "7", "8", "9", "10"],
        ["7", "8", "9", "10", "J"],
        ["8", "9", "10", "J", "Q"],
        ["9", "10", "J", "Q", "K"],
        ["10", "J", "Q", "K", "A"]
    ];


    let result = HandStrength.HIGH_CARD;
    needles.forEach(needle => {
        if (containsAll(needle, allCardRanks))
            result = HandStrength.STRAIGHT;
    });

    return result;
}

function containsAll(needles: string[], haystack: string[]): boolean {
    return needles.every(value => {
        return haystack.includes(value);
    });
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
