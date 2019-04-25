'use babel'
import WorkspaceState from "../lib/WorkspaceState.js";

describe('WorkspaceState', () => {

  describe('<Instance>', () => {
    const state = { 'init': 'state' };
    const directories = ['./'];
    let workspace;
    beforeEach(() => {
      workspace = new WorkspaceState({ state, directories });
    });

    describe('construct', () => {
      it('should require state to be passed', () => {
        try {
            new WorkspaceState()
            assert.fail('Workspace created without state');
        } catch (e) {window
            new WorkspaceState({ state });
        }
      });

      it('should create create state with directories', () => {
        const ws = new WorkspaceState({ state, directories });
        expect(ws.getDir()).toEqual(directories);
      });

      it('should create state with name', () => {
        const name = 'name';
        const ws = new WorkspaceState({ state, name });
        expect(ws.getName()).toEqual(name);
      });

      it('should create state with directories and name', () => {
        const name = 'dirName';
        const ws = new WorkspaceState({ state, directories, name });
        expect(ws.getName()).toEqual(name);
        expect(ws.getDir()).toEqual(directories);
      });
    });

    it('should set State Name', () => {
      const name = 'test';
      workspace.setName(name);

      expect(workspace.getName()).toEqual(name)
    });

    it('should get State', () => {
      expect(workspace.getState()).toEqual(state);
    });

    it('should get Directories', () => {
      expect(workspace.getDir()).toEqual(directories);
    });

    it('should stringify', () => {
      const name = 'stringify';
      workspace.setName(name)

      const expected = {
        name,
        state,
        dir: directories
      }
      const json = workspace.toString();
      expect(json).toMatch(expected);
    });
  });
});
