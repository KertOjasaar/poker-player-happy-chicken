import {CommunityCard, HoleCard} from './interfaces';

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

export default function evaluateHand(holeCards?: HoleCard[], communityCards?: CommunityCard[]): number {

    if (communityCards?.length == 0 && holeCards?.length == 2) {
        var first = holeCards[0];
        var second = holeCards[1];

        if (first.rank == second.rank)
            return HandStrength.PAIR;
    }


    return 0;
}
