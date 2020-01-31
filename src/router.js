import qs from 'qs';

function routerUrlReducer(state, [key, value]) {
  if (key === 'query' && value) {
    return {
      ...state,
      query: encodeURIComponent(value),
    };
  }

  return state;
}

export function getUrlFromState(state) {
  const queryParameters = Object.entries(state).reduce(routerUrlReducer, {});
  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    encode: false,
  });

  return `/${queryString}`;
}

function routerStateReducer(state, [key, value]) {
  if (key === 'query' && value) {
    return {
      ...state,
      query: decodeURIComponent(value),
    };
  }

  return state;
}

export function getStateFromUrl(url) {
  const cleanUrl = url.charAt(0) === '/' ? url.slice(1) : url;
  const rawState = qs.parse(cleanUrl, {
    arrayLimit: 1000,
    ignoreQueryPrefix: true,
  });
  const state = Object.entries(rawState).reduce(routerStateReducer, {});

  return state;
}
