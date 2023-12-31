export interface GameState {
  tournament_id: string;
  game_id: string;
  round: number;
  bet_index: number;
  small_blind: number;
  current_buy_in: number;
  pot: number;
  minimum_raise: number;
  dealer: number;
  orbits: number;
  in_action: number;
  players: PlayerI[];
  community_cards?: Card[];
}

export interface PlayerI {
  id: number;
  name: string;
  status: string;
  version: string;
  stack: number;
  bet: number;
  hole_cards?: Card[];
}

export interface Card {
  rank: string;
  suit: Suit;
}

export enum Suit {
  DIAMONDS = 'diamonds',
  HEARTS = 'hearts',
  SPADES = 'spades',
  CLUBS = 'clubs',
}

