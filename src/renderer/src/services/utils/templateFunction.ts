import { htmlObject } from "@renderer/components/Editor";
import { fireStore } from '@renderer/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

async function setComponentInLocalStorage(companyName: string, componentName: string, htmlCode: htmlObject[]) {
    let companyLocalComponent = {};
    /**
     * data strature
     * companyName: htmlObject;
     */
    let localData = localStorage.getItem(companyName);
    if(localData != null){
        companyLocalComponent = JSON.parse(localData);
    }
    companyLocalComponent[componentName] = {
        ...htmlCode[0]
    };
    localStorage.setItem(companyName, JSON.stringify(companyLocalComponent))

    // setting in firebase
    const paperRef = doc(fireStore, "papers", companyName);
    await updateDoc(paperRef, {
        [`layouts.${componentName}`]: {
            ...htmlCode[0]
        }
    });
}

export {
    setComponentInLocalStorage
}