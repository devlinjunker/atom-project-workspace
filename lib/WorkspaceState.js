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
   * Create WorkspaceState Object
   * @param {String} name  name of the state for display and identification by user
   * @param {Object} state State Object? TODO
   */
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  /**
   * Stringifies the Object so we can view its properties
   * @return {String} Stringified WorkspaceState object
   */
  toString() {
    return JSON.stringify(this);
  }
}

// TODO: these aren't ever used?
/* eslint-disable no-unused-vars */
/**
 * Pane class containing a tab list of editors, defined by the width and height and editors
 * that are open in the pane
 */
class Pane {
  /**
   * Create Pane Object
   * @param {[String]} editors Array list of paths that editors are open to
   * @param {int} width   width of the Pane (in px?)
   * @param {int} height  height of the Pane (in px?)
   */
  constructor(editors, width, height) {
    this.editors = editors;
    this.width = width;
    this.height = height;
  }
}

/**
 * Panel Class, contains a list of panes and the orientation
 */
class Panel {
  /**
   * Create Panel Object
   * @param {string} orientation orientation (vertical vs horizontal?)
   * @param {[Pane]} panes       Array of Pane objects
   */
  constructor(orientation, panes) {
    this.orientation = orientation;
    this.panes = panes;
  }
}
/* eslint-enable */
