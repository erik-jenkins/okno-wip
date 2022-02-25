import { Button, Card, Colors, Icon, Text } from "@blueprintjs/core";
import { useOkno, Okno } from "./features/okno";

export default function App() {
  const { oknos, createOkno } = useOkno();

  const handleCreateWindowClick = () => {
    createOkno(`wowee`);
  };

  return (
    <div className="App bp4-dark" style={{ background: Colors.DARK_GRAY5 }}>
      <Button onClick={handleCreateWindowClick} intent="primary">
        Create window
      </Button>
      {oknos?.map((okno) => (
        <Okno.Wrapper
          key={okno.id}
          okno={okno}
          as={Card}
          elevation={3}
          style={{ padding: "0" }}
        >
          <Okno.Titlebar
            style={{
              padding: " 0.25rem 0.5rem",
              background: Colors.DARK_GRAY3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div className="title">{okno.title}</div>
            <div className="controls">
              {/* TODO: Okno components to close and minimize window */}
              <Button minimal icon="minus" />
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
