// folderReducer.js

import {
  LIST_FOLDER,
  LIST_FOLDER_SUCCESS,
  LIST_FOLDER_FAILED,
  ADD_FOLDER,
  ADD_FOLDER_SUCCESS,
  ADD_FOLDER_FAILED,
  EDIT_FOLDER,
  EDIT_FOLDER_SUCCESS,
  EDIT_FOLDER_FAILED,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAILED,
  SELECTED_FOLDER_ID,
} from "../actions/folderActions";

const initialState = {
  folders: [],
  loading: false,
  error: null,
  selectedFolderId: null,
};

const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_FOLDER:
    case ADD_FOLDER:
    case EDIT_FOLDER:
    case DELETE_FOLDER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LIST_FOLDER_SUCCESS:
      return {
        ...state,
        folders: action.payload,
        loading: false,
        error: null,
      };

    case ADD_FOLDER_SUCCESS:
      return {
        ...state,
        folders: [...state.folders, action.payload],
        loading: false,
        error: null,
      };

    case EDIT_FOLDER_SUCCESS:
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.folderId
            ? action.payload.updatedData
            : folder
        ),
        loading: false,
        error: null,
      };

    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== action.payload),
        loading: false,
        error: null,
      };

    case SELECTED_FOLDER_ID:
      return {
        ...state,
        selectedFolderId: action.payload,
      };

    case LIST_FOLDER_FAILED:
    case ADD_FOLDER_FAILED:
    case EDIT_FOLDER_FAILED:
    case DELETE_FOLDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default folderReducer;
