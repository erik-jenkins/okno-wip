import { Button, Card, Colors, Icon, Text } from "@blueprintjs/core";
import { useOkno, Okno } from "./features/okno";

export default function App() {
  const { getVisibleOknos, getHiddenOknos, createOkno } = useOkno();

  const handleCreateWindowClick = () => {
    createOkno(`wowee`);
  };

  return (
    <div
      className="App bp4-dark"
      style={{
        background: Colors.DARK_GRAY5,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Okno.Bounds style={{ border: `1px dashed ${Colors.GRAY1}` }}>
          <Button onClick={handleCreateWindowClick} intent="primary">
            Create window
          </Button>
        </Okno.Bounds>
      </main>

      <footer
        style={{
          width: "100vw",
          minHeight: "3.5rem",
          padding: "0.5rem",
          boxSizing: "border-box",
          background: Colors.DARK_GRAY4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div
          className="window-list"
          style={{
            flexGrow: 1,
            flexWrap: "wrap",
            display: "flex",
            gap: "0.25rem"
          }}
        >
          {getHiddenOknos().map((okno) => (
            <Okno.ShowButton
              key={okno.id}
              id={okno.id}
              as={Button}
              text={okno.id}
              rightIcon="arrow-top-right"
            />
          ))}
        </div>
        <div className="controls">controls</div>
      </footer>
      {getVisibleOknos().map((okno) => (
        <Okno.Wrapper
          key={okno.id}
          okno={okno}
          as={Card}
          elevation={3}
          style={{ padding: "0" }}
        >
          <Okno.Titlebar
            style={{
              padding: "0.25rem 0.5rem",
              background: Colors.DARK_GRAY3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div className="title" style={{ minWidth: "20px" }}>
              <Text ellipsize>{okno.id}</Text>
            </div>
            <div className="controls" style={{ display: "flex" }}>
              <Okno.HideButton as={Button} minimal icon="minus" />
              <Button minimal icon="maximize" />
              <Okno.CloseButton as={Button} minimal icon="cross" />
            </div>
          </Okno.Titlebar>
          <Okno.Content style={{ padding: "1rem" }}>
            <Text className="bp4-running-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
              facere error reiciendis est iste sed quibusdam nemo neque optio
              ducimus, laborum itaque voluptatem quae ea tempore, animi
              consequatur porro veniam.
            </Text>
          </Okno.Content>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "0.25rem"
            }}
          >
            <Okno.ResizeHandle
              as={Icon}
              size={16}
              icon="arrow-bottom-right"
              style={{ color: Colors.GRAY3 }}
            />
          </div>
        </Okno.Wrapper>
      ))}
    </div>
  );
}
