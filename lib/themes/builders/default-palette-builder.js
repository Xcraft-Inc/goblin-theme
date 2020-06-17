'use strict';

const {
  darken,
  lighten,
  emphasize,
  fade,
  brightnen,
} = require('../color-manipulator.js');

/******************************************************************************/

function _darken(colors, color, coefficient) {
  if (colors.isDarkTheme) {
    return lighten(color, coefficient);
  } else {
    return darken(color, coefficient);
  }
}

function _lighten(colors, color, coefficient) {
  if (colors.isDarkTheme) {
    return darken(color, coefficient);
  } else {
    return lighten(color, coefficient);
  }
}

module.exports = function (colors) {
  return {
    isDarkTheme: colors.isDarkTheme,

    textColor: colors.dark,
    hintTextColor: _lighten(
      colors,
      colors.dark,
      colors.isDarkTheme ? 0.6 : 0.8
    ),

    rootBackground: _darken(
      colors,
      colors.base,
      colors.isDarkTheme ? 0.2 : 0.4
    ),

    taskBackground: _darken(
      colors,
      colors.base,
      colors.isDarkTheme ? 0.05 : 0.1
    ),
    taskLogoBackground: colors.light,
    taskButtonBorder: _darken(colors, colors.base, 0.3),
    taskButtonText: colors.isDarkTheme
      ? colors.dark
      : lighten(colors.light, 0.2),
    taskButtonBackground: _darken(colors, colors.base, 0.0),
    taskSeparatorBackground: _darken(colors, colors.base, 0.15),
    taskLabelText: _darken(colors, colors.dark, 1.0),

    taskTabInactiveBackground: colors.base,
    taskTabInactiveText: emphasize(colors.base, 1.0),
    taskTabActiveBackground: emphasize(colors.base, 0.3),
    taskTabActiveText: emphasize(emphasize(colors.base, 0.3), 1.0),

    mainTabBackground: _darken(colors, colors.light, 0.2),
    mainTabButtonInactiveBackground: _darken(colors, colors.light, 0.1),
    mainTabButtonActiveBackground: colors.light,
    mainTabText: emphasize(colors.light, 0.6),

    viewTabBackground: _lighten(
      colors,
      colors.dark,
      colors.isDarkTheme ? 0.2 : 0.0
    ),
    viewTabButtonInactiveBackground: _lighten(colors, colors.dark, 0.3),
    viewTabButtonActiveBackground: _darken(colors, colors.light, 0.05),
    viewTabGlyph: emphasize(colors.dark, 0.5),
    viewTabRightText: emphasize(colors.dark, 0.5),
    viewTabRightTextBackground: _lighten(colors, colors.dark, 0.1),

    actionBackground: colors.light,
    actionBorder: emphasize(colors.light, 0.2),
    actionButtonBackground: colors.base,

    tableActionBackground: _darken(colors, colors.light, 0.1),

    roundButtonText: colors.light,
    roundButtonGlyph: colors.light,
    roundButtonBackground: emphasize(colors.light, 0.2),

    identityButtonText: colors.dark,
    identityButtonGlyph: colors.dark,
    identityButtonBackground: colors.light,

    subactionButtonBackground: _darken(colors, colors.light, 0.1),
    subactionButtonText: _lighten(colors, colors.dark, 0.5),

    footerBackground: _lighten(
      colors,
      colors.dark,
      colors.isDarkTheme ? 0.2 : 0.0
    ),
    footerTextBackground: _lighten(colors, colors.dark, 0.1),
    footerText: emphasize(colors.dark, 0.5),

    viewBackground: emphasize(colors.light, 0.05),

    paneNavigatorBackground: emphasize(colors.light, 0.05),
    paneNavigatorInactiveText: emphasize(colors.light, 0.4),
    paneNavigatorInactiveBorder: emphasize(colors.light, 0.2),
    paneNavigatorActiveBorder: emphasize(colors.light, 0.8),
    paneBackground: colors.light,
    paneNavigatorBorderHover: colors.base,
    paneHeaderBackground: _lighten(
      colors,
      colors.dark,
      colors.isDarkTheme ? 0.55 : 0.7
    ),
    paneHeaderText: colors.light,
    paneSelectedBackground: _lighten(colors, colors.base, 0.6),
    paneSelectedText: _lighten(colors, colors.dark, 0.2),

    vnavigatorButtonBackground: _darken(colors, colors.base, 0.4),
    vnavigatorButtonInactiveBackground: colors.base,
    vnavigatorButtonActiveBackground: _lighten(colors, colors.base, 0.5),

    text: _lighten(colors, colors.dark, 0.2),
    highlightedText: emphasize(colors.dark, 0.1),
    highlightedTextBackground: emphasize(colors.base, 0.7),
    infoBackground: _darken(colors, colors.light, 0.2),
    buttonBackground: _lighten(colors, colors.light, 0.5),
    buttonBorder: _lighten(colors, colors.dark, 0.7),
    buttonBorderColor: _lighten(colors, colors.dark, 0.7),
    labelButtonBackground: _darken(colors, colors.light, 0.05),
    textFieldBorderColor: _lighten(colors, colors.dark, 0.7),
    textFieldReadonlyBackground: _darken(colors, colors.light, 0.05),
    textFieldRequiredBackground: _lighten(colors, colors.alert, 0.8),
    textFieldWrongBackground: _lighten(colors, colors.alert, 0.6),
    textFieldDisableBackground: emphasize(colors.dark, 0.9),
    textFieldDisableText: emphasize(colors.dark, 0.7),

    buttonDisableBorder: emphasize(colors.dark, 0.5),
    buttonDisableBackground: _lighten(colors, colors.dark, 0.8),
    buttonDisableGlyph: emphasize(colors.dark, 0.5),
    buttonDisableText: emphasize(colors.dark, 0.5),

    badgeBackground: colors.alert,
    badgeText: emphasize(colors.alert, 1.0),

    messageInfoBackground: colors.base,
    messageWarningBackground: colors.warning,
    messageInfoText: emphasize(colors.base, 1.0),
    messageWarningText: emphasize(colors.warning, 1.0),

    comboActiveBackground: colors.base,
    comboActiveGlyph: emphasize(colors.base, 1.0),
    comboItemBackground: colors.light,
    comboItemFocused: _darken(colors, colors.light, 0.05),
    comboItemActive: _darken(colors, colors.light, 0.15),
    comboItemHover: _darken(colors, colors.light, 0.05),
    comboButtonBackgroundHover: null, // use default

    calendarBackground: colors.light,
    calendarBackgroundHover: emphasize(colors.light, 0.05),
    calendarWeekendBackground: emphasize(colors.light, 0.05),
    calendarActiveBackground: colors.base,
    calendarHoverBackground: _lighten(colors, colors.base, 0.8),
    calendarActiveAddBackground: colors.success,
    calendarActiveSubBackground: _lighten(colors, colors.warning, 0.3),
    calendarText: colors.dark,
    calendarDimmedText: _lighten(
      colors,
      colors.dark,
      colors.isDarkTheme ? 0.5 : 0.8
    ),
    calendarActiveText: colors.isDarkTheme ? colors.dark : colors.light,
    calendarActiveAddText: colors.light,
    calendarActiveSubText: colors.light,
    calendarHeaderText: colors.dark,

    recurrenceHeaderInfoCompactedBackground: emphasize(colors.light, 0.05),
    recurrenceHeaderInfoExtendedBackground: colors.base,
    recurrenceHeaderInfoCompactedText: colors.dark,
    recurrenceHeaderInfoExtendedText: colors.light,
    recurrenceExtendedBoxBackground: _lighten(colors, colors.base, 0.5),

    eventBoxBackground: _darken(colors, colors.light, 0.15),
    eventBackground: _darken(colors, colors.light, 0.05),
    eventOddBackground: _darken(colors, colors.light, 0.03),
    eventDowsBackground: _darken(colors, colors.light, 0.1),
    eventColumnBackground: colors.light,
    eventHeaderText: colors.dark,
    eventBorder: _lighten(colors, colors.dark, 0.8),
    chronoDayBackground: _darken(colors, colors.light, 0.15),
    chronoEventMainBackground: colors.base,
    chronoEventStartBackground: '#fbaf3b',
    chronoEventMiddleBackground: _darken(colors, colors.light, 0.15),
    chronoEventEndBackground: '#00963c',
    chronoLineSeparator: _darken(colors, colors.light, 0.15),
    chronoNavigatorBackground: _darken(
      colors,
      colors.base,
      colors.isDarkTheme ? 0.6 : 0.4
    ),
    chronoNavigatorText: _darken(colors, colors.light, 0.3),
    chronoBadgeText: colors.isDarkTheme ? colors.dark : colors.light,
    chronoBadgeBackground: colors.base,
    chronoLabelSeparator: _darken(colors, colors.base, 0.4),
    chronoLabelTooltipBackground: lighten(
      colors.base,
      colors.isDarkTheme ? 0.1 : 0.7
    ),

    markBase: colors.base,
    markPrimary: colors.alert,
    markSecondary: colors.warning,
    markSuccess: colors.success,
    markPick: '#fbaf3b',
    //? markDropPick: '#a3a63b',
    markDropPick: '#fb5f3b',
    markDrop: '#00963c',
    markTask: _lighten(colors, colors.base, 0.2),
    markDark: colors.dark,

    menuBackground: colors.dark,
    menuText: _lighten(colors, colors.dark, 0.8),
    menuFocusText: _lighten(colors, colors.base, 0.4),
    menuItemInactiveBackground: _lighten(colors, colors.dark, 0.2),
    menuItemActiveBackground: _lighten(colors, colors.dark, 0.4),
    menuItemFocusBackground: colors.dark,

    flyingBalloonBackground: colors.dark,
    flyingBalloonWarningBackground: _darken(colors, colors.alert, 0.1),
    flyingBalloonText: colors.light,

    flyingDialogBackground: colors.isDarkTheme
      ? lighten(colors.light, 0.25)
      : colors.light,
    flyingDialogFullScreenBackground: colors.isDarkTheme
      ? 'rgba(0, 0, 0, 0.5)'
      : 'rgba(0, 0, 0, 0.2)',

    ticketsBackground: emphasize(colors.light, 0.05),
    ticketBackground: colors.light,
    ticketBackgroundHover: _lighten(colors, colors.base, 0.85),
    ticketShadow: colors.isDarkTheme
      ? darken(colors.light, 0.9)
      : emphasize(colors.light, 0.2),
    ticketDragAndDropShadow: emphasize(colors.light, 0.1),
    ticketDragAndDropHover: emphasize(colors.light, 0.1),
    ticketDragAndDropHandle: emphasize(colors.light, 0.07),
    ticketHover: colors.isDarkTheme ? darken(colors.hilite, 0.2) : colors.base,
    ticketTransitHover: emphasize(colors.base, 0.5),
    ticketGlueBackground: _darken(
      colors,
      colors.light,
      colors.isDarkTheme ? 0.15 : 0.1
    ),
    ticketGlueHilitedBackground: lighten(colors.base, 0.5),
    ticketMessengerBackground: _lighten(colors, colors.base, 0.5),
    ticketMessengerHilitedBackground: colors.isDarkTheme
      ? lighten(colors.base, 0.3)
      : colors.base,
    ticketSelectedMessengerBackground: _darken(colors, colors.base, 0.1),
    ticketGlueTitle: emphasize(colors.dark, 1.0),
    ticketHatchOpacity: 0.1,
    ticketDimmed: emphasize(colors.light, 0.3),
    ticketWarningBackground: _lighten(colors, colors.warning, 0.3),
    ticketFlashBackground: _lighten(colors, colors.base, 0.85),
    ticketHilitedBackground: lighten(
      colors.base,
      colors.isDarkTheme ? 0.2 : 0.5
    ),
    ticketExecutedBackground: _lighten(colors, colors.success, 0.8),
    ticketHudContent: colors.light,
    ticketHudBackground: colors.isDarkTheme ? colors.hilite : colors.base,
    ticketHudShadow: 'rgba(0, 0, 0, 0.2)',
    ticketBadgeBackground: _darken(colors, colors.light, 0.5),
    ticketNumberBackground: colors.isDarkTheme
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)',
    ticketSubpaneBorder: _darken(colors, colors.light, 0.3),
    ticketGaugeBackground: _darken(colors, colors.light, 0.5),
    ticketGaugeBackgroundShadow:
      'inset 3px 1px 6px ' + _darken(colors, colors.light, 0.75),
    ticketGaugeContentShadow: 'inset -1px 0px 1px rgba(0,0,0,0.3)',
    ticketGaugeContentGlossy: 'rgba(255,255,255,0.7)',
    ticketGaugeEmptyBorder: _darken(colors, colors.light, 0.15),
    ticketRecurrentCorner: _lighten(colors, colors.base, 0.5),

    documentBackground: colors.light,
    documentBackgroundHover: _lighten(colors, colors.base, 0.85),

    warningBackground: colors.warning,
    warningText: colors.dark,

    dialogBackground: colors.light,

    floatingBackground: emphasize(colors.light, 0.05),
    floatingSecondary: emphasize(colors.light, 0.3),

    boxBackground: colors.light,
    boxActiveBackground: emphasize(colors.base, colors.isDarkTheme ? 0.4 : 0.7),

    configuratorBackground: colors.dark,
    configuratorActiveBackground: colors.hilite,

    notificationBackground: colors.dark,
    notificationText: emphasize(colors.dark, 0.5),
    notificationTextHover: emphasize(colors.dark, 0.8),
    notificationMessage: emphasize(colors.dark, 0.8),
    notificationBackgroundHeader: emphasize(colors.dark, 0.1),
    notificationBackgroundNotRead: emphasize(colors.dark, 0.1),
    notificationBackgroundRead: emphasize(colors.dark, 0.1),

    splitterBackground: _darken(colors, colors.base, 0.4),
    splitterBackgroundHover: _lighten(colors, colors.base, 0.3),

    dragAndDropHover: colors.hilite,
    dragAndDropHandleHover: colors.isDarkTheme ? colors.hilite : colors.base,
    dragAndDropBackground: colors.light,
    dragAndDropShadow: colors.isDarkTheme
      ? '0px 10px 50px rgba(0, 0, 0, 0.80)'
      : '0px 10px 50px rgba(0, 0, 0, 0.50)',
    roadbookBackground: emphasize(colors.light, 0.05),
    roadbookDragAndDropBackground: emphasize(colors.light, 0.2),

    tableCellBackground: colors.light,
    tableHoverBackground: _lighten(colors, colors.base, 0.85),
    tableSelectedBackground: colors.base,
    tableBorder: _darken(colors, colors.light, 0.2),
    tableSelectedText: colors.isDarkTheme ? colors.dark : colors.light,
    tableSuccessBackground: _lighten(colors, colors.success, 0.5),
    tableWarningBackground: _lighten(colors, colors.warning, 0.5),
    tableErrorBackground: colors.warning,

    tableDragButtonColumnBackground: colors.isDarkTheme
      ? lighten(colors.base, 0.3)
      : lighten(colors.base, 0.9),
    tableDragButtonWidthBackground: colors.isDarkTheme
      ? lighten(colors.base, 0.3)
      : lighten(colors.base, 0.7),
    tableDragHoverBackground1: colors.isDarkTheme
      ? fade(colors.dark, 0.1)
      : fade(colors.base, 0.1),
    tableDragHoverBackground2: colors.isDarkTheme
      ? fade(colors.dark, 0.3)
      : fade(colors.base, 0.3),
    tableDragBorder: colors.isDarkTheme ? colors.dark : colors.base,
    tableDragTravelingBackground: colors.isDarkTheme
      ? lighten(colors.light, 0.1)
      : darken(colors.light, 0.05),
    tableDragTravelingBorder: colors.dark,
    tableFilterHeaderHatch: colors.isDarkTheme
      ? fade(colors.dark, 0.2)
      : fade(colors.dark, 0.1),

    treeExpandButtonHover: colors.isDarkTheme
      ? colors.hilite
      : lighten(colors.base, 0.5),

    chatMeBackground: '#aea',
    chatOtherBackground: '#eca',

    busyBackground: 'rgba(255, 255, 255, 0.8)',
    busyForeground: colors.dark,

    dynamicToolbarBackground: _lighten(colors, colors.dark, 0.1),
    dynamicToolbarButtonGlyph: _darken(colors, colors.light, 0.4),
    dynamicToolbarButtonActiveGlyph: _darken(colors, colors.light, 0.8),

    toolbarInactiveBackground: _lighten(colors, colors.dark, 0.1),
    toolbarInactiveText: _lighten(colors, colors.dark, 0.7),
    toolbarActiveBackground: colors.light,
    toolbarActiveText: _darken(colors, colors.light, 0.7),

    focused: fade(colors.isDarkTheme ? colors.hilite : colors.base, 0.5),
    checkButtonTextHover: _lighten(colors, colors.base, 0.2),

    pluginToolbarEditBackground: colors.base,
    pluginToolbarReadonlyBackground: _darken(colors, colors.light, 0.2),
    pluginLightButtonGlyph: _lighten(colors, colors.dark, 0.2),
    pluginLightButtonGlyphHover: colors.light,
    pluginLightButtonBackgroundHover: 'rgba(0, 0, 0, 0.15)',
    pluginDarkButtonGlyph: _darken(
      colors,
      colors.light,
      colors.isDarkTheme ? 0.5 : 0.1
    ),
    pluginDarkButtonGlyphHover: colors.light,
    pluginDarkButtonBackgroundHover: 'rgba(255, 255, 255, 0.2)',

    scrollerThumbBackground: _darken(colors, colors.light, 0.2),
    scrollerThumbHoverBackground: _darken(colors, colors.light, 0.3),

    markdownText: _lighten(colors, colors.dark, 0.2),
    markdownHiliteText: colors.dark,
    markdownHiliteBackground: colors.isDarkTheme
      ? lighten(colors.base, 0.3)
      : lighten(colors.base, 0.5),

    tooltipBackground: colors.tooltip,
    tooltipBorder: _lighten(colors, colors.dark, 0.4),
    tooltipText: _darken(colors, colors.dark, 0.5),

    boardSampleText: '#fff',
    boardSampleBacklog: brightnen(colors.success, 2.0),
    boardSampleRoadbooks: brightnen(colors.base, 2.0),
    boardSampleDesks: brightnen(colors.warning, 2.0),

    flatComboInactiveBackground: colors.light,
    flatComboActiveBackground: colors.base,
    flatComboInactiveText: colors.dark,
    flatComboActiveText: colors.light,
    flatComboDisableInactiveBackground: _darken(colors, colors.light, 0.05),
    flatComboDisableActiveBackground: _lighten(colors, colors.base, 0.5),
    flatComboDisableInactiveText: _lighten(colors, colors.dark, 0.3),
    flatComboDisableActiveText: colors.light,

    inputFileBorderColor: colors.light,
    inputFileBackground: colors.base,
    inputFileBackgroundHover: _lighten(colors.base, 0.6),
    inputFileBackgroundFocus: _lighten(colors.base, 0.7),

    carouselButtonBackground: colors.light,
    carouselButtonGlyph: _lighten(colors, colors.base, 0.5),
    carouselBulletBackground: colors.light,
    carouselBulletBorder: colors.base,

    facetBackground: colors.light,
    facetBackgroundHover: _lighten(colors, colors.base, 0.8),
    facetBackgroundActive: _lighten(colors, colors.base, 0.9),
    facetText: colors.dark,
    facetRange: _lighten(colors, colors.dark, 0.5),

    statusText: '#fff', // white, also with a dark theme

    stateBrowserHeaderBackground: colors.base,
    stateBrowserBackText: colors.light,
    stateBrowserBackBackground: null,
    stateBrowserBackBackgroundHover: _lighten(colors, colors.base, 0.2),

    filterItemSelected: colors.light,
    filterItemBackgroundSelected: colors.base,
    filterItemBackgroundHover: _lighten(colors, colors.base, 0.8),
    filterItemBackgroundHoverSelected: _lighten(colors, colors.base, 0.2),

    red: '#ff0000',
    green: '#00be00',
    blue: '#0054ff',
    orange: '#ffa500',

    base: colors.base,
    hilite: colors.hilite,
    light: colors.light,
    dark: colors.dark,
    success: colors.success,
    alert: colors.alert,
    warning: colors.warning,
    tooltip: colors.tooltip,
    chrome: colors.chrome,
  };
};

/******************************************************************************/
