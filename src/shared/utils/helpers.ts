export const isValidNumber = (number: any) => {
  if (isNaN(Number(number))) {
    return {
      isValid: false,
      reason: "Please provide a valid number",
    };
  }

  return { isValid: true };
};
export const cleanObject = function (obj: any, args: any) {
  for (var propName in obj) {
    if (args.includes(obj[propName])) {
      delete obj[propName];
    }
  }
  return obj;
};
export const isValidPhoneNumber = (phoneNumber: number) => {
  const { isValid, reason } = isValidNumber(phoneNumber);

  if (!isValid)
    return {
      isValid: false,
      reason,
    };

  if (String(phoneNumber).length !== 10) {
    return {
      isValid: false,
      reason: "Please provide a 10 digit number",
    };
  }

  return { isValid: true };
};
export const antDesignValidator = {
  number: {
    validator: async (_: any, value: any) => {
      if (isNaN(Number(value))) {
        return Promise.reject("Please provide a number");
      }

      return Promise.resolve();
    },
  },
  positiveNumber: {
    validator: async (_: any, value: any) => {
      await antDesignValidator.number.validator(_, value);
      if (value < 0) {
        return Promise.reject("Please provide a positive number");
      }
      return Promise.resolve();
    },
  },
  phoneNumber: {
    validator: async (_: any, value: any) => {
      if (!value) return Promise.resolve();

      const { isValid, reason } = isValidPhoneNumber(value);
      if (isValid) return Promise.resolve();

      return Promise.reject(new Error(reason));
    },
  },
  pincode: {
    validator: async (_: any, value: any) => {
      if (!value) return Promise.resolve();

      const { isValid, reason } = isValidNumber(value);

      if (isValid) {
        if (String(value).length !== 6) {
          throw new Error("Pincode must be of 6 digits");
        }
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(reason));
      }
    },
  },
};
