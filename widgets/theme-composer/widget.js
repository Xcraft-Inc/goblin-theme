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
        const value = theme.get(`${cat}.${prop}`, null);
        if (valueType === 'string' && value && value.startsWith('#')) {
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
  render() {
    const {widgetId, theme, composition, themeContext} = this.props;
    if (!composition) {
      return null;
    }
    return (
      <WithModel
        model={`backend.theme-composer@${themeContext}.themes.${composition}`}
      >
        <Container kind="column" width="100% " height="100%">
          <ScrollableContainer
            kind="panes"
            id={`${widgetId}$scroll`}
            restoreScroll={true}
          >
            <Container kind="row-pane">
              <Label text={composition} grow="1" kind="title" />
            </Container>
            {Array.from(theme.entries()).map(([cat, props], key) => {
              return (
                <Container key={key} kind="column" grow="1">
                  <Container kind="pane">
                    <Container kind="row-pane">
                      <Label text={cat} grow="1" kind="subaction" />
                    </Container>
                    {this.renderEntry(theme, cat, props)}
                  </Container>
                </Container>
              );
            })}
          </ScrollableContainer>
        </Container>
      </WithModel>
    );
  }
}

const CompositionDetail = Widget.connect((state, props) => {
  const composer = state.get(`backend.theme-composer@${props.themeContext}`);
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );
  return {
    composition: currentComposition,
    theme: composer.get(`themes.${currentComposition}`),
  };
})(CompositionDetailNC);

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
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );

  const composer = state.get(`backend.theme-composer@${props.themeContext}`);

  return {currentComposition, themes: composer.get('themes')};
})(CompositionsSelectorNC);

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
