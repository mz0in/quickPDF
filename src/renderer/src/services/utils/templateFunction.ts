import { htmlObject } from "@renderer/components/Editor";

function setComponentInLocalStorage(companyName: string, componentName: string, htmlCode: htmlObject[]) {
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
        htmlCode
    };
    localStorage.setItem(companyName, JSON.stringify(companyLocalComponent))
}

export {
    setComponentInLocalStorage
}