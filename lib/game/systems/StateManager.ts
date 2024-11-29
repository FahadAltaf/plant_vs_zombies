import { GameState } from '@/lib/types/game';
import { BehaviorSubject } from 'rxjs';

export class StateManager {
  private state: BehaviorSubject<GameState>;

  constructor(initialState: GameState) {
    this.state = new BehaviorSubject<GameState>(initialState);
  }

  getState(): GameState {
    return this.state.value;
  }

  updateState(updater: (state: GameState) => GameState): void {
    const currentState = this.state.value;
    const newState = updater(currentState);
    this.state.next(newState);
  }

  subscribe(callback: (state: GameState) => void): () => void {
    const subscription = this.state.subscribe(callback);
    return () => subscription.unsubscribe();
  }
}