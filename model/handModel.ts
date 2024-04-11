import { Hand } from "../types/front/hand";

export class HandModel {
  hand: Hand;

  constructor(v) {
    this.hand = v;
  }

  get uuid() {
    return this.hand.uuid;
  }

  get boardNum() {
    return;
  }

  get allHand() {
    return {
      north: this.north,
      east: this.east,
      south: this.south,
      west: this.west,
    };
  }

  get north() {
    return {
      spade: this.hand.north_spade,
      heart: this.hand.north_heart,
      diamond: this.hand.north_diamond,
      club: this.hand.north_club,
    };
  }

  get south() {
    return {
      spade: this.hand.south_spade,
      heart: this.hand.south_heart,
      diamond: this.hand.south_diamond,
      club: this.hand.south_club,
    };
  }

  get east() {
    return {
      spade: this.hand.east_spade,
      heart: this.hand.east_heart,
      diamond: this.hand.east_diamond,
      club: this.hand.east_club,
    };
  }

  get west() {
    return {
      spade: this.hand.west_spade,
      heart: this.hand.west_heart,
      diamond: this.hand.west_diamond,
      club: this.hand.west_club,
    };
  }
}
