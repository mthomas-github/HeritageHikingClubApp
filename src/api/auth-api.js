import auth from '@react-native-firebase/auth';

export const registerEmailAndPassword = async (email, password) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => resolve(res))
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            return reject('E-mail already in use.');
          case 'auth/invalid-email':
            return reject('Invalid e-mail address format.');
          case 'auth/weak-password':
            return reject('Password is too weak.');
          case 'auth/too-many-requests':
            return reject('Too many request. Try again in a minute.');
          default:
            return reject('Check your internet connection.');
        }
      })
      .done();
  });
};

export const logoutUser = async ({}) => {
  await auth()
    .signOut()
    .catch(err => console.log('There was issue: ', err));
};

export const loginUser = async ({email, password}) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            return reject('Invalid email address format.');
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            return reject('Invalid email address or password.');
          case 'auth/too-many-requests':
            return reject('Too many request. Try again in a minute.');
          default:
            return reject('Check your internet connection.');
        }
      });
  });
};

export const sendEmailWithPassword = async email => {
  return new Promise((reslove, reject) => {
    auth()
      .sendPasswordResetEmail(email)
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            return reject('Invalid email address format.');
          case 'auth/user-not-found':
            return reject('User with this email does not exist.');
          case 'auth/too-many-requests':
            return reject('Too many request. Try again in a minute.');
          default:
            return reject('Check your internet connection.');
        }
      });
  });
};

export const deleteUser = () => {
  const user = auth().currentUser;
  user
    .delete()
    .then(() => {})
    .catch(error => console.log(error));
};
