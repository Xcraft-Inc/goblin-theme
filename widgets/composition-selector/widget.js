import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

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
    //? this.props.doAction('select', {composition});
  }

  /******************************************************************************/

  renderTheme(key, theme, index) {
    const active = key === this.props.currentComposition;
    const name = theme.get('name');
    const handleClick = () => this.select(key);

    return (
      <Button
        key={index}
        kind="menu-item"
        text={name}
        glyph={active ? 'solid/chevron-right' : 'solid/none'}
        glyphPosition="right"
        justify="between"
        textTransform="none"
        grow="1"
        onClick={handleClick}
        active={active}
      />
    );
  }

  renderThemes() {
    const result = [];
    let index = 0;
    for (const key of this.props.themes.keys()) {
      const theme = this.props.themes.get(key);
      const egg = theme.get('meta.egg', false);
      if (!egg) {
        result.push(this.renderTheme(key, theme, index++));
      }
    }
    return result;
  }

  render() {
    return (
      <Container
        kind="view"
        horizontalSpacing="large"
        backgroundColor={this.context.theme.palette.footerBackground}
      >
        <Container kind="pane-header">
          <Label text="Thèmes" kind="pane-header" />
        </Container>
        <Container kind="panes">{this.renderThemes()}</Container>
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

export default CompositionsSelector;
