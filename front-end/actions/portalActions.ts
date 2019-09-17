
export interface PortalAction {
  type: string;
  payload: {
    shouldPortalMount: boolean;
  }
}

export const mountPortal = (): PortalAction => ({
  type: 'MOUNT_PORTAL',
  payload: {
    shouldPortalMount: true
  }
});

export const unmountPortal = (): PortalAction => ({
  type: 'UNMOUNT_PORTAL',
  payload: {
    shouldPortalMount: false
  }
});
