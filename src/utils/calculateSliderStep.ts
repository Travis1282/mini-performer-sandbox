class Log {
  minPos: number;
  maxPos: number;
  minVal: number;
  maxVal: number;
  scale: number;

  constructor(opts: { minPos: number; maxPos: number; minVal: number; maxVal: number }) {
    this.minPos = opts.minPos || 0;
    this.maxPos = opts.maxPos || 100;

    this.minVal = Math.log(opts.minVal || 1);
    this.maxVal = Math.log(opts.maxVal || 9000);

    this.scale = (this.maxVal - this.minVal) / (this.maxPos - this.minPos);
  }

  value(position: number) {
    return Math.exp((position - this.minPos) * this.scale + this.minVal);
  }

  position(value: number) {
    return this.minPos + (Math.log(value) - this.minVal) / this.scale;
  }
}

export default Log;
