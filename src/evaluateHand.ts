import {Card, GameState, Suit} from './interfaces';
import preflopDecision from './preflopDecision';

const TEAM_NAME = 'Happy Chicken';

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

export function evaluateHand(holeCards: Card[] = [], communityCards: Card[] = []): number {

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
        ["6", "7", "8", "9", "T"],
        ["7", "8", "9", "T", "J"],
        ["8", "9", "T", "J", "Q"],
        ["9", "T", "J", "Q", "K"],
        ["T", "J", "Q", "K", "A"]
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

export function evalPreFlop(gameState: GameState, holeCards: Card[]) {
    const first = holeCards[0].rank;
    const second = holeCards[1].rank;

    // @ts-ignore
    return preflopDecision[`${first}${second}`] || 0;
}

export function evalGoodCards(gameState: GameState, betCallBack: (bet: number) => void, handStrength: number, isPreFlop: boolean): number {
    const us = gameState.players.find((player) => player.name === TEAM_NAME);
    const currentBet = gameState.current_buy_in - gameState.players[gameState.in_action].bet;
    console.log('evalGoodCards', {
        isPreFlop,
        holeCards: us?.hole_cards?.map((card: Card) => `${card.rank}${card.suit}`),
        communityCards: gameState.community_cards?.map((card: Card) => `${card.rank}${card.suit}`),
        currentBet,
        handStrength,
    });

    if (isPreFlop) {
        if (handStrength === 100) {
            if (currentBet > 150) {
                return currentBet;
            } else {
                console.log('minRaise', {currentBet: currentBet, minraise: gameState.minimum_raise});
                return currentBet + (gameState.minimum_raise * 3);
            }
        } else if (
            (handStrength === 80 && currentBet < 101)
            || (handStrength > 0 && handStrength < 80 && currentBet < 51)
        ) {
            return currentBet;
        } else {
            return 0;
        }
    } else {
        if (handStrength === 100) {
            // min raise
            return Math.max(gameState.pot, currentBet + (gameState.minimum_raise * 5));
        } else if (handStrength > 0 && currentBet < 101) {
            return currentBet;
        }
        return 0;
    }
}
