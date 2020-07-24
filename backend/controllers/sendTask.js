const task = require('../models/task');
var ObjectID = require('mongodb').ObjectID;


const sendTask = async (req, res) => {
  try {
    
    let { title, content, creatorId } = req.body;
    title
    

  } catch (error) {
      res.status(500).json({
          message:
          'Ha ocurrido un error al registrarse, por favor intentelo más tarde'
    });
    console.log(`Ha ocurrido un error ${err}`);
}
};
module.exports = sendPost;

    
    if (title !== null && title !== undefined) {
      Object.assign(postSaved, { title });
    } else {
      return res.status(400).json({
        message: 'El titulo del post es requerido'
      });
    }
    if (content !== null && content !== undefined) {
      Object.assign(postSaved, { content });
    } else {
      return res.status(400).json({
        message: 'El contenido del post es requerido'
      });
    }
    let newPost;
    if (postSaved.img) {
      newPost = new post({
        creator: postSaved.creatorId,
        img: postSaved.img,
        content: postSaved.content,
        title: postSaved.title
      });
      await newPost.save();
    } else {
      newPost = new post({
        creator: postSaved.creatorId,
        content: postSaved.content,
        title: postSaved.title
      });
      await newPost.save();
    }
    return res.status(200).json({
      message: 'Post exitoso'
