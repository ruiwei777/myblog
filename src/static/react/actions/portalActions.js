export function mountPortal(){
  return dispatch => dispatch({
    type: 'MOUNT_PORTAL',
    payload: {
      shouldPortalMount: true
    }
  })
}

export function unmountPortal(){
  return dispatch => dispatch({
    type: 'UNMOUNT_PORTAL',
    payload: {
      shouldPortalMount: false
    }
  })
}