import { firestore } from 'firebase';
export const getTimeStamp = () => {
    return firestore.FieldValue.serverTimestamp();
};