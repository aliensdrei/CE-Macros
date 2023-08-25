import xapi from 'xapi';

//pentru buton direct
xapi.Event.UserInterface.Extensions.Panel.Clicked.PanelId.on((guiEvent) => {
  if (guiEvent == "p_preset1") {
    xapi.Command.Camera.Preset.Activate({ PresetId: 1 })
  }
});

//pentru panoul cu selectii
xapi.Event.UserInterface.Extensions.Widget.Action.on((guiEvent) => {
  if ((guiEvent.Type == "released") && (guiEvent.WidgetId == "w_presets")){
      switch (guiEvent.Value){
        case "Unu":
            xapi.Command.Camera.Preset.Activate({ PresetId: 1 })
        break
        case "Doi":
            xapi.Command.Camera.Preset.Activate({ PresetId: 2 })
        break
        case "Trei":
            xapi.Command.Camera.Preset.Activate({ PresetId: 3 })
        break
      }
    }
  }
)
