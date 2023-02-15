import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";

function useInterval(callback: () => void, delay: number | false) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === "number") {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => {
      // noop
    };
  }, [delay]);
}

type Color = {
  hex: `#${string}`;
  name: string;
};

const colors: Color[] = [
  {
    name: "purple",
    hex: "#403850",
  },
  {
    name: "blue",
    hex: "#1A4D5A",
  },
  {
    name: "green",
    hex: "#125C4A",
  },
  {
    name: "yellow",
    hex: "#48652E",
  },
  {
    name: "orange",
    hex: "#7F6524",
  },
  {
    name: "red",
    hex: "#AF5D45",
  },
];

const duration = 5000;

export function App() {
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState<number | false>(duration);

  useInterval(() => {
    setIndex((i) => (i + 1) % colors.length);
  }, delay);

  return (
    <Wrapper>
      <h1>Carousel</h1>
      <Carousel>
        <Rail
          style={{
            "--width": `calc(100% * ${colors.length})`,
            "--left": `calc(-100% * ${index / colors.length})`,
          }}
        >
          {colors.map((color) => (
            <Card key={color.name} style={{ "--color": color.hex }} />
          ))}
        </Rail>
      </Carousel>
      <ButtonBar>
        {colors.map((color, i) => (
          <Button
            key={color.name}
            style={{
              "--color": color.hex,
              "--active": i === index ? "2px solid #000" : "none",
            }}
            onClick={() => {
              flushSync(() => {
                setDelay(false);
              });

              setIndex(i);
              setDelay(duration);
            }}
          >
            {color.name}
          </Button>
        ))}
      </ButtonBar>
    </Wrapper>
  );
}

const ButtonBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 8px;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: var(--color, #000);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  outline: var(--active, none);
  cursor: pointer;
`;

const Wrapper = styled.div`
  max-width: 1280px;
  padding: 20px;
  margin: auto;
`;

const Carousel = styled.div`
  overflow: hidden;
  height: 200px;
`;

const Rail = styled.div`
  display: flex;
  transform: translateX(var(--left, 0));
  transition: transform 1s ease-in-out;
  flex-flow: row nowrap;
  height: 100%;
  width: var(--width, 100%);
  align-items: center;
  justify-content: stretch;
`;

const Card = styled.div`
  height: 100%;
  flex: 1;
  background-color: var(--color, #000);
`;
