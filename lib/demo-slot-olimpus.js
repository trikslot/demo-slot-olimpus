'use babel';

import DemoSlotOlimpusView from './demo-slot-olimpus-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotOlimpusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotOlimpusView = new DemoSlotOlimpusView(state.demoSlotOlimpusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotOlimpusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-olimpus:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotOlimpusView.destroy();
  },

  serialize() {
    return {
      demoSlotOlimpusViewState: this.demoSlotOlimpusView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotOlimpus was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
