import { pipe } from "@mon-utils/index";

type FormMixins = typeof withEmailValidation;

export const withEmailValidation = (o: any) => {
  return {
    ...o,
    hasValidEmail: false,
    checkEmailValidity() {
      const MAX_LENGTH = 320;
      const VALID_EMAIL_REGEX = new RegExp(
        `^(?=.{1,${MAX_LENGTH}}$)\\S+@\\S+\\.\\S+$`,
      );
      this.hasValidEmail = VALID_EMAIL_REGEX.test(o.email);
      return this;
    },
  };
};

export const withUsernameValidation = (o: any) => {
  return {
    ...o,
    checkUsernameValidity() {
      const MIN_LENGTH = 4;
      const MAX_LENGTH = 40;
      const VALID_USERNAME_REGEX = new RegExp(
        `^(?=.{${MIN_LENGTH},${MAX_LENGTH}}$)[A-Za-z0-9_-]+$`,
      );
      this.hasValidUsername = VALID_USERNAME_REGEX.test(o.username);
      return this;
    },
  };
};

const createForm = <F>(
  mixins: Array<FormMixins>,
  startingObject: Partial<F>,
): F => pipe(...mixins)(startingObject);

export default createForm;
