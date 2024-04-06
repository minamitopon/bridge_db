export class handModel {
  hand: any;

  constructor(v) {
    this.hand = v;
  }

  get uuid() {
    return this.hand.uuid;
  }
}
