import { allowedDomain } from "../utils/allowed-domain.js";
import { Utils } from "../utils/helper.js";

class Controller {
  #utils = new Utils();

  /**
   * throw encryped domain
   * @param {*} req
   * @param {*} res
   */
  encryptedDomain = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.send(this.#utils.encryptObject(allowedDomain));
  };

  /**
   * Throw status domain from extension
   * @param {*} req
   * @param {*} res
   */
  checkDomain = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const { item } = req.query;

    if (item && item != "null") {
      const response = JSON.parse(item);

      const responseValues = Object.values(response);
      const ourDomValues = Object.values(
        this.#utils.encryptObject(allowedDomain)
      );

      const isMatch = responseValues.every((value) =>
        ourDomValues.includes(value)
      );

      res.send(isMatch);
    } else {
      res.send(false);
    }
  };

  /**
   * Throw valid comments
   * @param {*} req
   * @param {*} res
   * @returns
   */
  checkComments = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    let { item } = req.query;

    item = JSON.parse(item);

    // check type string
    if (typeof item === "string") {
      if (!item || item == "null" || item.length > 150) {
        res.send(false);
      }

      const isGood = this.#utils.domainValidation(item)

      res.send(isGood)
    }

    // check type object
    if (typeof item === "object") {
    
      const responseValues = Object.values(Object.assign({}, item.comments));
     
      const allGood = this.#utils.bundleDomainValidation(responseValues)

      res.send(allGood)
    }
  };
}

export { Controller };

