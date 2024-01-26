
import { allowedDomain } from "../utils/allowed-domain.js"
import { Utils } from "../utils/helper.js"

class Controller 
{
    #utils = new Utils()

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

      /**
       * Throw status domain from extension
       * @param {*} req 
       * @param {*} res 
       */
      checkDomain = (req, res) => {
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
        const { item } = req.query; 
        
        if(item && item != "null"){
          const response = JSON.parse(item);
      
        const responseValues = Object.values(response);
        const ourDomValues = Object.values(this.#utils.encryptObject(allowedDomain));
      
        const isMatch = responseValues.every(value => ourDomValues.includes(value));
      
        res.send(isMatch);
      
        }else{
          res.send(false)
        }
      
      }


      /**
       * Throw valid comments
       * @param {*} req 
       * @param {*} res 
       * @returns 
       */
      checkComments = (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
        let { item } = req.query
      
        item = JSON.parse(item)

        // check type string
        if(typeof item === 'string'){
         
              if(!item || item == "null" || item.length > 150 ){
                res.send(false)
            }
            
            let isGood = false
            for (const key in allowedDomain) {
              if (item.indexOf(allowedDomain[key]) !== -1) {
                isGood = true
                break
              }
            }

            if(isGood){
              res.send(true)
            }
            
            res.send(false)
        }
      
        
        // check type object
        if(typeof item === 'object'){
         
          const responseValues = Object.values(Object.assign({}, item.comments));
          
          for (const resProp in responseValues) {
            let isMatched = false; // Tambahkan variabel untuk menandai apakah ada kecocokan pada resProp tertentu
            for (const domProp in allowedDomain) {
              if (responseValues[resProp].indexOf(allowedDomain[domProp]) !== -1) {
                isMatched = true;
                break;
              }
            }
          
            if (!isMatched) {
              res.send(false);
              return;
            }
          }
         
          res.send(true)
      
         
        }
      }

}

export { Controller }
