'use babel';

export default class WorkspaceState {
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  toString() {
    return JSON.stringify(this);
  }
}

class Pane {
  constructor(editors, width, height) {
    this.editors = editors;
    this.width = width;
    this.height = height
  }
}

class Panel {
  constructor(orientation, panes) {
    this.orientation = orientation;
    this.panes = panes;
  }
}

/**
 * Creates a workspace state from the atom deserialized state
 *
 * @param  {string} name [description]
 * @param  {deserialized container root} root [description]
 * @param  {editorMap} map  [description]
 * @return {WorkspaceState}      [description]
 */
WorkspaceState.create = function(name, root, map) {
  const state = buildState(root, map);
  return new WorkspaceState(name, state);
}

/**
 * Private Recursive Function that builds the state objects
 * @param  {[type]} root [description]
 * @param  {[type]} map  [description]
 * @return {[type]}      [description]
 */
function buildState(root, map) {
  if (root.deserializer === 'Pane') {
    let w = h = 0;
    let editors = [];
    for (i in root.items) {
      const editor = root.items[i];

      const info = map[editor.id];
      editors.push(info.getPath());
      if (info.getWidth() != 0) {
        w = info.getWidth();
      }
      if (info.getHeight() != 0) {
        h = info.getHeight();
      }
    }
    return new Pane(editors, w, h);
  } else if (root.deserializer === 'PaneAxis') {
    let objects = [];
    for(let i = 0; i < root.children.length; i++){
      objects.push(buildState(root.children[i], map));
    }

    return new Panel(root.orientation, objects)
  }
}
