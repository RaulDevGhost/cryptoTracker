import ReactNativeBiometrics from 'react-native-biometrics';

const CallCheckBiomatric = async () => {
  const {available} = await ReactNativeBiometrics.isSensorAvailable();
  return available;
};

const CallAuthBiomatric = async () => {
  try {
    const {success} = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Authentication required',
    });
    if (success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('biometrics failed', error);
    return false;
  }
};

const CreateBioAuthKey = async () => {
  try {
    console.info('enter for Sign');
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';
    const {success, signature} = await ReactNativeBiometrics.createSignature({
      promptMessage: 'Authentication required',
      payload: payload,
    });
    if (success) {
      return signature;
    } else {
      return null;
    }
  } catch (error) {
    console.log('biometrics failed', error);
  }
};

export {CallCheckBiomatric, CreateBioAuthKey, CallAuthBiomatric};
