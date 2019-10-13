'use babel';

import { Workspace } from './WorkspaceState';
import { TextEditor, CompositeDisposable, Disposable, Range, Point } from 'atom';
const fs = require('fs');

/**
 * Class for displaying workspaces
 * @type {AtomProjectWorkspaceView}
 */
export default class AtomProjectWorkspaceSaveView {
  /**
   * ProjectWorkspace View Constructor
   * @param {[type]} serializedState not used, but can be to reinstate the view
   */
  constructor() {
    this.disposables = new CompositeDisposable();
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-project-workspace');

    // Create container element
    const container = document.createElement('div');
    container.classList.add('container');
    this.element.appendChild(container);

    this.mini = new TextEditor({ mini: true });
    this.mini.element.classList.add('input');

    const handler = (e) => {
      this.mini.element.classList.remove('clean');

      if (e.keyCode === 13) {
        this.submit();
      } else if (e.keyCode === 27) {
        this.modal.hide();
      }

      console.log();
    };
    this.mini.element.addEventListener('keydown', handler);
    this.disposables.add(new Disposable(() => {
      this.mini.element.removeEventListener('keydown', handler);
    }));

    // TODO: On open, focus on input
    // TODO: On lose focus hide modal

    container.appendChild(this.mini.element);

    // Create Button
    const button = document.createElement('span');
    button.classList.add('saveBtn');
    container.appendChild(button);
    button.textContent = 'Save';

    // Wire button to submit function
    button.onclick = this.submit.bind(this);
  }

  /**
   *  Tear down any state and detach
   * @return {void}
   */
  destroy() {
    this.element.remove();
    this.disposables.dispose();
    this.mini.destroy();

    const activePane = atom.workspace.getCenter().getActivePane();
    if (!activePane && !activePane.isDestroyed()) {
      activePane.activate();
    }
  }

  /**
   * gets the element containing the view components
   * @return {void}
   */
  getElement() {
    return this.element;
  }

  /**
   * Shows the package modal view
   * @return {void}
   */
  show() {
    const prompt = 'Enter Workspace Name';

    this.mini.element.classList.add('clean');
    this.mini.setText(prompt);
    this.mini.element.focus();
    this.mini.setSelectedBufferRange(Range(Point(0, 0), Point(0, prompt.length)));
  }

  /**
   * Get name from the input and pass to Workspace.create then save the state to disk and hide the modal
   * @return {void}
   */
  submit() {
    const name = this.mini.getText();
    const state_obj = Workspace.create(name);

    // TODO: Save state to file/db
    console.log(state_obj.toString());

    const path_name = name.replace(' ', '-');
    const project_directory = atom.project.getPaths()[0];
    if (!fs.existsSync(`${project_directory}/.workspace/`)) {
      fs.mkdirSync(`${project_directory}/.workspace/`);
    }
    fs.writeFile(`${project_directory}/.workspace/${path_name}`, state_obj.toString(), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    this.modal.hide();
  }

  /**
   * Sets the modal (used by package setup)
   * @param {Modal} modal modal to use for the atom package
   * @return {void}
   */
  setModal(modal) {
    this.modal = modal;
  }
}
