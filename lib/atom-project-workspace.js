'use babel';

import AtomProjectWorkspaceView from './atom-project-workspace-view';
import { CompositeDisposable } from 'atom';

export default {

  view: null,
  modalPanel: null,
  subscriptions: null,

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
      'atom-project-workspace:saveState': () => this.saveState()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  serialize() {
    return {
      atomProjectWorkspaceViewState: this.view.serialize()
    };
  },

  // Package Actions

  saveState() {
    this.modalPanel.show();
    this.view.show();
  },

  toggle() {
    console.log('AtomProjectWorkspace was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
