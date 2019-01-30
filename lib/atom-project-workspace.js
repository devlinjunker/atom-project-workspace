'use babel';

import AtomProjectWorkspaceView from './atom-project-workspace-view';
import { CompositeDisposable } from 'atom';

export default {

  atomProjectWorkspaceView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomProjectWorkspaceView = new AtomProjectWorkspaceView(state.atomProjectWorkspaceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomProjectWorkspaceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-project-workspace:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomProjectWorkspaceView.destroy();
  },

  serialize() {
    return {
      atomProjectWorkspaceViewState: this.atomProjectWorkspaceView.serialize()
    };
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
