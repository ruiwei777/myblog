
export default function portalReducer(state = { shouldPortalMount: false }, action) {

  switch (action.type) {
    case "MOUNT_PORTAL": {
      return {
        ...state,
        ...action.payload
      }
    }

    case "UNMOUNT_PORTAL": {
      return {
        ...state,
        ...action.payload
      }
    }
  }

  return state;
}
