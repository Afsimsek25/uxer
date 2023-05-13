import { put, takeEvery, call } from "redux-saga/effects";
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
} from "../actions/folderActions";
import axios from "axios";

const usr = JSON.parse(localStorage.getItem("token"));

const api = {
  listFolders: async (projectId) => {
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Folder/search",
        {
          projectId: projectId,
          asTree: true,
          includeChildren: true,
          includeTests: true,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addFolder: async (folderData) => {
    console.log(folderData);
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Folder",
        folderData,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  editFolder: async (folderId, updatedData) => {
    try {
      const response = await axios.put(
        `https://gateway-test.u-xer.com/api/Folder/${folderId}`,
        {
          name: updatedData,
          description: "",
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteFolder: async (folderId) => {
    console.log(usr.token.accessToken);
    console.log(folderId);
    try {
      await axios.delete(
        `https://gateway-test.u-xer.com/api/Folder/${folderId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

function* listFolderSaga(action) {
  console.log("list : ", action.payload);
  try {
    const folderData = yield call(api.listFolders, action.payload);
    console.log('folder data :',folderData);
    yield put({ type: LIST_FOLDER_SUCCESS, payload: folderData });
  } catch (error) {
    yield put({ type: LIST_FOLDER_FAILED, payload: error.message });
  }
}
function* addFolderSaga(action) {
  try {
    const newFolder = yield call(api.addFolder, action.payload);
    yield put({ type: ADD_FOLDER_SUCCESS, payload: newFolder });
  } catch (error) {
    yield put({ type: ADD_FOLDER_FAILED, payload: error.message });
  }
}
function* editFolderSaga(action) {
  console.log("edit : ", action.payload);
  try {
    const { folderId, updatedData } = action.payload;
    const updatedFolder = yield api.editFolder(folderId, updatedData);
    yield put({
      type: EDIT_FOLDER_SUCCESS,
      payload: { folderId, updatedData: updatedFolder },
    });
    yield put({ type: LIST_FOLDER, payload: action.payload.projectId });
  } catch (error) {
    yield put({ type: EDIT_FOLDER_FAILED, payload: error.message });
  }
}

function* deleteFolderSaga(action) {
  try {
    const folderId = action.payload;
    yield call(api.deleteFolder, folderId);
    yield put({ type: DELETE_FOLDER_SUCCESS, payload: folderId });
  } catch (error) {
    yield put({ type: DELETE_FOLDER_FAILED, payload: error.message });
  }
}

export default function* folderSaga() {
  yield takeEvery(LIST_FOLDER, listFolderSaga);
  yield takeEvery(ADD_FOLDER, addFolderSaga);
  yield takeEvery(EDIT_FOLDER, editFolderSaga);
  yield takeEvery(DELETE_FOLDER, deleteFolderSaga);
}
