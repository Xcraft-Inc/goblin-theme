import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import CompositionDetail from '../composition-detail/widget';
import CompositionSamples from '../composition-samples/widget';

/******************************************************************************/

class CompositionsSelectorNC extends Widget {
  constructor() {
    super(...arguments);
    this.select = this.select.bind(this);
  }

  select(composition) {
    this.dispatch({
      type: 'SELECT',
      composition,
    });
    this.props.doAction('select', {composition});
  }

  render() {
    const {currentComposition, themes} = this.props;

    return (
      <Container
        kind="view"
        horizontalSpacing="large"
        backgroundColor={this.context.theme.palette.footerBackground}
      >
        <Container kind="pane-header">
          <Label text="Thèmes" kind="pane-header" />
        </Container>
        <Container kind="panes">
          {Array.from(themes.keys())
            .filter(
              (name) =>
                name !== 'steampunk' &&
                name !== 'oldtimer' &&
                name !== 'royal' &&
                name !== 'clock'
            )
            .map((name, key) => {
              const select = () => this.select(name);
              return (
                <Button
                  key={key}
                  kind="menu-item"
                  text={name}
                  glyph={
                    currentComposition === name
                      ? 'solid/chevron-right'
                      : 'solid/none'
                  }
                  glyphPosition="right"
                  justify="between"
                  textTransform="none"
                  grow="1"
                  onClick={select}
                  active={currentComposition === name}
                />
              );
            })}
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/

const CompositionsSelector = Widget.connect((state, props) => {
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );

  const composer = state.get(`backend.theme-composer@${props.themeContext}`);

  return {currentComposition, themes: composer.get('themes')};
})(CompositionsSelectorNC);

/******************************************************************************/

class ThemeComposerNC extends Widget {
  render() {
    const {widgetId, doAction, isHidden, switchId, themeContext} = this.props;
    if (isHidden) {
      return null;
    }

    return (
      <Container kind="row" grow="1" width="100%">
        <CompositionsSelector
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
