import { notification } from 'antd'


const useNotify = config => {
  const { duration = 3, ...restConfig } = { ...config }
  const [api, contextHolder] = notification.useNotification({
    duration,
    ...restConfig,
  })

  const notify = {
    info: ({ message, description, placement = 'top', ...rest }) =>
      api.info({ message: message, description, placement, ...rest }),

    success: ({ message, description, placement = 'top', ...rest }) =>
      api.success({ message: message, description, placement, ...rest }),

    error: ({ message, description, placement = 'top', ...rest }) =>
      api.error({ message: message, description, placement, ...rest }),

    warning: ({ message, description, placement = 'top', ...rest }) =>
      api.warning({ message: message, description, placement, ...rest }),

    destroy: key => api.destroy(key),
  }

  return { notify, contextHolder }
}

export default useNotify
