export function convert_Unicode_to_Chanakya(unicodeText: string): string {
  // eslint-disable-next-line prettier/prettier
  const array_one = ["‘", "’", "“", "”", "ं", "ऑ", "क्ष्", "क्ष", "त्र", "ज्ञ", "् ", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़्", "फ़", "य़", "ऱ", "ऩ", "क्च", "ष्ट", "ष्ठ", "श्व", "स्न", "त्र", "॥", "ढ्ढ", "छ्व", "रु", "रू", "हृ", "ह्र", "क्क", "क्त", "क्र", "ञ्ज", "ङ्क", "ङ्ख", "ङ्ग", "ङ्घ", "ट्ट", "ट्ठ", "क्व", "ड्ड", "ड्ढ", "स्र", "द्ग", "द्घ", "द्द", "द्ध", "द्ब", "द्भ", "द्म", "द्य", "द्व", "ठ्ठ", "श्च", "ह्न", "ह्म्", "ह्य", "ह्ल", "ह्व", "त्त", "त्त्", "प्त", "त्न", "ञ्च", "ल्ल", "ष्ट्व", "ङ्क्ष", "ख्न", "द्ब्र", "ख्र", "ष्ट्र", "ह्न", "ह्व", "द्द", "श्र्", "श्र", "ट्र", "ड्र", "ढ्र", "।", "्र", "शृ", "शॄ", "कॢ", "ह्ण", "ओ", "औ", "आ", "अ", "ईं", "ई", "इ", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ऐ", "ए", "के", "कै", "फे", "फै", "क्", "क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ", "च्च्", "च्", "च", "छ", "ज्ज्", "ज्", "ज", "झ्", "झ", "ञ्", "ञ", "ट", "ठ", "ड", "ढ", "ण्", "ण", "त्", "त", "थ्", "थ", "द", "ध्", "ध", "न्न्", "न्न", "न्", "न", "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म", "य्", "य", "र", "ल्", "ल", "ळ", "व्", "व", "श्", "श", "ष्", "ष", "स्", "स", "ह्", "ह", "्य", "x", "ॉ", "ा", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "े", "ै", "ो", "ौ", "ं", "ं", "ँ", "ः", "़", "ॅ", "ऽ", "्", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  // eslint-disable-next-line prettier/prettier
  const array_two = ["Ò", "Ó", "\"", "\"", "´", "¥æò", "ÿ", "ÿæ", "˜æ", "™æ", "÷ ", "·¸¤", "¹¸", "»¸", "Ê", "Á¸", "Ç¸", "É¸", "¸U", "È¸¤", "Ø¸", "Ú¸", "Ù¸", "B¤", "C", "D", "E", "F", "G", "H", "I", "J", "L¤", "M¤", "N", "O", "P¤", "Q¤", "R¤", "T", "V", "W", "X", "Y", "^", "_", "`¤", "a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "žæ", "ž", "#", "%", "@", "„", "¦", "¨", "¯", "µ", "º", "Cþ", "q", "u", "g", "Ÿ", "Ÿæ", "Åþ", "Çþ", "Éþ", "Ð", "ý", "oë", "oì", "•í", "ö", "¥ô", "¥õ", "¥æ", "¥", "§Z", "§ü", "§", "©", "ª¤", "«", "¬", "­", "°ð", "°", "·Ô¤", "·ñ¤", "ÈÔ¤", "Èñ¤", "€U", "·¤", "", "¹", "‚", "»", "ƒ", "ƒæ", "¾", "“", "‘", "¿", "À", "”", "’", "Á", "Û", "Ûæ", "†", "†æ", "ÅU", "Æ", "Ç", "É", "‡", "‡æ", "ˆ", "Ì", "‰", "Í", "Î", "Š", "Ï", "ó", "óæ", "‹", "Ù", "Œ", "Â", "U", "È¤", "Ž", "Õ", "", "Ö", "", "×", "Ä", "Ø", "ÚU", "Ë", "Ü", "Ý", "Ã", "ß", "à", "àæ", "c", "á", "S", "â", "±", "ã", "K", "&", "æò", "æ", "è", "é", "ê", "ë", "ì", "í", "ð", "ñ", "ô", "õ", "¢", "´", "¡", "Ñ", "¸", "ò", "ù", "÷", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "®", "v", "w", "x", "y", "z", "{", "|", "}", "~"]

  const array_one_length = array_one.length

  // if the input is plain text
  let modified_substring = unicodeText
  //****************************************************************************************
  //  Break the long text into small bunches of max. max_text_size  characters each.
  //****************************************************************************************
  const text_size = unicodeText.length

  let processed_text = '' //blank

  let sthiti1 = 0
  let sthiti2 = 0
  let chale_chalo = 1

  // var max_text_size = chunksize;

  const max_text_size = 6000

  // alert(max_text_size);

  while (chale_chalo == 1) {
    sthiti1 = sthiti2

    if (sthiti2 < text_size - max_text_size) {
      sthiti2 += max_text_size
      while (unicodeText.charAt(sthiti2) != ' ') {
        sthiti2--
      }
    } else {
      sthiti2 = text_size
      chale_chalo = 0
    }

    modified_substring = unicodeText.substring(sthiti1, sthiti2)

    if (modified_substring != '') {
      // first replace the two-byte nukta_varNa with corresponding one-byte nukta varNas.

      modified_substring = modified_substring.replace(/क़/g, 'क़')
      modified_substring = modified_substring.replace(/ख़‌/g, 'ख़')
      modified_substring = modified_substring.replace(/ग़/g, 'ग़')
      modified_substring = modified_substring.replace(/ज़्/g, 'ज़्')
      modified_substring = modified_substring.replace(/ज़/g, 'ज़')
      modified_substring = modified_substring.replace(/ड़/g, 'ड़')
      modified_substring = modified_substring.replace(/ढ़/g, 'ढ़')
      modified_substring = modified_substring.replace(/ऩ/g, 'ऩ')
      modified_substring = modified_substring.replace(/फ़/g, 'फ़')
      modified_substring = modified_substring.replace(/य़/g, 'य़')
      modified_substring = modified_substring.replace(/ऱ/g, 'ऱ')

      // code for replacing "ि" (chhotee ee kii maatraa) with "ç"  and correcting its position too.

      let position_of_f = modified_substring.indexOf('ि')
      while (position_of_f != -1) {
        //while-02
        const character_left_to_f = modified_substring.charAt(position_of_f - 1)
        modified_substring = modified_substring.replace(
          character_left_to_f + 'ि',
          'ç' + character_left_to_f
        )

        position_of_f = position_of_f - 1

        while (modified_substring.charAt(position_of_f - 1) == '्' && position_of_f != 0) {
          const string_to_be_replaced = modified_substring.charAt(position_of_f - 2) + '्'
          modified_substring = modified_substring.replace(
            string_to_be_replaced + 'ç',
            'ç' + string_to_be_replaced
          )

          position_of_f = position_of_f - 2
        }
        position_of_f = modified_substring.search(/ि/, position_of_f + 1) // search for ç ahead of the current position.
      } // end of while-02 loop
      //************************************************************
      //     modified_substring = modified_substring.replace( /fर्/g , "£"  )  ;
      //************************************************************
      // Eliminating "र्" and putting  reph (ü)  at proper position for this.

      const set_of_matras = 'ािीुूृेैोौं:ँॅ'

      modified_substring += '  ' // add two spaces after the string to avoid UNDEFINED char in the following code.

      let position_of_half_R = modified_substring.indexOf('र्')
      while (position_of_half_R > 0) {
        // while-04
        // "र्"  is two bytes long
        let probable_position_of_Z = position_of_half_R + 2

        let character_right_to_probable_position_of_Z = modified_substring.charAt(
          probable_position_of_Z + 1
        )

        // trying to find non-maatra position right to probable_position_of_Z .

        while (set_of_matras.indexOf(character_right_to_probable_position_of_Z) != -1) {
          probable_position_of_Z = probable_position_of_Z + 1
          character_right_to_probable_position_of_Z = modified_substring.charAt(
            probable_position_of_Z + 1
          )
        } // end of while-05

        const string_to_be_replaced = modified_substring.substr(
          position_of_half_R + 2,
          probable_position_of_Z - position_of_half_R - 1
        )
        modified_substring = modified_substring.replace(
          'र्' + string_to_be_replaced,
          string_to_be_replaced + 'ü'
        )
        position_of_half_R = modified_substring.indexOf('र्')
      } // end of while-04

      modified_substring = modified_substring.substr(0, modified_substring.length - 2)

      //substitute array_two elements in place of corresponding array_one elements

      for (let input_symbol_idx = 0; input_symbol_idx < array_one_length; input_symbol_idx++) {
        let idx = 0 // index of the symbol being searched for replacement

        while (idx != -1) {
          //whie-00
          modified_substring = modified_substring.replace(
            array_one[input_symbol_idx],
            array_two[input_symbol_idx]
          )
          idx = modified_substring.indexOf(array_one[input_symbol_idx])
        } // end of while-00 loop
      } // end of for loop
    } // end of IF  statement  meant to  supress processing of  blank  string.

    processed_text += modified_substring

    //****************************************************************************************
    //  Breaking part code over
    //****************************************************************************************
    //  processed_text = processed_text.replace( /mangal/g , "Chanakya" ) ;
  }
  return processed_text
} // end of Convert_Unicode_to_Chanakya function
