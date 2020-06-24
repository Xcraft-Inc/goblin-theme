import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

class ContextSwitch extends Widget {
  constructor() {
    super(...arguments);
    this.select = this.select.bind(this);
  }

  select(compositor) {
    this.dispatch({
      type: 'SELECT',
      compositor,
    });
  }

  render() {
    const {widgetId, availableCompositors, currentCompositor} = this.props;

    return (
      <div>
        <Container
          kind="view"
          height="100%"
          horizontalSpacing="large"
          backgroundColor={this.context.theme.palette.footerBackground}
        >
          <Container kind="pane-header">
            <Label text="Apps" kind="pane-header" />
          </Container>
          <Container kind="panes">
            {availableCompositors.map((id, key) => {
              const select = () => this.select(id);
              return (
                <Button
                  key={key}
                  text={id.split('@')[1]}
                  glyph={
                    currentCompositor === id
                      ? 'solid/chevron-right'
                      : 'solid/none'
                  }
                  glyphPosition="right"
                  justify="between"
                  textTransform="none"
                  grow="1"
                  kind="menu-item"
                  onClick={select}
                />
              );
            })}
          </Container>
        </Container>
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const currentCompositor = state.get(
    `widgets.${props.widgetId}.currentCompositor`
  );
  return {currentCompositor};
})(ContextSwitch);
