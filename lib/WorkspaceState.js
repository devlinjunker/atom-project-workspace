/**
 * @description Workspace State Object class for storing the state
 */
'use babel';

/**
 * Workspace State Class
 * @type {WorkspaceState}
 */
class WorkspaceState {

  /**
   * Create WorkspaceState Object
   * @param {{ state, directories, name }}
   *   name of the state for display and identification by user
   *   state -  State Object? TODO
   *   directories - array list of directory paths
   */
  constructor({ state, directories = [], name = '' }) {
    if (!state) {
      throw new Error('NO_STATE');
    }
    this.state = state;

    this.name = name;
    this.directories = directories;
  }

  /**
   * Returns the state
   * @return {Object} state object
   */
  getState() {
    return this.state;
  }

  /**
   * Returns the array of directory paths
   * @return {[String]} Array of directory paths open
   */
  getDir() {
    return this.directories;
  }

  /**
   * Returns the name of the WorkspaceState object
   * @return {String} Name of the WorkspaceState saved
   */
  getName() {
    return this.name;
  }

  /**
   * Sets the name of the WorkspaceState object
   * @param {String} name name to set
   * @return {void}
   */
  setName(name) {
    this.name = name;
  }

  /**
   * Stringifies the Object so we can view its properties
   * @return {String} Stringified WorkspaceState object
   */
  toString() {
    return JSON.stringify({
      state: this.state,
      name: this.name,
      dir: this.directories
    });
  }
}

export default WorkspaceState;

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
