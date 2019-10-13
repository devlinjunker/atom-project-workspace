'use babel';

import AtomProjectWorkspaceSaveView from './atom-project-workspace-view';
import { CompositeDisposable } from 'atom';
import { WorkspaceState } from './WorkspaceState';

/**
 * An object containing the necessary methods for creating an atom package
 * @type {Object}
 */
export default {

  saveView: null,
  saveModal: null,
  subscriptions: null,

  /**
   * activate method for initalizing the plugin when atom starts
   * @param  {any} state state object passed from atom
   * @return {void}
   */
  activate(state) {
    this.saveView = new AtomProjectWorkspaceSaveView(state.atomProjectWorkspaceViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.saveModal = atom.workspace.addModalPanel({
      item: this.saveView.getElement(),
      visible: false
    });
    this.saveView.setModal(this.saveModal);

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-project-workspace:startSave': () => { return this.toggle(); }
    }));
  },

  /**
   * deactivate method called by atom when destroying plugin (disabling?)
   * @return {void}
   */
  deactivate() {
    this.saveModal.destroy();
    this.subscriptions.dispose();
    this.saveView.destroy();
  },

  /**
   * serealize method for creating the saved state during destruction (passed back to activate later)
   * @return {{ atomProjectWorkspaceViewState }} object containing view state
   */
  serialize() {
    return {
    };
  },

  /** Package Actions **/

  /**
   * Toggle the visibility of the Plugin View
   * @return {void}
   */
  toggle() {
    if (this.saveModal.isVisible()) {
      this.saveModal.hide();
    } else {
      this.saveModal.show();
      this.saveView.show();
    }
  }

};
