/**
 * @description Workspace State Object class for storing the state
 */
'use babel';

/**
 * Workspace State Class
 * @type {WorkspaceState}
 */
export default class WorkspaceState {
  /**
   * [constructor description]
   * @param {[type]} name  [description]
   * @param {[type]} state [description]
   */
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  /**
   * [toString description]
   * @return {[type]} [description]
   */
  toString() {
    return JSON.stringify(this);
  }
}

// TODO: these aren't ever used?
/* eslint-disable no-unused-vars */
/**
 * [Pane description]
 */
class Pane {
  /**
   * [constructor description]
   * @param {[type]} editors [description]
   * @param {[type]} width   [description]
   * @param {[type]} height  [description]
   */
  constructor(editors, width, height) {
    this.editors = editors;
    this.width = width;
    this.height = height;
  }
}

/**
 * [Panel description]
 */
class Panel {
  /**
   * [constructor description]
   * @param {[type]} orientation [description]
   * @param {[type]} panes       [description]
   */
  constructor(orientation, panes) {
    this.orientation = orientation;
    this.panes = panes;
  }
}
/* eslint-enable */
