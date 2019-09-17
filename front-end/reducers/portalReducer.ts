import { PortalAction } from 'root/actions/portalActions';

export const initialState: PortalState = {
  shouldPortalMount: false
};

export interface PortalState {
  shouldPortalMount: boolean;
};


export default function portalReducer(state: PortalState = initialState, action: PortalAction) {

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
