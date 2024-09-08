import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Types/index";

const initialState: User = {
  _id: "",
  name: "",
  email: "",
  image: "",
  contact: "",
  dob: "",
  address: "",
  gender: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { name, email, address, contact, image, dob, role, gender, _id } =
        action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.address = address;
      state.contact = contact;
      state.image = image;
      state.dob = dob;
      state.role = role;
      state.gender = gender;
    },
    clearUser(state) {
      state._id = "";
      state.name = "";
      state.email = "";
      state.image = "";
      state.contact = "";
      state.dob = "";
      state.address = "";
      state.gender = "";
      state.role = "";
    },
  },
  // extraReducers: (builder) => {},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
