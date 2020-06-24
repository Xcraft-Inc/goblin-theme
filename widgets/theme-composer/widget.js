import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ScrollableContainer from 'goblin-gadgets/widgets/scrollable-container/widget';
import WithModel from 'goblin-laboratory/widgets/with-model/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Field from 'gadgets/field/widget';

/******************************************************************************/

class CompositionDetailNC extends Widget {
  constructor() {
    super(...arguments);
  }

  getFieldKind(type) {
    switch (type) {
      case 'string':
      case 'number':
      case 'color':
        return type;
      default:
        null;
    }
  }

  renderEntry(theme, cat, props) {
    if (!props) {
      return null;
    }
    if (typeof props === 'object') {
      return Array.from(props.keys()).map((prop, key) => {
        let valueType = typeof theme.get(`${cat}.${prop}`, null);
        if (cat === 'colors') {
          valueType = 'color';
        }
        const kind = this.getFieldKind(valueType);
        if (!kind) {
          return null;
        }
        return (
          <Container key={key} kind="row">
            <Field labelText={prop} kind={kind} model={`.${cat}.${prop}`} />
          </Container>
        );
      });
    } else {
      return (
        <Container kind="row">
          <Field labelText={cat} model={`.${cat}`} />
        </Container>
      );
    }
  }

  renderList() {
    const {widgetId, theme} = this.props;

    return (
      <ScrollableContainer
        kind="panes"
        id={`${widgetId}$scroll`}
        restoreScroll={true}
      >
        {Array.from(theme.entries()).map(([cat, props], key) => {
          return (
            <Container key={key} kind="column" grow="1">
              <Container kind="pane">
                <Container kind="row-pane">
                  <Label text={cat} grow="1" kind="title" />
                </Container>
                {this.renderEntry(theme, cat, props)}
              </Container>
            </Container>
          );
        })}
      </ScrollableContainer>
    );
  }

  render() {
    const {composition, themeContext} = this.props;
    if (!composition) {
      return null;
    }

    return (
      <WithModel
        model={`backend.theme-composer@${themeContext}.themes.${composition}`}
      >
        <Container kind="view">
          <Container kind="pane-header">
            <Label text={composition} kind="pane-header" />
          </Container>
          {this.renderList()}
        </Container>
      </WithModel>
    );
  }
}

/******************************************************************************/

const CompositionDetail = Widget.connect((state, props) => {
  const composer = state.get(`backend.theme-composer@${props.themeContext}`);
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );
  return {
    composition: currentComposition,
    theme: composer.get(`themes.${currentComposition}`),
    colors: composer.get('colors'),
  };
})(CompositionDetailNC);

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
