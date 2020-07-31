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
