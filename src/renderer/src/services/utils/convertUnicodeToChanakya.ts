/* eslint-disable prettier/prettier */
/**
 * Converts Unicode text to Chanakya encoding.
 *
 * @param text The Unicode text to be converted to Chanakya encoding.
 * @returns The text converted to Chanakya encoding.
 */
export function convertUnicodeToChanakya(text: string): string {
  /**
   * An array containing Unicode symbols to be replaced.
   * Add the Unicode symbols that need to be converted to Chanakya encoding.
   * Each element in this array corresponds to the Unicode symbol at the same index in `chanakyaSymbols`.
   */
    const unicodeSymbols: string[] = [
      '‘', '’', '“', '”', 'ं', 'ऑ',
      'क्ष्', 'क्ष', 'त्र', 'ज्ञ', '् ',
      'क़', 'ख़', 'ग़', 'ज़्', 'ज़', 'ड़', 'ढ़', 'फ़्', 'फ़', 'य़', 'ऱ', 'ऩ',
      'क्च', 'ष्ट', 'ष्ठ', 'श्व', 'स्न', 'त्र', '॥', 'ढ्ढ', 'छ्व', 'रु', 'रू',
      'हृ', 'ह्र', 'क्क', 'क्त', 'क्र', 'ञ्ज', 'ङ्क', 'ङ्ख', 'ङ्ग', 'ङ्घ', 'ट्ट', 'ट्ठ',
      'क्व', 'ड्ड', 'ड्ढ', 'स्र', 'द्ग', 'द्घ', 'द्द', 'द्ध', 'द्ब', 'द्भ', 'द्म', 'द्य', 'द्व', 'ठ्ठ', 'श्च', 'ह्न', 'ह्म्', 'ह्य', 'ह्ल', 'ह्व',
      'त्त', 'त्त्', 'प्त', 'त्न', 'ञ्च',
      'ल्ल', 'ष्ट्व', 'ङ्क्ष', 'ख्न', 'द्ब्र', 'ख्र',
      'ष्ट्र', 'ह्न', 'ह्व', 'द्द',
      'श्र्', 'श्र', 'ट्र', 'ड्र', 'ढ्र',
      '।', '्र',
      'शृ', 'शॄ', 'कॢ', 'ह्ण',
      'ओ', 'औ', 'आ', 'अ', 'ईं', 'ई', 'इ', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ऐ', 'ए',
      'के', 'कै', 'फे', 'फै',
      'क्', 'क', 'ख्', 'ख', 'ग्', 'ग', 'घ्', 'घ', 'ङ',
      'च्च्', 'च्', 'च', 'छ', 'ज्ज्', 'ज्', 'ज', 'झ्', 'झ', 'ञ्', 'ञ',
      'ट', 'ठ', 'ड', 'ढ', 'ण्', 'ण',
      'त्', 'त', 'थ्', 'थ', 'द', 'ध्', 'ध', 'न्न्', 'न्न', 'न्', 'न',
      'प्', 'प', 'फ्', 'फ', 'ब्', 'ब', 'भ्', 'भ', 'म्', 'म',
      'य्', 'य', 'र', 'ल्', 'ल', 'ळ', 'व्', 'व',
      'श्', 'श', 'ष्', 'ष', 'स्', 'स', 'ह्', 'ह',
      '्य', 'x',
      'ॉ', 'ा', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'े', 'ै', 'ो', 'ौ',
      'ं', 'ं', 'ँ', 'ः', '़', 'ॅ', 'ऽ', '्',
      '०', '१', '२', '३', '४', '५', '६', '७', '८', '९',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
  
    /**
   * An array containing the corresponding Chanakya symbols.
   * Add the corresponding Chanakya symbols for the Unicode symbols in `unicodeSymbols`.
   * Each element in this array corresponds to the Chanakya symbol at the same index in `unicodeSymbols`.
   */
    const chanakyaSymbols: string[] = [
      'Ò', 'Ó', '"', '"', '´', '¥æò',
      'ÿ', 'ÿæ', '˜æ', '™æ', '÷ ',
      '·¸¤', '¹¸', '»¸', 'Ê', 'Á¸', 'Ç¸', 'É¸', '�¸U', 'È¸¤', 'Ø¸', 'Ú¸', 'Ù¸',
      'B¤', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L¤', 'M¤',
      'N', 'O', 'P¤', 'Q¤', 'R¤', 'T', 'V', 'W', 'X', 'Y', '^', '_',
      '`¤', 'a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u',
      'žæ', 'ž', '#', '%', '@',
      '„', '¦', '¨', '¯', 'µ', 'º',
      'Cþ', 'q', 'u', 'g',
      'Ÿ', 'Ÿæ', 'Åþ', 'Çþ', 'Éþ',
      'Ð', 'ý',
      'oë', 'oì', '•í', 'ö',
      '¥ô', '¥õ', '¥æ', '¥', '§Z', '§ü', '§', '©', 'ª¤', '«', '¬', '­', '°ð', '°',
      '·Ô¤', '·ñ¤', 'ÈÔ¤', 'Èñ¤', // '·´¤', 'È´¤',
      '€U', '·¤', '�', '¹', '‚', '»', 'ƒ', 'ƒæ', '¾',
      '“', '‘', '¿', 'À', '”', '’', 'Á', 'Û', 'Ûæ', '†', '†æ',
      'ÅU', 'Æ', 'Ç', 'É', '‡', '‡æ',
      'ˆ', 'Ì', '‰', 'Í', 'Î', 'Š', 'Ï', 'ó', 'óæ', '‹', 'Ù',
      'Œ', 'Â', '�U', 'È¤', 'Ž', 'Õ', '�', 'Ö', '�', '×',
      'Ä', 'Ø', 'ÚU', 'Ë', 'Ü', 'Ý', 'Ã', 'ß',
      'à', 'àæ', 'c', 'á', 'S', 'â', '±', 'ã',
      'K', '&',
      'æò', 'æ', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'ð', 'ñ', 'ô', 'õ',
      '¢', '´', '¡', 'Ñ', '¸', 'ò', 'ù', '÷',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '®', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~'
    ];
  
    // Calculate the length of the arrays for iteration
    const arrayLength = unicodeSymbols.length;
  
    // Create a copy of the input text to modify
    let modifiedText = text;
  
    // Eliminating "र्" and putting reph (ü) at the proper position.
    let positionOfHalfR = modifiedText.indexOf("र्");
    while (positionOfHalfR > 0) {
      // Find the probable position of "्" after "र्"
      let probablePositionOfZ = positionOfHalfR + 2;
      let characterRightToProbablePositionOfZ = modifiedText.charAt(probablePositionOfZ + 1);
      
      // Traverse through consecutive occurrences of "्"
      while (characterRightToProbablePositionOfZ === "्") {
        probablePositionOfZ += 2;
        characterRightToProbablePositionOfZ = modifiedText.charAt(probablePositionOfZ + 1);
      }
  
      // Extract the string to be replaced with reph (ü)
      const stringToBeReplaced = modifiedText.substr(positionOfHalfR + 2, probablePositionOfZ - positionOfHalfR - 1);

      // Replace "र्" and the string with reph (ü)
      modifiedText = modifiedText.replace("र्" + stringToBeReplaced, stringToBeReplaced + "ü");
      
      // Find the next occurrence of "र्"
      positionOfHalfR = modifiedText.indexOf("र्");
    }
  
    // Substitute Chanakya symbols in place of Unicode symbols
    for (let i = 0; i < arrayLength; i++) {
      let index = 0;
      while (index !== -1) {
        // Replace the Unicode symbol with the corresponding Chanakya symbol
        modifiedText = modifiedText.replace(new RegExp(unicodeSymbols[i], 'g'), chanakyaSymbols[i]);
        index = modifiedText.indexOf(unicodeSymbols[i]);
      }
    }
  
    return modifiedText;
  }