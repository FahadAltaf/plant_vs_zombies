export class GameLoop {
  private lastTime: number = 0;
  private running: boolean = false;
  private frameId: number = 0;
  private readonly updateCallback: (deltaTime: number) => void;

  constructor(updateCallback: (deltaTime: number) => void) {
    this.updateCallback = updateCallback;
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.lastTime = performance.now();
      this.tick();
    }
  }

  stop(): void {
    this.running = false;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private tick = (): void => {
    if (!this.running) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Cap deltaTime to prevent large jumps
    const cappedDeltaTime = Math.min(deltaTime, 33); // Cap at ~30 FPS minimum

    this.updateCallback(cappedDeltaTime);
    this.frameId = requestAnimationFrame(this.tick);
  };
}