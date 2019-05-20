'use babel';

import { Workspace } from './WorkspaceState';
import { TextEditor, CompositeDisposable, Disposable, Range, Point } from 'atom';

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
    this.disposables = new CompositeDisposable();
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-project-workspace');

    // Create container element
    const container = document.createElement('div');
    container.classList.add('container');
    this.element.appendChild(container);

    // @miniEditor = new TextEditor({mini: true})
    // blurHandler = =>
    //   @close() if document.hasFocus()
    // @miniEditor.element.addEventListener('blur', blurHandler)
    // @disposables.add(new Disposable(=> @miniEditor.element.removeEventListener('blur', blurHandler)))
    // @disposables.add(@miniEditor.onDidChange => @showError())
    // @element.appendChild(@miniEditor.element)
    this.mini = new TextEditor({ mini: true });
    this.mini.element.classList.add('input');

    const event = 'keydown';
    const handler = (e) => {
      this.mini.element.classList.remove('clean');

      if (e.keyCode === 13) {
        this.submit();
      } else if (e.keyCode === 27) {
        this.modal.hide();
      }

      console.log();
    };
    this.mini.element.addEventListener(event, handler);
    this.disposables.add(new Disposable(() => {
      this.mini.element.removeEventListener(event, handler);
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

  show() {
    const prompt = 'Enter Workspace Name';

    this.mini.element.classList.add('clean');
    this.mini.element.focus();
    this.mini.setText(prompt);
    this.mini.setSelectedBufferRange(Range(Point(0, 0), Point(0, prompt.length)));
  }


  submit() {
    const name = this.mini.getText();
    const stateObj = Workspace.create(name);

    // TODO: Save state to file/db
    console.log(stateObj.toString());

    this.modal.hide();
  }

  setModal(modal) {
    this.modal = modal;
  }
}
