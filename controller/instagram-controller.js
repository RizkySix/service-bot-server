import { allowedDomain } from "../utils/allowed-domain.js"
import { Utils } from "../utils/helper.js"

class Controller
{
    #utils = new Utils()

    /**
     * Check is dm messages array all valid
     * @param {*} req 
     * @param {*} res 
     */
    checkDmMessages = (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
        const item = JSON.parse(req.query.item)
        
        const responseValues = Object.values(Object.assign({}, item));
        const newValidDm = [] 
        let validDm = false
          
        for(let prop in responseValues){
        
          validDm = this.#utils.domainValidation(responseValues[prop])
      
          if(validDm){
              newValidDm.push(btoa(this.#utils.emojiToUnicode(responseValues[prop])));
          }
        }
      
        if(newValidDm.length < 1){
            newValidDm.push(btoa(this.#utils.emojiToUnicode(this.#utils.tempMsgInstagram)))
        }
      
        res.send(newValidDm)
    }



    /**
     * throw encryped domain
     * @param {*} req 
     * @param {*} res 
     */
    encryptedDomain = (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
        res.send(this.#utils.encryptObject(allowedDomain))
      }
}

export { Controller }