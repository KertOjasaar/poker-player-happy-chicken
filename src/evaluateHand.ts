import {Card} from './interfaces';

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

const HolecardStrength = {
    //first row
    'AA': 100,
    'AK': 100,
    'AQ': 100,
    'AJ': 100,
    'AT': 100,
    'A9': 100,
    'A8': 100,
    'A7': 100,
    'A6': 100,
    'A5': 100,
    'A4': 100,
    'A3': 100,
    'A2': 100,

    //second row
    'KA': 100,
    'KK': 100,
    'KQ': 100,
    'KJ': 100,
    'KT': 100,
    'K9': 80,
    'K8': 80,
    'K7': 60,
    'K6': 60,
    'K5': 60,
    'K4': 40,
    'K3': 40,
    'K2': 40,

    //third row
    'QA': 100,
    'QK': 100,
    'QQ': 100,
    'QJ': 100,
    'QT': 100,
    'Q9': 80,
    'Q8': 60,
    'Q7': 40,
    'Q6': 40,
    'Q5': 40,
    'Q4': 20,
    'Q3': 20,
    'Q2': 20,

    //fourth row
    'JA': 100,
    'JK': 80,
    'JQ': 80,
    'JJ': 100,
    'JT': 100,
    'J9': 80,
    'J8': 60,
    'J7': 40,
    'J6': 20,
    'J5': 20,
    'J4': 20,
    'J3': 20,
    'J2': 20,

    //fifth row
    'TA': 100,
    'TK': 60,
    'TQ': 60,
    'TJ': 60,
    'TT': 100,
    'T9': 100,
    'T8': 60,
    'T7': 40,
    'T6': 40,
    'T5': 20,
    'T4': 20,
    'T3': 20,
    'T2': 20,

    //sixth row
    '9A': 40,
    '9K': 40,
    '9Q': 40,
    '9J': 40,
    '9T': 40,
    '99': 100,
    '98': 80,
    '97': 60,
    '96': 40,
    '95': 20,
    '94': 20,
    //
    //

    //seventh row
    '8A': 40,
    '8K': 20,
    '8Q': 20,
    '8J': 20,
    '8T': 20,
    '89': 40,
    '88': 100,
    '87': 80,
    '86': 60,
    '85': 40,
    '84': 20,
    //
    //

    //eight row
    '7A': 40,
    '7K': 20,
    '7Q': 20,
    '7J': 20,
    '7T': 20,
    '79': 20,
    '78': 20,
    '77': 100,
    '76': 80,
    '75': 60,
    '74': 20,
    '73': 20,
    //

    //ninth row
    '6A': 40,
    '6K': 20,
    //
    //
    //
    //
    '68': 20,
    '67': 20,
    '66': 100,
    '65': 100,
    '64': 40,
    '63': 20,
    //

    //tenth row
    '5A': 40,
    '5K': 20,
    //
    //
    //
    //
    //
    '57': 20,
    '56': 20,
    '55': 100,
    '54': 80,
    '53': 40,
    '52': 20,

    //eleventh row
    '4A': 40,
    //
    //
    //
    //
    //
    //
    //
    '46': 20,
    '45': 20,
    '44': 80,
    '43': 40,
    '42': 20,

    //twelvth row
    '3A': 20,
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    '33': 60,
    '32': 20,

    //thirteenth row
    '2A': 20,
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    '22': 60,
}

export default function evaluateHand(holeCards?: Card[], communityCards?: Card[]): number {

    if (communityCards?.length == 0 && holeCards?.length == 2) {
        const first = holeCards[0];
        const second = holeCards[1];

        if (first.rank == second.rank)
            return HandStrength.PAIR;
        else
            return HandStrength.HIGH_CARD;
    }


    return 0;
}
