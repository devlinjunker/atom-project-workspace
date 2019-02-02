'use babel';

export default class WorkspaceState {
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  toString() {
    return JSON.stringify(this);
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
