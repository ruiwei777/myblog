
export default function postReducer(state={
    posts: [],
    currentPost: null,
    fetching: false,
    fetched: false,
    error: null,
    adding: false,
    added: false,
    rejected: false
  }, action) {

    switch (action.type) {
      case "FETCH_A_POST_FULFILLED": {
        return {
          ...state,
          currentPost: action.payload,
        }
      }

      case "FETCH_POSTS": {
        return {...state, fetching: true}
      }

      case "FETCH_POSTS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }

      case "FETCH_POSTS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          posts: action.payload.results,
        }
      }

      case "ADD_POST": {
        return {
          ...state,
          adding: true,
          added: false,
          rejected: false
        }
      }

      case "ADD_POST_FULFILLED": {
        //console.log(action.payload)
        return {
          ...state,
          added: true,
          adding: false,
          rejeted:false
        }
      }

      case "ADD_POST_REJECTED": {
        //console.log(action.payload)
        return {
          ...state,
          rejected: true,
          adding: false,
          added: false
        }
      }

      case "UPDATE_POST": {
        // const { id, text } = action.payload
        // const newTweets = [...state.posts]
        // const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
        // newTweets[tweetToUpdate] = action.payload;

        return {
          ...state,
          // posts: newPosts,
        }
      }
      case "DELETE_POST": {
        return {
          ...state,
          // posts: state.posts.filter(tweet => tweet.id !== action.payload),
        }
      }
    }

    return state
}
