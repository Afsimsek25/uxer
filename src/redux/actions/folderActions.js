// folderActions.js

export const LIST_FOLDER = "LIST_FOLDER";
export const LIST_FOLDER_SUCCESS = "LIST_FOLDER_SUCCESS";
export const LIST_FOLDER_FAILED = "LIST_FOLDER_FAILED";

export const ADD_FOLDER = "ADD_FOLDER";
export const ADD_FOLDER_SUCCESS = "ADD_FOLDER_SUCCESS";
export const ADD_FOLDER_FAILED = "ADD_FOLDER_FAILED";

export const EDIT_FOLDER = "EDIT_FOLDER";
export const EDIT_FOLDER_SUCCESS = "EDIT_FOLDER_SUCCESS";
export const EDIT_FOLDER_FAILED = "EDIT_FOLDER_FAILED";

export const DELETE_FOLDER = "DELETE_FOLDER";
export const DELETE_FOLDER_SUCCESS = "DELETE_FOLDER_SUCCESS";
export const DELETE_FOLDER_FAILED = "DELETE_FOLDER_FAILED";

export const SELECTED_FOLDER_ID = "SELECTED_FOLDER_ID";

export const selectedFolder = (folderId) => ({
  type: SELECTED_FOLDER_ID,
  payload: folderId,
});
export const listFolder = (id) => ({
  type: LIST_FOLDER,
  payload: id,
});

export const listFolderSuccess = (data) => ({
  type: LIST_FOLDER_SUCCESS,
  payload: data,
});

export const listFolderFailed = (error) => ({
  type: LIST_FOLDER_FAILED,
  payload: error,
});

export const addFolder = (folderData) => ({
  type: ADD_FOLDER,
  payload: folderData,
});

export const addFolderSuccess = (folderData) => ({
  type: ADD_FOLDER_SUCCESS,
  payload: folderData,
});

export const addFolderFailed = (error) => ({
  type: ADD_FOLDER_FAILED,
  payload: error,
});

export const editFolder = (folderId, updatedData,projectId) => ({
  type: EDIT_FOLDER,
  payload: {
    folderId,
    updatedData,
    projectId,
  },
});

export const editFolderSuccess = (folderId, updatedData) => ({
  type: EDIT_FOLDER_SUCCESS,
  payload: {
    folderId,
    updatedData,
  },
});

export const editFolderFailed = (error) => ({
  type: EDIT_FOLDER_FAILED,
  payload: error,
});

export const deleteFolder = (folderId) => ({
  type: DELETE_FOLDER,
  payload: folderId,
});

export const deleteFolderSuccess = (folderId) => ({
  type: DELETE_FOLDER_SUCCESS,
  payload: folderId,
});

export const deleteFolderFailed = (error) => ({
  type: DELETE_FOLDER_FAILED,
  payload: error,
});
