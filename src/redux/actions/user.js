import ACTION_STRING from "./actionString";
import { getAllUsers } from "../../utils/api";

const getAllUsersPending = () => ({
  type: ACTION_STRING.getAllUsers.concat(ACTION_STRING.pending),
});

const getAllUsersRejected = (error) => ({
  type: ACTION_STRING.getAllUsers.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getAllUsersFulfilled = (data) => ({
  type: ACTION_STRING.getAllUsers.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getAllUsersThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getAllUsersPending());
      const result = await getAllUsers();
      dispatch(getAllUsersFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getAllUsersRejected(error));
    }
  };
};

const userAction = {
  getAllUsersThunk,
};

export default userAction;
