import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import CompositionSelector from '../composition-selector/widget';
import CompositionDetail from '../composition-detail/widget';
import CompositionSamples from '../composition-samples/widget';

/******************************************************************************/

class ThemeComposerNC extends Widget {
  render() {
    const {widgetId, doAction, isHidden, switchId, themeContext} = this.props;
    if (isHidden) {
      return null;
    }

    return (
      <Container kind="row" grow="1" width="100%">
        <CompositionSelector
          widgetId={widgetId}
          switchId={switchId}
          themeContext={themeContext}
          doAction={doAction}
        />
        <CompositionDetail
          widgetId={widgetId}
          switchId={switchId}
          themeContext={themeContext}
          doAction={doAction}
        />
        <CompositionSamples
          widgetId={widgetId}
          switchId={switchId}
          themeContext={themeContext}
          doAction={doAction}
        />
      </Container>
    );
  }
}

/******************************************************************************/

const ThemeComposer = Widget.connect((state, props) => {
  const currentCompositor = state.get(
    `widgets.${props.switchId}.currentCompositor`,
    ''
  );

  let isHidden = true;
  if (currentCompositor) {
    isHidden = currentCompositor.split('@')[1] !== props.themeContext;
  }
  return {isHidden};
})(ThemeComposerNC);

export default ThemeComposer;
