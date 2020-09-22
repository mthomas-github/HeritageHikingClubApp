import firestore from '@react-native-firebase/firestore';

export const activateAccount = async () => {
   /* return new Promise((reslove, reject) => {
    LoginManager
        .logInWithPermissions(['public_profile, email, groups_access_member_info'])
        .then(resp => {
            if(!resp.isCancelled) {
                const request = new GraphRequest(
                    '/me?fields=id,name,groups',
                    null,
                    fbResponseCallback,
                );
                new GraphRequestManager().addRequest(request).start();
            }
        })
        .catch(err => reject(err)); 
    });*/
};


const fbResponseCallback = (error, result) => {
    return new Promise((reslove, reject) => {
        if (error) {
            reject(error);
        } else {
            const inHHC = result.groups.data.some(data => data.id === hhcId);
            const db = firestore()
                .collection('Users')
                .doc(userId);
            db.set({ fbGroups: result.groups.data, isHHC: inHHC }, { merge: true });
            reslove();
        }
    })
}