import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ThemeComposer from '../theme-composer/widget.js';
import Container from 'goblin-gadgets/widgets/container/widget';
import ContextSwitch from '../context-switch/widget.js';

/******************************************************************************/

export default class ThemeEditor extends Widget {
  render() {
    const {id, desktopId} = this.props;
    const availableCompositors = Array.from(
      this.getState().backend.keys()
    ).filter((k) => k.startsWith('theme-composer@'));

    return (
      <Container kind="row" width="100%" grow="1" backgroundColor="lightgrey">
        <ContextSwitch
          widgetId={`${id}$switch`}
          availableCompositors={availableCompositors}
        />
        {availableCompositors.map((compId, key) => (
          <ThemeComposer
            key={key}
            desktopId={desktopId}
            switchId={`${id}$switch`}
            widgetId={`${id}$${compId}`}
            themeContext={compId.split('@')[1]}
            doAction={this.do.bind(this)}
          />
        ))}
      </Container>
    );
  }
}
