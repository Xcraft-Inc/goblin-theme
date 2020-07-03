import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import * as styles from './styles';

/******************************************************************************/

class CompositionsSelectorNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.select = this.select.bind(this);
    this.toggleEggs = this.toggleEggs.bind(this);
  }

  select(composition) {
    this.dispatch({
      type: 'SELECT',
      composition,
    });
    //? this.props.doAction('select', {composition});
  }

  toggleEggs() {
    this.doFor(this.props.clientSessionId, 'set-access-to-eggs-themes', {
      show: !this.props.accessToEggsThemes,
    });
  }

  /******************************************************************************/

  renderTheme(key, index) {
    const theme = this.props.themes.get(key);
    const name = theme.get('name');
    const active = key === this.props.currentComposition;

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
        onClick={() => this.select(key)}
        active={active}
      />
    );
  }

  renderThemes() {
    return Array.from(this.props.themes.keys())
      .filter((key) => {
        const theme = this.props.themes.get(key);
        const egg = theme.get('meta.egg', false);
        return !egg || this.props.accessToEggsThemes;
      })
      .map((key, index) => this.renderTheme(key, index));
  }

  renderEggsButton() {
    return (
      <div
        className={this.styles.classNames.eggsButton}
        onClick={this.toggleEggs}
      />
    );
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
        <Container kind="panes">
          {this.renderThemes()}
          {this.renderEggsButton()}
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/

const CompositionsSelector = Widget.connect((state, props) => {
  const userSession = Widget.getUserSession(state);
  const clientSessionId = userSession.get('id');
  const accessToEggsThemes = userSession.get('accessToEggsThemes');

  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );

  const composer = state.get(`backend.theme-composer@${props.themeContext}`);
  const themes = composer.get('themes');

  return {clientSessionId, accessToEggsThemes, currentComposition, themes};
})(CompositionsSelectorNC);

export default CompositionsSelector;
