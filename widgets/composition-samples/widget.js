import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Separator from 'gadgets/separator/widget';
import TextInputNC from 'gadgets/text-input-nc/widget';
import TextFieldComboNC from 'gadgets/text-field-combo-nc/widget';
import CheckboxNC from 'gadgets/checkbox-nc/widget';
import Table from 'gadgets/table/widget';
import Ticket from 'gadgets/ticket/widget';
import Gauge from 'gadgets/gauge/widget';
import Slider from 'gadgets/slider/widget';
import Checkbox from 'gadgets/checkbox/widget';
import Frame from 'goblin-laboratory/widgets/frame/widget';
import * as styles from './styles';

/******************************************************************************/

class SettingsList extends Widget {
  constructor() {
    super(...arguments);
  }

  renderItem(value) {
    return (
      <Checkbox
        kind="active"
        key={value}
        text={value}
        checked={value === this.props.value}
        onChange={() => this.props.onChange(value)}
      />
    );
  }

  render() {
    return (
      <Container kind="row-pane" subkind="left">
        <Label
          text={this.props.text}
          width={this.props.labelWidth || '120px'}
          justify={this.props.labelJustify}
        />
        {this.props.list.map((value) => this.renderItem(value))}
        <Label width="20px" />
        <Slider
          width="150px"
          direction="horizontal"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
          displayValue="dragging"
          changeMode="throttled"
          throttleDelay={50}
          onChange={(value) => this.props.onChange(value)}
        />
      </Container>
    );
  }
}

/******************************************************************************/

class CompositionSamplesNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      scale: 1,
    };
  }

  //#region get/set
  get scale() {
    return this.state.scale;
  }
  set scale(value) {
    this.setState({
      scale: value,
    });
  }
  //#endregion

  renderScale() {
    return (
      <Container kind="pane">
        <Container kind="row">
          <SettingsList
            text="Scale"
            labelWidth="60px"
            list={[0.5, 0.75, 1, 1.2, 1.5, 2]}
            min={0.5}
            max={2}
            step={0.05}
            value={this.scale}
            onChange={(value) => (this.scale = value)}
          />
        </Container>
      </Container>
    );
  }

  renderButtons() {
    return (
      <Container kind="column">
        <Container kind="row">
          <Button text="Normal" />
          <Label width="10px" />
          <Button text="Disabled" disabled={true} />
          <Label width="10px" />
          <Button text="Readonly" readonly={true} />
          <Label width="10px" />
          <Button text="Active" active={true} />
          <Label width="10px" />
          <Button border="none" text="Sans bords" />
          <Label width="10px" />
          <Button glyph="solid/rocket" />
        </Container>

        <Separator kind="exact" height="10px" />

        <Container kind="row">
          <CheckboxNC text="Supprimer les fichiers associés" checked={false} />
          <Label width="10px" />
          <CheckboxNC text="J'ai lu et j'accepte" checked={true} />
        </Container>

        <Separator kind="exact" height="10px" />

        <Container kind="row">
          <Button
            kind="action"
            width="150px"
            place="1/3"
            glyph="solid/arrow-right"
            text="Terminer"
          />
          <Button
            kind="action"
            width="150px"
            place="2/3"
            glyph="solid/trash"
            text="Archiver"
          />
          <Button
            kind="action"
            width="150px"
            place="3/3"
            glyph="solid/times"
            text="Annuler"
          />
        </Container>
      </Container>
    );
  }

  renderFields() {
    return (
      <Container kind="column">
        <Container kind="row">
          <TextInputNC hintText="Normal" tooltip="Client pour la livraison" />
          <Label width="10px" />
          <TextInputNC shape="rounded" hintText="Rounded" />
        </Container>

        <Separator kind="exact" height="10px" />

        <Container kind="row">
          <TextInputNC rows={4} hintText="Multilignes" />
        </Container>

        <Separator kind="exact" height="10px" />

        <Container kind="row">
          <TextFieldComboNC
            hintText="Jour de la semaine"
            list={[
              'Lundi',
              'Mardi',
              'Mercredi',
              'Jeudi',
              'Vendredi',
              'Samedi',
              'Dimanche',
            ]}
            restrictsToList={true}
          />
          <Label width="10px" />
          <TextFieldComboNC
            hintText="Couleur"
            list={['Rouge', 'Vert', 'Bleu']}
            restrictsToList={false}
          />
          <Label width="10px" />
          <TextFieldComboNC
            hintText="Chercher"
            list={['Jean Dupond', 'Sandra Nicolet', 'John Difool']}
            restrictsToList={true}
            shape="rounded"
          />
        </Container>
      </Container>
    );
  }

  renderTables() {
    const t1 = {
      header: [
        {
          name: 'content',
          description: 'Type',
          width: '100px',
          textAlign: 'left',
        },
        {
          name: 'dimensions',
          description: 'Dimensions',
          width: '200px',
          textAlign: 'left',
        },
        {
          name: 'weight',
          description: 'Poids',
          width: '100px',
          textAlign: 'right',
        },
      ],
      rows: [
        {
          id: '1',
          content: 'C6',
          dimensions: {glyph: 'solid/check', text: '11.4x16.2x1'},
          weight: '150g',
        },
        {
          id: '2',
          content: 'A4',
          dimensions: {glyph: 'solid/times', text: '21x29.7x1'},
          weight: '100g',
        },
        {
          id: '3',
          content: 'XT9',
          dimensions: {glyph: 'solid/calendar', text: '50x50x100'},
          weight: '1kg',
        },
        {
          id: '4',
          content: 'N1',
          dimensions: {glyph: 'solid/rocket', text: '1x2x3'},
          weight: '10g',
        },
      ],
    };

    return (
      <Container kind="column">
        <Container kind="row">
          <Table
            widgetId={this.props.widgetId}
            data={t1}
            frame={true}
            selectionMode="multi"
          />
          <Label width="10px" />
        </Container>
      </Container>
    );
  }

  renderTickets() {
    return (
      <Container kind="column">
        <Container kind="row">
          <Ticket
            kind="ticket"
            shape="middle"
            width="250px"
            height="100px"
            backgroundText="1"
            color="#eee"
          />
          <Label width="10px" />
          <Ticket
            kind="rect"
            shape="middle"
            width="250px"
            height="100px"
            color="#cee"
            hatch={true}
            hudGlyph="solid/check"
          />
        </Container>
      </Container>
    );
  }

  renderGauges() {
    return (
      <Container kind="column">
        <Container kind="row">
          <Gauge
            kind="simple"
            direction="horizontal"
            width="150px"
            height="12px"
            gradient="red-yellow-green"
            value={30}
          />
          <Label width="10px" />
          <Gauge
            kind="rounded"
            direction="horizontal"
            width="150px"
            height="12px"
            gradient="red-yellow-green"
            value={50}
          />
          <Label width="10px" />
          <Gauge
            kind="rounded"
            direction="horizontal"
            width="150px"
            height="12px"
            gradient="red-yellow-green"
            value={80}
          />
        </Container>
      </Container>
    );
  }

  renderSliders() {
    return (
      <Container kind="column">
        <Container kind="row">
          <Slider
            direction="horizontal"
            width="150px"
            colorBar="#f00"
            value={25}
          />
          <Label width="10px" />
          <Slider
            direction="horizontal"
            width="150px"
            colorBar="#0f0"
            value={75}
          />
          <Label width="10px" />
          <Slider
            direction="horizontal"
            width="150px"
            gliderSize="large"
            gradient="1to2"
            gradientColor1="#ff0"
            gradientColor2="#f00"
            value={50}
          />
          <Label width="10px" />
          <Slider
            direction="horizontal"
            width="150px"
            cabSize="large"
            cabType="thin"
            gliderSize="large"
            gradient="rainbow"
            value={50}
          />
        </Container>
      </Container>
    );
  }

  renderContent() {
    return (
      <Container kind="view">
        <Container kind="pane-header">
          <Label text="Chavalier Bragon" kind="pane-header" />
        </Container>
        <Container kind="panes">
          <Container kind="pane">
            {this.renderFields()}
            <Separator kind="exact" height="10px" />
            {this.renderTables()}
            <Separator kind="exact" height="10px" />
            {this.renderTickets()}
            <Separator kind="exact" height="10px" />
            {this.renderGauges()}
            <Separator kind="exact" height="10px" />
            {this.renderSliders()}
            <Separator kind="exact" height="10px" />
            {this.renderButtons()}
          </Container>
        </Container>
      </Container>
    );
  }

  renderTaskBar() {
    return (
      <Container kind="left-bar">
        <Container kind="task-bar">
          <Button
            kind="task-logo"
            textTransform="none"
            glyph="light/cube"
            text="Exemples"
          />
          <Button kind="task-bar" glyph="solid/car" text="Lundi" />
          <Button kind="task-bar" glyph="solid/bicycle" text="Mardi" />
          <Button kind="task-bar" glyph="solid/truck" text="Mercredi" />
          <Button kind="task-bar" glyph="solid/train" text="Jeudi" />
          <Button kind="task-bar" glyph="solid/rocket" text="Vendredi" />
          <Button kind="task-bar" glyph="solid/plane" text="Samedi" />
          <Button kind="task-bar" glyph="regular/sun" text="Dimanche" />
        </Container>
      </Container>
    );
  }

  renderTopBar() {
    return (
      <Container kind="top-bar">
        <Button kind="main-tab" text="Clients" active={true} />
        <Button kind="main-tab" text="Produits" />
        <Button kind="main-tab" text="Factures" />
      </Container>
    );
  }

  renderTabsButton(glyph, text, tabIsActive) {
    return (
      <div className={this.styles.classNames.tabsButton}>
        <Button
          kind="view-tab-first"
          glyph={glyph}
          text={text}
          active={tabIsActive}
        />
        <Button kind="view-tab-last" glyph="solid/times" active={tabIsActive} />
      </div>
    );
  }

  renderTabs() {
    return (
      <Container kind="second-bar">
        <Container kind="view-tab">
          {this.renderTabsButton('solid/search', 'Recherche', false)}
          {this.renderTabsButton('solid/pen', 'Chevalier Bragon', true)}
          {this.renderTabsButton('solid/pen', 'Princesse Mara', false)}
        </Container>
        <Container kind="view-tab-right">
          <Button
            text="Notifications"
            glyph="solid/bell"
            glyphPosition="right"
            kind="view-tab-right"
            badgeValue={2}
          />
        </Container>
      </Container>
    );
  }

  renderSamples() {
    return (
      <Container kind="root-sample">
        <div className={this.styles.classNames.samples}>
          {this.renderTaskBar()}
          <Container kind="right">
            <Container kind="content">
              {this.renderTopBar()}
              {this.renderTabs()}
              {this.renderContent()}
            </Container>
          </Container>
        </div>
      </Container>
    );
  }

  // TODO: With <div className={this.styles.classNames.samplesRoot}>,
  // the color theme.palette.rootBackground is not according to theme!
  renderSamples_BUG() {
    return (
      <div className={this.styles.classNames.samplesRoot}>
        <div className={this.styles.classNames.samples}>
          {this.renderTaskBar()}
          <Container kind="right">
            <Container kind="content">
              {this.renderTopBar()}
              {this.renderTabs()}
              {this.renderContent()}
            </Container>
          </Container>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.composition) {
      return null;
    }

    const style = {
      flexGrow: 1,
      display: 'flex',
      transform: `scale(${this.scale})`,
      transformOrigin: 'top left',
      overflow: 'hidden',
    };

    return (
      <div className={this.styles.classNames.compositionSamples}>
        <Container kind="pane-header">
          <Label text="Exemples" kind="pane-header" />
        </Container>
        <div className={this.styles.classNames.panes}>
          {this.renderScale()}
          <div className={this.styles.classNames.scroll}>
            <Frame
              style={style}
              labId={this.context.labId}
              store={this.context.store}
              currentTheme={this.props.composition}
              themeContext={this.props.themeContext}
            >
              {this.renderSamples()}
            </Frame>
          </div>
        </div>
      </div>
    );
  }
}

/******************************************************************************/

const CompositionSamples = Widget.connect((state, props) => {
  const composer = state.get(`backend.theme-composer@${props.themeContext}`);
  const currentComposition = state.get(
    `widgets.${props.widgetId}.currentComposition`
  );
  return {
    composition: currentComposition,
    theme: composer.get(`themes.${currentComposition}`),
    colors: composer.get('colors'),
  };
})(CompositionSamplesNC);

export default CompositionSamples;
