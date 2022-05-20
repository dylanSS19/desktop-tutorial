
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* 


*/

//const ts = require('@tensorflow/tfjs-node-gpu');
const fs = require('fs');
const faceapi = require("face-api.js");
const canvas = require("canvas");
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });


let respuesta3='';
let respuesta1='';
let respuesta2='';

const comparar_fotos_post = async (req, res = response) => {

  const { url1, url2 } = req.body;

  if(!url1 || !url2) {
  
      res.json({
        error: true,
        codigo: 404,
        mensaje: 'Ingreso fotos antes de seguir con el proceso.'
    });

   }  else {

    try {
      if (fs.existsSync(url1) && fs.existsSync(url2)) {
      //file exists
        }else{

          res.json({
            error: true,
            codigo: 404,
            mensaje: 'Las rutas no son accesibles.'
          });
        return false;
        }
      } catch(err) {

        res.json({
          error: true,
          codigo: 404,
          mensaje: 'Las rutas no son accesibles.'
        });
        return false;
      // console.error(err)
      }

    await loadModels();

    const referenceImage = await canvas.loadImage(url1)
    const queryImage = await canvas.loadImage(url2)
  
    const resultsRef = await faceapi.detectAllFaces(referenceImage, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors()
  
    const resultsQuery = await faceapi.detectAllFaces(queryImage,  new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors()
  
    const faceMatcher = new faceapi.FaceMatcher(resultsRef)
  
    const labels = faceMatcher.labeledDescriptors
      .map(ld => ld.label)
      let label1 =
      respuesta1=labels;
    if(respuesta1 != "person 1"){

        res.json({
          error: true,
          codigo: 404,
          mensaje: 'No se pueden analizar fotos con mas de 2 rostros en la misma imagen.'
        });
    return false;
    }

      // let  {labels} = labels;
      // cantPerson = labels;
    const refDrawBoxes = resultsRef
      .map(res => res.detection.box)
      .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }))
    const outRef = faceapi.createCanvasFromMedia(referenceImage)
    refDrawBoxes.forEach(drawBox => drawBox.draw(outRef))
  
    //saveFile('referenceImage.jpg', (outRef as any).toBuffer('image/jpeg'))


    if(resultsQuery.length == 2){

      res.json({
        error: true,
        codigo: 404,
        mensaje: 'No se pueden analizar fotos con mas de 2 rostros en la misma imagen.'
      });
    return false;

    }

    const queryDrawBoxes = resultsQuery.map(res => {

      const bestMatch  = faceMatcher.findBestMatch(res.descriptor);
      //console.log("bestMatch", {bestMatch});
      let {_distance, _label} = bestMatch;
      respuesta2= _distance ;
      respuesta3= _label ;

      if(respuesta3 != "person 1"){

        res.json({
          error: true,
          codigo: 404,
          mensaje: 'No se pueden analizar fotos con mas de 2 rostros en la misma imagen.'
        });
    return false;
    }

      return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
    })
    const outQuery = faceapi.createCanvasFromMedia(queryImage)
    queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
  
    res.json({        
          "Compatibilidad": respuesta2      
      });
  
   }

}

async function loadModels() {
  return Promise.all([faceapi.nets.tinyFaceDetector.loadFromDisk('controllers/weights'), faceapi.nets.faceLandmark68Net.loadFromDisk(
          'controllers/weights'
      ),
      faceapi.nets.faceLandmark68TinyNet.loadFromDisk(
          'controllers/weights'
      ),
      faceapi.nets.faceRecognitionNet.loadFromDisk(
          'controllers/weights'
      ),
      faceapi.nets.ssdMobilenetv1.loadFromDisk('controllers/weights')
  ]);
}

module.exports = {
  comparar_fotos_post,
}