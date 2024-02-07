function AlertConfig(type, resetFunc) {
    const alertConfigs = {
        default: {
            isShow: false,
            style: "",
            message: "",
            autoReset: false,
        },
        success: {
            isShow: true,
            style: "success",
            message: "Request processed. Redirecting now.",
            autoReset: 3000,
            resetFunc: resetFunc
            },
        failure: {
            isShow: true,
            style: "danger",
            message: "Failed to process your request!",
            autoReset: false,
        }
    }
    return alertConfigs[type]
}

export default AlertConfig
