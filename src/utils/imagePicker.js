export const imagePickerOptions = {
  quality: 0.7,
  allowsEditing: true,
  mediaType: 'photo',
  noData: true,
  storageOptions: {
    skipBackup: true,
    waituntilSaved: true,
    path: 'images',
    cameraRoll: true,
  },
};

export const imagePickerOptionNonSave = {
  quality: 1,
  allowsEditing: true,
  mediaType: 'photo',
  noData: false,
  storageOptions: {
    skipBackup: true,
    waituntilSaved: false,
    path: 'images',
    cameraRoll: true,
  },
};
