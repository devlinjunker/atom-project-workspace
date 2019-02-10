'use babel'
import { assert, expect, describe, it } from 'jasmine';
import WorkspaceState from "lib/WorkspaceState.js";

describe('WorkspaceState', () => {
  describe('<Instance>', () => {
    const state = { 'init': 'state' };
    const directories = ['./'];
    let workspace;
    beforeAll(() => {
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
        new WorkspaceState({ state, directories });
      });

      it('should create state with name', () => {
        const name = 'name';
        new WorkspaceState({ state, name });
      });

      it('should create state with directories and name', () => {
        const name = 'dirName';
        new WorkspaceState({ state, directories, name });

      });
    });

    it('should set State Name', () => {
      const name = 'test';
      workspace.setName(name);

      expect(workspace.getName()).to.equal(name)
    });

    it('should get State', () => {
      expect(workspace.getState()).to.equal(state);
    });

    it('should get Directories', () => {
      expect(workspace.getDir()).to.equal(directories);
    });

    it('should stringify', () => {
      const name = 'stringify';
      workspace.setName(name)

      const expected = {
        name,
        state,
        directories
      }
      const json = workspace.toString();
    });
  });
});
