//T:2019-02-27

import React from 'react';
import View from 'goblin-laboratory/widgets/view';
import Container from 'goblin-gadgets/widgets/container/widget.js';
import ThemeEditor from './widget.js';

class ThemeEditorView extends View {
  render() {
    const {workitemId, desktopId} = this.props;
    return (
      <Container kind="row" grow="1" width="100%">
        <ThemeEditor id={workitemId} />
      </Container>
    );
  }
}

export default ThemeEditorView;
