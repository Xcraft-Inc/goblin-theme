import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import * as styles from './styles';

/******************************************************************************/

function compareStrings(s1, s2) {
  if (s1 < s2) {
    return -1;
  }
  if (s1 > s2) {
    return 1;
  }
  return 0;
}

function compareThemes(t1, t2) {
  if (!t1.egg && t2.egg) {
    return -1;
  } else if (t1.egg && !t2.egg) {
    return 1;
  }

  return compareStrings(t1.displayName, t2.displayName);
}

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

  renderTheme(theme, index) {
    const active = theme.key === this.props.currentComposition;

    return (
      <Button
        key={index}
        kind="menu-item"
        text={theme.displayName}
        glyph={active ? 'solid/chevron-right' : 'solid/none'}
        glyphPosition="right"
        justify="between"
        textTransform="none"
        grow="1"
        onClick={() => this.select(theme.key)}
        active={active}
      />
    );
  }

  renderThemes() {
    return Array.from(this.props.themes.keys())
      .map((key) => {
        const theme = this.props.themes.get(key);
        const displayName = theme.get('displayName');
        const meta = theme.get('meta', null);
        const egg = meta ? meta.get('egg', false) : false;
        return {key, displayName, egg};
      })
      .filter((t) => {
        return !t.egg || this.props.accessToEggsThemes;
      })
      .sort((t1, t2) => compareThemes(t1, t2))
      .map((t, index) => this.renderTheme(t, index));
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
