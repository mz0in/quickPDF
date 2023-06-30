import { htmlObject } from "@renderer/components/Editor";
import { fireStore } from '@renderer/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface Info {
    title: string,  // name of component
    height: number,
    width: number
}

async function setComponentInLocalStorage(companyName: string, info: Info, htmlCode: htmlObject[]) {
    let companyLocalComponent = {};
    const layoutCode = {
        info: {
            height: info.height,
            width: info.width
        },
        ...htmlCode[0]
    }
    /**
     * data strature
     * companyName: htmlObject;
     */
    let localData = localStorage.getItem(companyName);
    if(localData != null){
        companyLocalComponent = JSON.parse(localData);
    }
    companyLocalComponent[info.title] = layoutCode;
    localStorage.setItem(companyName, JSON.stringify(companyLocalComponent))

    // setting in firebase
    const paperRef = doc(fireStore, "papers", companyName);
    await updateDoc(paperRef, {
        [`layouts.${info.title}`]: layoutCode
    });
}

export {
    setComponentInLocalStorage
}