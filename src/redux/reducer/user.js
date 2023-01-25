import ACTION_STRING from "../actions/actionString";

const intialState = {
  dataUser: [],
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
};

const userReducer = (prevState = intialState, { type, payload }) => {
  const { getAllUsers, pending, rejected, fulfilled } = ACTION_STRING;

  switch (type) {
    case getAllUsers + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };

    case getAllUsers + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data,
      };

    case getAllUsers + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        dataUser: payload.data.data,
      };
    default:
      return prevState;
  }
};

export default userReducer;