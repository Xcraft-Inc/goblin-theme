import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ThemeComposer from '../theme-composer/widget.js';
import Container from 'gadgets/container/widget';
import ContextSwitch from '../context-switch/widget.js';

export default class ThemeEditor extends Widget {
  render() {
    const {id} = this.props;
    const availableCompositors = Array.from(
      this.getState().backend.keys()
    ).filter((k) => k.startsWith('theme-composer@'));
    return (
      <Container
        kind="column"
        height="100%"
        grow="1"
        backgroundColor="lightgrey"
      >
        <ContextSwitch
          widgetId={`${id}$switch`}
          availableCompositors={availableCompositors}
        />
        {availableCompositors.map((compId, key) => (
          <ThemeComposer
            key={key}
            switchId={`${id}$switch`}
            widgetId={`${id}$${compId}`}
            themeContext={compId.split('@')[1]}
          />
        ))}
      </Container>
    );
  }
}
