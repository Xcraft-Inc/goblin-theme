import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
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
        <Container kind="row" grow="1" width="100%">
          {availableCompositors.map((id, key) => {
            const select = () => this.select(id);
            return (
              <Button
                key={key}
                text={id.split('@')[1]}
                grow="1"
                kind="pane-navigator"
                onClick={select}
                active={currentCompositor === id}
              />
            );
          })}
        </Container>
      </div>
    );
  }
}

export default Widget.connect((state, props) => {
  const currentCompositor = state.get(
    `widgets.${props.widgetId}.currentCompositor`
  );
  return {currentCompositor};
})(ContextSwitch);
