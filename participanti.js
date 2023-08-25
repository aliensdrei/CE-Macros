import xapi from "xapi";

let nume = [];
let actpage = 0;

let sysname = "unknown";
xapi.Status.SystemUnit.BroadcastName.get().then(value => (sysname = value));

function displayPage(pagenr) {
  let mesaj = `${pagenr * 5 + 1}.${nume[pagenr * 5]}`;
  for (let i = 1; i < 5; i++) {
    mesaj += nume[pagenr * 5 + i]
      ? `<br>${pagenr * 5 + i + 1}.${nume[pagenr * 5 + i]}`
      : "";
  }
  xapi.Command.UserInterface.Message.TextLine.Display({
    Duration: 30,
    Text: mesaj,
    X: 1000,
    Y: 1000,
  });
}

xapi.Event.UserInterface.Extensions.Panel.Clicked.PanelId.on((guiEvent) => {
  if (guiEvent == "participanti") {
    nume = []
    xapi.Command.Conference.ParticipantList.Search().then((lista) => {
      lista.Participant.forEach((elem) =>
        nume.push(JSON.stringify(elem.DisplayName).slice(1, -1))
      );
      nume = nume.filter((item) => item !== sysname);
      actpage = 0;
      displayPage(actpage);
    });
  }
});

xapi.Event.UserInterface.Extensions.Widget.Action.on((guiEvent) => {
  if (guiEvent.Type == "clicked") {
    if (guiEvent.WidgetId == "dismiss") {
      xapi.Command.UserInterface.Extensions.Panel.Close();
      //      xapi.Command.UserInterface.Message.TextLine.Display({ Text: "", X: 10000, Y: 10000 })
      //      xapi.Command.UserInterface.Message.Alert.Clear();
    }
    if (guiEvent.WidgetId == "pages") {
      if (guiEvent.Value == "increment") {
        if (actpage < nume.length / 5 - 1) {
          actpage++;
          displayPage(actpage);
        }
      }
      if (guiEvent.Value == "decrement") {
        if (actpage > 0) {
          actpage--;
          displayPage(actpage);
        }
      }
    }
  }
});
