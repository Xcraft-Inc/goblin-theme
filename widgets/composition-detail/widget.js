import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ScrollableContainer from 'goblin-gadgets/widgets/scrollable-container/widget';
import WithModel from 'goblin-laboratory/widgets/with-model/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Field from 'goblin-gadgets/widgets/field/widget';
import colorsProps from '../../lib/themes/colors/props.js';
import looksProps from '../../lib/themes/looks/props.js';
import spacingsProps from '../../lib/themes/spacings/props.js';
import timingProps from '../../lib/themes/timings/props.js';
const properties = {
  ...colorsProps,
  ...looksProps,
  ...spacingsProps,
  ...timingProps,
};
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

function compareProps(p1, p2) {
  const k1 = properties[p1] ? properties[p1].kind : '';
  const k2 = properties[p2] ? properties[p2].kind : '';

  const r = compareStrings(k1, k2);
  if (r !== 0) {
    return r;
  }

  return compareStrings(p1, p2);
}

/******************************************************************************/

class CompositionDetailNC extends Widget {
  constructor() {
    super(...arguments);
  }

  renderEntry(theme, cat, props) {
    if (!props) {
      return null;
    }

    if (typeof props === 'object') {
      const editCurrentTheme =
        this.props.composition === this.context.theme.name;

      return Array.from(props.keys())
        .sort((p1, p2) => compareProps(p1, p2))
        .map((prop, index) => {
          const value = theme.get(`${cat}.${prop}`);
          if (typeof value === 'object') {
            return null;
          }
          const fieldProperties = properties[prop];
          if (!fieldProperties) {
            return null;
          }

          return (
            <Container key={index} kind="row">
              <Field
                changeComboMode={editCurrentTheme ? 'whenClosed' : null}
                labelWidth="200px"
                labelText={prop}
                model={`.${cat}.${prop}`}
                {...fieldProperties}
              />
            </Container>
          );
        });
    } else {
      if (typeof theme.get(cat) !== 'string') {
        return null;
      }
      return (
        <Container kind="row">
          <Field
            kind="string"
            labelWidth="200px"
            labelText={cat}
            model={`.${cat}`}
          />
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

export default CompositionDetail;
