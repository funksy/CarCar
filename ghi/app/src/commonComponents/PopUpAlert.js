import { useEffect, useState } from "react";

function PopUpAlert({ config }) {

  const [alert, setAlert] = useState(config);

  useEffect(() => {

    setAlert(config);

    if (config.autoReset){
      setTimeout(config.resetFunc, config.autoReset, config.defaultConfig)
    }

  }, [config]);

  return (
    <>
      {alert.isShow && (
        <div className={`alert alert-${alert.style}`} role="alert">
          {alert.message}
        </div>
      )}
    </>
  );
}
export default PopUpAlert;
