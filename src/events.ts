class CLIEvents {
  private static eventsCallbacks: Record<string, Function[]> = {};

  public static on(eventName: string, callback: Function): void {
    let event = this.eventsCallbacks[eventName];
    if (event) {
      event.push(callback);
    } else {
      this.eventsCallbacks[eventName] = [callback];
    }
  }

  public static off(eventName: string, callback: Function): void {
    const event = this.eventsCallbacks[eventName];
    if (event) {
      const callbackIdx = event.findIndex((cb) => cb === callback);
      this.eventsCallbacks[eventName].splice(callbackIdx, 1);
    }
  }

  public static emit(eventName: string): void {
    const eventCallbacks = this.eventsCallbacks[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach((cb) => cb());
    } else throw new Error("Event not registered");
  }
}

export default CLIEvents;
