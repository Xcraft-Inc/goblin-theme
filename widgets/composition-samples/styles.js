/******************************************************************************/

export default function styles(theme) {
  const m = theme.shapes.containerMargin;

  const compositionSamples = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.viewBackground,
  };

  const panes = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '0px ' + m + ' 0px ' + m,
  };

  const scroll = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
  };

  const tabsButton = {
    display: 'flex',
    flexDirection: 'row',
  };

  const samplesRoot = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.rootBackground,
  };

  const samples = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  };

  return {
    compositionSamples,
    panes,
    scroll,
    tabsButton,
    samplesRoot,
    samples,
  };
}

/******************************************************************************/
