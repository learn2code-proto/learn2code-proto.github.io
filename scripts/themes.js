import  { c_fg1,  c_fg2
        , c_bg1,  c_bg2
        , c_red,  c_green,  c_blue
        , c_cyan, c_yellow, c_magenta
        } from './core.js';
export  { theme, updateTheme };

var theme;

updateTheme();

function updateTheme() {
  // Updates the theme with the current colors found in the root.
  theme = Blockly.Theme.defineTheme
    ( 'proto'
    , { base: Blockly.Theme.Classic
      , blockStyles:  // Only for predefined blocks.
        { logic_blocks:
          { colourPrimary: c_magenta
          , colourSecondary: c_bg2
          , colourTertiary: c_fg2
          }
        , loop_blocks:
          { colourPrimary: c_magenta
          , colourSecondary: c_bg2
          , colourTertiary: c_fg2
          }
        , math_blocks:
          { colourPrimary: c_cyan
          , colourSecondary: c_bg2
          , colourTertiary: c_fg2
          }
        }
      , categoryStyles:  // Only for predefined categories.
        { logic_category:
          { colour: c_magenta
          }
        , loop_category:
          { colour: c_magenta
          }
        , math_category:
          { colour: c_cyan
          }
        }
      , componentStyles:
        { workspaceBackgroundColour: c_bg1
        , toolboxBackgroundColour: c_bg2
        , toolboxForegroundColour: c_fg1
        , flyoutBackgroundColour: c_bg2
        , flyoutForegroundColour: c_fg1
        , flyoutOpacity: 0.5
        , insertionMarkerColour: c_fg1
        , insertionMarkerOpacity: 0.3
        , scrollbarOpacity: 0.4
        }
      }
    );
}
