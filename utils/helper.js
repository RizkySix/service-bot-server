import { allowedMainDomain } from "./allowed-domain.js";

class Utils {
  tempMsgInstagram = `Temukan cara baru untuk memperluas jangkauan bisnis Anda! 
      
      Dengan platform Resellr.id, Anda bisa mengakses kekuatan CaaS (Commerce-as-a-Service) kami dalam hitungan detik, mengubah pendekatan bisnis Anda dalam waktu singkat, hanya dalam 30 detik. 🚀 
      Kami memperkenalkan konsep baru di Resellr.id: mengubah pelanggan menjadi Brand Ambassador yang aktif dan berperan sebagai penjual. Dalam 14 hari, Anda akan menyaksikan bagaimana transformasi ini mempengaruhi perubahan signifikan dalam lanskap bisnis Anda. 
      
      🌟Inilah waktunya untuk bergabung dengan revolusi bisnis! Daftarkan diri Anda di https://resellr.id/ sekarang juga untuk merasakan perubahan yang luar biasa dalam bisnis Anda sendiri 🌐`;

  encryptObject = (obj) => {
    const encryptedObj = {};
    for (let prop in obj) {
      encryptedObj[btoa(prop)] = btoa(obj[prop]);
    }
    return encryptedObj;
  };

  emojiToUnicode(input) {
    return Array.from(input)
      .map((char) => char.codePointAt(0).toString(16))
      .join(" ");
  }


  /**
   * memcari string dengan format url https
   * @param {*} text 
   * @returns 
   */
  extractURLs(text) {
    //poola regex untuk menemukan URL dalam teks
    const urlPattern = /(https?:\/\/\S+)/gi;
    //menggunakan ekspresi regx untuk menemukan URL dalam teks dan mengembalikan daftar URL yang cocok
    return text.match(urlPattern) || [];
  }

  /**
   * Fungsi untuk memeriksa apakah sebuah URL adalah bagian dari domain murni ex resellr.id
   * @param {*} url 
   * @param {*} domain 
   * @returns 
   */
  isValidURL(url, domain) {
    let status = false;

    domain.forEach((dom) => {
      //pola regx untuk memeriksa apakah URL adalah bagian dari domain yang ditentukan
      const domainPattern = new RegExp(
        "^(https?://)?([\\w\\d]+\\.)?" + dom.replace(/\./g, "\\.") + "/\\S*",
        "i"
      );

      // Menggunakan metode test() untuk memeriksa apakah URL cocok dengan pola reguler
      status = domainPattern.test(url);
    });

    return status;
  }

  /**
   * validasi domain
   */
  domainValidation = (comment) => {

    let getDomain = [];

    //Ekstrak URL dari teks
    const urls = this.extractURLs(comment);

   if(urls.length == 0 ){
      return false
   }

    urls.forEach(url => {
      Object.values(allowedMainDomain).forEach(dom => {
        if (url.indexOf(dom) !== -1) {
          getDomain.push(dom);
          return;
        }
      });
    });

    // Memeriksa yang valid dengan continous loop urls
    let status = false;

    urls.forEach(url => {
      if (this.isValidURL(url, getDomain)) {
        status = true;
      } else {
        status = false;
      }
    });

    return status
  };


  /**
   * Validasi comments dalam array
   * @param {*} comments 
   * @returns 
   */
  bundleDomainValidation = (comments) => {
    let status = true
   
    comments.forEach(comment => {
      if(!this.domainValidation(comment)){
        status = false
        return
      }
      
    })
    
    return status
    
  };


}


export { Utils };
