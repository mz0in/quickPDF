export const storageIDB = 'indexeddb',
  storageRemote = 'rest-api',
  storageFireStore = 'firestore',
  helpers = {
    currentName: 'Default',
    currentId: 'uuidv4',
    currentThumbnail: '',
    isTemplate: false,
    description: 'No description',

    setId(id) {
      this.currentId = id
    },

    setName(name) {
      this.currentName = name
    }
  }
