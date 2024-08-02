export class UpdateCmd {
  constructor(...params) {
    this.params = params;
  }

  execute() {
    const [text] = this.params;
  }
}
