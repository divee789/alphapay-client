/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { ReCaptcha } from 'react-recaptcha-google';

interface PropsInterface {
  expiredCallback: Function;
  verifyCallback: Function;
}

declare global {
  interface Window {
    grecaptcha;
  }
}

const RecaptchaComponent = (props: PropsInterface) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let [captcha] = useState() as any;

  useEffect(() => {
    if (captcha) {
      captcha.reset();
    }
  }, [captcha]);

  const onLoadRecaptcha = () => {
    if (captcha) {
      captcha.reset();
    }
  };

  return window.grecaptcha ? (
    <>
      <ReCaptcha
        ref={(el) => {
          captcha = el;
        }}
        size="normal"
        data-theme="dark"
        render="explicit"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        onloadCallback={onLoadRecaptcha}
        expiredCallback={props.expiredCallback}
        verifyCallback={props.verifyCallback}
      />
    </>
  ) : null;
};

export default RecaptchaComponent;
