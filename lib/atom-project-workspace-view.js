/**
 * @description ProjectWorkspace View Class for displaying the workspaces
 */
'use babel';

/**
 * Class for displaying workspaces
 * @type {AtomProjectWorkspaceView}
 */
export default class AtomProjectWorkspaceView {

  /**
   * ProjectWorkspace View Constructor
   * @param {[type]} serializedState not used, but can be to reinstate the view
   */
  constructor() {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-project-workspace');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The AtomProjectWorkspace package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  /**
   *  Returns an object that can be retrieved when package is activated
   * @return {Object}
   */
  // TODO: serialize() {}

  /**
   *  Tear down any state and detach
   * @return {void}
   */
  destroy() {
    this.element.remove();
  }

  /**
   * gets the element containing the view components
   * @return {void}
   */
  getElement() {
    return this.element;
  }

}
