export type StateLayerToken<T> = {
  color: T;
  opacity: T;
};

export type StateLayerTokens<T> = {
  hovered: StateLayerToken<T>;
  focused: StateLayerToken<T>;
  pressed: StateLayerToken<T>;
};
