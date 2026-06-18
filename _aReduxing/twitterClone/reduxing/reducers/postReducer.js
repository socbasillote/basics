export function postsReducer(state, action) {
  switch (action.type) {
    case "POST_CREATE_START":
      return { ...state, loading: true };

    case "POST_CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };

    case "POST_CREATE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}