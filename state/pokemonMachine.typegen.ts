// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]': {
      type: 'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.pokemon-machine.Loading Pokemons:invocation[0]': {
      type: 'error.platform.pokemon-machine.Loading Pokemons:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    loadPokemons: 'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignErrorToContext: 'error.platform.pokemon-machine.Loading Pokemons:invocation[0]';
    assignPokemonsToContext: 'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]';
    togglePokemonInFavorite: 'toggleFavorite';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    loadPokemons: 'loadMore' | 'xstate.init';
  };
  matchesStates: 'Loading Pokemons' | 'Loading Pokemons failed' | 'Pokemons loaded';
  tags: never;
}

// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]': {
      type: 'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.pokemon-machine.Loading Pokemons:invocation[0]': {
      type: 'error.platform.pokemon-machine.Loading Pokemons:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    loadPokemons: 'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignErrorToContext: 'error.platform.pokemon-machine.Loading Pokemons:invocation[0]';
    assignPokemonsToContext: 'done.invoke.pokemon-machine.Loading Pokemons:invocation[0]';
    togglePokemonInFavorite: 'toggleFavorite';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    loadPokemons: 'loadMore' | 'xstate.init';
  };
  matchesStates: 'Loading Pokemons' | 'Loading Pokemons failed' | 'Pokemons loaded';
  tags: never;
}
