export class Executor {
  constructor(command) {
    this.command = command;
  }
  setCommand(command) {
    this.command = command;
  }
  executeCommand() {
    this.command?.execute();
  }
}
