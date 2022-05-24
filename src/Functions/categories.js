import {doc, getFirestore} from "firebase/firestore";

export const arrChanges = (dataCategory) => {

    const name = dataCategory.name;
    const value = Number(dataCategory.value);

    const arrPlusData = {
        value : value,
        id : new Date().toISOString()
    }

    const db = getFirestore();
    const refCategory = doc(db, 'category', `${name}`);

    return {name, db, refCategory, arrPlusData}

}


export const arrDecrementChange = (dataDeletePlus) => {

    const name = dataDeletePlus.name;
    const value = dataDeletePlus.value;
    const id = dataDeletePlus.id;


    const db = getFirestore();
    const plusRef = doc(db, 'category', `${name}`);

    return {name, value, id, db, plusRef}
}

