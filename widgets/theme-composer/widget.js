import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
/******************************************************************************/

class CompositionDetailNC extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const {theme} = this.props;
    return (
      <Container kind="column" height="100%">
        {JSON.stringify(theme)}
      </Container>
    );
  }
}

const CompositionDetail = Widget.connect((state, props) => {
  const composer = state.get(`backend.theme-composer@${props.themeContext}`);
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );
  const currentCompositor = state.get(
    `widgets.${props.switchId}.currentCompositor`,
    ''
  );
  const isHidden = currentCompositor.split('@')[1] !== props.themeContext;
  return {isHidden, theme: composer.get(`themes.${currentComposition}`)};
})(CompositionDetailNC);

class CompositionsSelectorNC extends Widget {
  constructor() {
    super(...arguments);
    this.select = this.select.bind(this);
    this.dispatch({
      type: 'SELECT',
      composition: this.props.themes[0],
    });
  }

  select(composition) {
    this.dispatch({
      type: 'SELECT',
      composition,
    });
  }

  render() {
    const {currentComposition, themes} = this.props;

    return (
      <Container
        kind="column"
        width="200px"
        height="100%"
        backgroundColor="lightgrey"
      >
        {Array.from(themes.keys()).map((name, key) => {
          const select = () => this.select(name);
          return (
            <Button
              key={key}
              text={name}
              grow="1"
              kind="table-action"
              onClick={select}
              active={currentComposition === name}
            />
          );
        })}
      </Container>
    );
  }
}

const CompositionsSelector = Widget.connect((state, props) => {
  const composer = state.get(`backend.theme-composer@${props.themeContext}`);
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );
  const currentCompositor = state.get(
    `widgets.${props.switchId}.currentCompositor`,
    ''
  );
  const isHidden = currentCompositor.split('@')[1] !== props.themeContext;
  return {isHidden, currentComposition, themes: composer.get('themes')};
})(CompositionsSelectorNC);

class ThemeComposerNC extends Widget {
  render() {
    const {widgetId, isHidden, switchId, themeContext} = this.props;
    if (isHidden) {
      return null;
    }
    return (
      <Container kind="row" grow="1" width="100%">
        <CompositionsSelector
          widgetId={widgetId}
          switchId={switchId}
          themeContext={themeContext}
        />
        <CompositionDetail
          widgetId={widgetId}
          switchId={switchId}
          themeContext={themeContext}
        />
      </Container>
    );
  }
}

const ThemeComposer = Widget.connect((state, props) => {
  const currentCompositor = state.get(
    `widgets.${props.switchId}.currentCompositor`,
    ''
  );
  const isHidden = currentCompositor.split('@')[1] !== props.themeContext;
  return {isHidden};
})(ThemeComposerNC);

export default ThemeComposer;
