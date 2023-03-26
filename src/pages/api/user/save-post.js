import { graphCmsReadAndWrite } from "graphql/graphCmsClient";
import { SAVE_POST_TO_USERSCHEMA } from "graphql/queries";

const handler = async (req, res) => {
    const { postSlug } = req.body;
    try {
        const result = await graphCmsReadAndWrite.request(SAVE_POST_TO_USERSCHEMA, { email: "rk@rk.rk", postSlug: postSlug });
        console.log(result);
        return res.status(200).json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}

export default handler;