'use babel';

export default class WorkspaceState {
  constructor({ state, directories = [], name = ''}) {
    if (!state) {
      throw new Error('NO_STATE');
    }
    this.state = state;

    this.name = name;
    this.directories = directories;
  }

  getState() {
    return this.state;
  }

  getDir() {
    return this.directories;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  toString() {
    return JSON.stringify({
      state: this.state,
      name: this.name,
      dir: this.directories
    });
  }
}

class Pane {
  constructor(editors, width, height) {
    this.editors = editors;
    this.width = width;
    this.height = height
  }
}

class Panel {
  constructor(orientation, panes) {
    this.orientation = orientation;
    this.panes = panes;
  }
}
