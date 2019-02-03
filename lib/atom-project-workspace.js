'use babel';

import AtomProjectWorkspaceView from './atom-project-workspace-view';
import { CompositeDisposable } from 'atom';
import WorkspaceState from './WorkspaceState'

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
      'atom-project-workspace:saveState': () => this.saveState()
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

  // Package Actions

  saveState() {
    let name = 'test';

    const state = atom.workspace.serialize();
    const container = state.paneContainers.center;
    if (container.deserializer !== "PaneContainer") {
        return "Unrecognized Serialization";
    }

    const stateObj = new WorkspaceState(name, container.root);

    console.log(stateObj);

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
