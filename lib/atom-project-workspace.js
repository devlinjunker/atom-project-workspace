/**
 * @description Atom Project Workspace Plugin Object
 */
'use babel';

import AtomProjectWorkspaceView from './atom-project-workspace-view';
import { CompositeDisposable } from 'atom';
import { WorkspaceState } from './WorkspaceState';

/**
 * An object containing the necessary methods for creating an atom package
 * @type {Object}
 */
export default {

  view: null,
  modalPanel: null,
  subscriptions: null,

  /**
   * activate method for initalizing the plugin when atom starts
   * @param  {any} state state object passed from atom
   * @return {void}
   */
  activate(state) {
    this.view = new AtomProjectWorkspaceView(state.atomProjectWorkspaceViewState);

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.view.getElement(),
      visible: false
    });
    this.view.setModal(this.modalPanel);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-project-workspace:saveState': () => {return this.saveState();}
    }));
  },

  /**
   * deactivate method called by atom when destroying plugin (disabling?)
   * @return {void}
   */
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  /**
   * serealize method for creating the saved state during destruction (passed back to activate later)
   * @return {{ atomProjectWorkspaceViewState }} object containing view state
   */
  serialize() {
    return {
      atomProjectWorkspaceViewState: this.view.serialize()
    };
  },

  /** Package Actions **/

  /**
   * Save the Project Workspace State (to disk?)
   * @return {void}
   */
  saveState() {
    const name = 'test';

    const state = atom.workspace.serialize();
    const container = state.paneContainers.center;
    if (container.deserializer !== 'PaneContainer') {
      return 'Unrecognized Serialization';
    }

    const stateObj = new WorkspaceState({ name, state: container.root });

    // TODO:
    // eslint-disable-next-line no-console
    console.log(stateObj);
  },

  /**
   * Toggle the visibility of the Plugin View
   * @return {void}
   */
  toggle() {
    // TODO:
    // eslint-disable-next-line no-console
    console.log('AtomProjectWorkspace was toggled!');
    return (
      this.modalPanel.isVisible() ?
        this.modalPanel.hide() :
        this.modalPanel.show()
    );
  }

};
