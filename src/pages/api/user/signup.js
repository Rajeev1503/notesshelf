import { graphCmsReadAndWrite } from "graphql/graphCmsClient";
import { CREATE_USER } from "graphql/queries";
import bcrypt from 'bcrypt'
const handler = async (req, res) => {
    const {fullname, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await graphCmsReadAndWrite.request(CREATE_USER, {fullName:fullname, email:email, password:hashedPassword});
        return res.status(200).send(result);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
}

export default handler;