const OK_CODE = 200;
const KO_CODE = 400;
const BLOCK_CODE = 450;

let remainingAttemps = 3;

export { OK_CODE, KO_CODE, BLOCK_CODE };

export const checkPasscode = async (passcode) => {
  return await fetch(process.env.passCode).then(() => {
    if (passcode === process.env.passCode) {
      return sentOKResponse();
    }
    return sentKOResponse();
  });
};

const sentOKResponse = () => {
  const data = {};

  remainingAttemps = 3;
  data.status = OK_CODE;

  return data;
};

const sentKOResponse = () => {
  const data = {};

  remainingAttemps--;
  data.remainingAttemps = remainingAttemps;

  if (remainingAttemps <= 0) {
    remainingAttemps = 3;
    data.status = BLOCK_CODE;
  } else {
    data.status = KO_CODE;
  }

  return data;
};
