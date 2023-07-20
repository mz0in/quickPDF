/**
 * Convert Unicode text to Chanakya encoding
 * @param inputString The input Unicode string
 * @returns The Chanakya encoded string
 */
export function convertUnicodeToChanakya(inputString: string): string {
  /** List of Unicode characters */
  const array_one = ["\‘", "\’", "\“", "\”", " \'", "\' ", "\'", "ं", "ऑ", "क्ष्", "क्ष", "त्र", "ज्ञ", "् ", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़्", "फ़", "य़", "ऱ", "ऩ", "क्च", "ष्ठ", "श्व", "स्न", "त्र", "॥", "ढ्ढ", "छ्व", "रु", "रू", "हृ", "ह्र", "क्क", "क्त", "क्र", "ञ्ज", "ङ्क", "ङ्ख", "ङ्ग", "ङ्घ", "ट्ट", "ट्ठ", "क्व", "ड्ड", "ड्ढ", "स्र", "द्ग", "द्घ", "द्द", "द्ध", "द्ब", "द्भ", "द्म", "द्य", "द्व", "ठ्ठ", "श्च", "ह्न", "ह्म्", "ह्य", "ह्ल", "ह्व", "त्त", "त्त्", "प्त", "त्न", "ञ्च", "ल्ल", "ष्ट्व", "ङ्क्ष", "ख्न", "द्ब्र", "ख्र", "ष्ट्र", "ष्ट", "ह्न", "ह्व", "द्द", "श्र्", "श्र", "ट्र", "ड्र", "ढ्र", "।", "्र", "शृ", "शॄ", "कॢ", "ह्ण", "ओ", "औ", "आ", "अ", "ईं", "ई", "इ", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ऐ", "ए", "के", "कै", "फे", "फै", "क्", "क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ", "च्च्", "च्", "च", "छ", "ज्ज्", "ज्", "ज", "झ्", "झ", "ञ्", "ञ", "ट", "ठ", "ड", "ढ", "ण्", "ण", "त्", "त", "थ्", "थ", "द", "ध्", "ध", "न्न्", "न्न", "न्", "न", "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म", "य्", "य", "र", "ल्", "ल", "ळ", "व्", "व", "श्", "श", "ष्", "ष", "स्", "स", "ह्", "ह", "्य", "x", "ॉ", "ा", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "े", "ै", "ो", "ौ", "ं", "ं", "ँ", "ः", ':', "़", "ॅ", "ऽ", "्", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  /** Corresponding `array_one` Chanakya encoding characters */
  const array_two = ["Ò", "Ó", "\"", "\"", " Ò", "Ó ", "Ó", "´", "¥æò", "ÿ", "ÿæ", "˜æ", "™æ", "÷ ", "·¸¤", "¹¸", "»¸", "Ê", "Á¸", "Ç¸", "É¸", "�¸", "È¸", "Ø¸", "Ú¸", "Ù¸", "B¤", "D", "E", "F", "G", "H", "I", "J", "L¤", "M¤", "N", "O", "P¤", "Q¤", "R¤", "T", "V", "W", "X", "Y", "^", "_", "`¤", "a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "žæ", "ž", "#", "%", "@", "„", "¦", "¨", "¯", "µ", "º", "Cþ", "C", "q", "u", "g", "Ÿ", "Ÿæ", "Åþ", "Çþ", "Éþ", "Ð", "ý", "oë", "oì", "•í", "ö", "¥ô", "¥õ", "¥æ", "¥", "§Z", "§ü", "§", "©", "ª¤", "«", "¬", "­", "°ð", "°", "·Ô¤", "·ñ¤", "ÈÔ¤", "Èñ¤", "€U", "·¤", "�", "¹", "\‚", "\»", "ƒ", "ƒæ", "¾", "“", "‘", "¿", "À", "”", "’", "Á", "Û", "Ûæ", "†", "†æ", "ÅU", "Æ", "Ç", "É", "‡", "‡æ", "ˆ", "Ì", "‰", "Í", "Î", "Š", "Ï", "ó", "óæ", "‹", "Ù", "Œ", "Â", "�", "È", "Ž", "Õ", "�", "Ö", "�", "×", "Ä", "Ø", "ÚU", "Ë", "Ü", "Ý", "Ã", "ß", "à", "àæ", "c", "á", "S", "â", "±", "ã", "K", "&", "æò", "æ", "è", "é", "ê", "ë", "ì", "í", "ð", "ñ", "ô", "õ", "¢", "´", "¡", "Ñ", "Ñ", "¸", "ò", "ù", "÷", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "®", "v", "w", "x", "y", "z", "\{", "|", "\}", "~"];

  // Check if both arrays have equal lengths
  const array_one_length = array_one.length;
  const array_two_length = array_two.length;
  if (array_one_length !== array_two_length)
    throw new Error("Error: The arrays are not of equal length.");

  let modified_substring = inputString;
  replaceSymbols();
  const processed_text = modified_substring;
  return processed_text;

  // Replace Unicode characters with corresponding Chanakya encoding characters
  function replaceSymbols() {
    if (modified_substring) {
      // Handle special cases of characters with 'ि'
      let position_of_f = modified_substring.indexOf("ि");
      while (position_of_f !== -1) {
        // Handle 'विद्वेष' case
        // Replace character_left_to_f + "ि" with "d" + character_left_to_f
        const character_left_to_f = modified_substring.charAt(position_of_f - 1);
        modified_substring = modified_substring.replace(character_left_to_f + "ि", "d" + character_left_to_f);
        position_of_f = position_of_f - 1;
        // Handle multiple '्' before 'ि'
        while (modified_substring.charAt(position_of_f - 1) === "्" && position_of_f !== 0) {
          const string_to_be_replaced = modified_substring.charAt(position_of_f - 2) + "्";
          modified_substring = modified_substring.replace(string_to_be_replaced + "d", "d" + string_to_be_replaced);
          position_of_f = position_of_f - 2;
        }
        position_of_f = modified_substring.indexOf("ि", position_of_f + 1);
      }

      // Replace special combinations with unique Chanakya characters
      modified_substring = modified_substring.replace(/श्र्/g, 'ß');
      modified_substring = modified_substring.replace(/त्र्/g, 'Â');
      const set_of_matras = "ािीुूृेैोौं:ँॅ";
      modified_substring += '  ';
      // Handle 'र्' combinations
      let position_of_half_R = modified_substring.indexOf("र्");
      while (position_of_half_R > 0) {
        // Find the probable position of 'Z'
        let probable_position_of_Z;
        if (modified_substring.charAt(position_of_half_R + 3) !== '्')
          probable_position_of_Z = position_of_half_R + 3;
        else {
          if (modified_substring.charAt(position_of_half_R + 5) !== '्')
            probable_position_of_Z = position_of_half_R + 5;
          else
            probable_position_of_Z = position_of_half_R + 7;
        }
        // Handle matras after 'र्'
        let character_right_to_probable_position_of_Z = modified_substring.charAt(probable_position_of_Z + 0);
        while (set_of_matras.includes(character_right_to_probable_position_of_Z)) {
          probable_position_of_Z = probable_position_of_Z + 1;
          character_right_to_probable_position_of_Z = modified_substring.charAt(probable_position_of_Z + 1);
        }
        // Replace 'र्' + string_to_be_replaced with string_to_be_replaced + 'Ê'
        const string_to_be_replaced = modified_substring.substr(position_of_half_R + 2, (probable_position_of_Z - position_of_half_R - 2));
        modified_substring = modified_substring.replace("र्" + string_to_be_replaced, string_to_be_replaced + "Ê");
        position_of_half_R = modified_substring.indexOf("र्");
      }

      // Remove extra characters added for processing
      modified_substring = modified_substring.slice(0, -2);
      // Replace Unicode characters with corresponding Chanakya encoding characters
      for (let input_symbol_idx = 0; input_symbol_idx < array_one_length; input_symbol_idx++) {
        let idx = 0;
        while (idx !== -1) {
          modified_substring = modified_substring.replace(array_one[input_symbol_idx], array_two[input_symbol_idx]);
          idx = modified_substring.indexOf(array_one[input_symbol_idx]);
        }
      }

       // Replace special combinations
      modified_substring = modified_substring.replace(/È¸ý/g, "Èý¸¤");
      modified_substring = modified_substring.replace(/d/g, "ç");
      modified_substring = modified_substring.replace(/„/g, "ËÜ");
    }
  }
}