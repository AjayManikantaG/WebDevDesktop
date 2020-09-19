export class Point {
    constructor(private x: number, private y: number) {
      this.x = x,
      this.y = y;
    }
  
    public draw() {
      console.log(this.x, this.y)
    }

  }