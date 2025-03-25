export { getTheme };

function getTheme() {
    // Updates the theme with the current colors found in the root.
    return Blockly.Theme.defineTheme
        ('proto'
            , {
                base: Blockly.Theme.Classic
                , blockStyles:  // Only for predefined blocks.
                {
                    logic_blocks:
                    {
                        colourPrimary: '#cc44cc'
                        , colourSecondary: '#cccccc'
                        , colourTertiary: '#cccccc'
                    }
                    , loop_blocks:
                    {
                        colourPrimary: '#cc44cc'
                        , colourSecondary: '#cccccc'
                        , colourTertiary: '#cccccc'
                    }
                    , math_blocks:
                    {
                        colourPrimary: '#cc44cc'
                        , colourSecondary: '#cccccc'
                        , colourTertiary: '#cccccc'
                    }
                }
                , categoryStyles:  // Only for predefined categories.
                {
                    logic_category:
                    {
                        colour: '#cc44cc'
                    }
                    , loop_category:
                    {
                        colour: '#cc44cc'
                    }
                    , math_category:
                    {
                        colour: '#cc44cc'
                    }
                }
                , componentStyles:
                {
                    workspaceBackgroundColour: '#eeeeee'
                    , toolboxBackgroundColour: '#cccccc'
                    , toolboxForegroundColour: '#222222'
                    , flyoutBackgroundColour: '#cccccc'
                    , flyoutForegroundColour: '#222222'
                    , flyoutOpacity: 0.8
                    , insertionMarkerColour: '#222222'
                    , insertionMarkerOpacity: 0.3
                    , scrollbarOpacity: 0.4
                }
            }
        );
}
