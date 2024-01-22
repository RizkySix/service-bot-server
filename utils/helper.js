class Utils {

      tempMsgInstagram = `Temukan cara baru untuk memperluas jangkauan bisnis Anda! 
      
      Dengan platform Resellr.id, Anda bisa mengakses kekuatan CaaS (Commerce-as-a-Service) kami dalam hitungan detik, mengubah pendekatan bisnis Anda dalam waktu singkat, hanya dalam 30 detik. 🚀 
      Kami memperkenalkan konsep baru di Resellr.id: mengubah pelanggan menjadi Brand Ambassador yang aktif dan berperan sebagai penjual. Dalam 14 hari, Anda akan menyaksikan bagaimana transformasi ini mempengaruhi perubahan signifikan dalam lanskap bisnis Anda. 
      
      🌟Inilah waktunya untuk bergabung dengan revolusi bisnis! Daftarkan diri Anda di https://resellr.id/ sekarang juga untuk merasakan perubahan yang luar biasa dalam bisnis Anda sendiri 🌐`

       encryptObject = (obj) => {
        const encryptedObj = {};
        for (let prop in obj) {
          encryptedObj[btoa(prop)] = btoa(obj[prop])
        }
        return encryptedObj;
    }

     emojiToUnicode(input) {
      return Array.from(input).map(char => char.codePointAt(0).toString(16)).join(" ");
    }
}

export { Utils }