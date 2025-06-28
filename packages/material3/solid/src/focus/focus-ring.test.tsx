import {
  it,
  describe,
  vi,
  expect,
  beforeEach,
  afterAll,
  afterEach,
} from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, fireEvent } from "@solidjs/testing-library";
import { FocusRing, FocusRingTheme } from "./focus-ring";
import clsx from "clsx";

const user = userEvent.setup();

describe("Focus ring", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.clearAllTimers();
  });
  it("control", async () => {
    let ref!: HTMLButtonElement;
    const { getByTestId, getByRole } = render(() => (
      <FocusRingTheme
        classNames={{
          host: ({ isVisible, placement }) => {
            return clsx(
              "focus-ring",
              isVisible && "focus-ring--visible",
              placement === "outward" && "focus-ring--outward",
              placement === "inward" && "focus-ring--inward",
            );
          },
        }}
      >
        <button data-testid="control" />
        <FocusRing for={() => ref} data-testid="focus-ring" />
      </FocusRingTheme>
    ));
    const button = getByRole("button");
    const focusRing = getByTestId("focus-ring");
    expect(focusRing).toHaveClass("focus-ring");
    fireEvent.focusIn(button);
    await Promise.resolve();
    expect(focusRing).toHaveClass("focus-ring--visible");
  });
  it("aria-hidden", async () => {
    const { getByTestId } = render(() => (
      <FocusRing data-testid="focus-ring" />
    ));
    const focusRing = getByTestId("focus-ring");
    expect(focusRing).toHaveAttribute("aria-hidden", "true");
  });
});
