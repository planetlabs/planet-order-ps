/**
Copyright 2015 Planet Labs, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var log = function(msg) {
    $.write(msg);
    $.write("\n");
}

/**
 * This function loads a photoshop curve file into an array of curves
 * Each element in the array is a set of points in a curve,
 * where each element is in array in the form [inputValue, outputValue]
 * @return {Array} an array as described above, or false.
 */
function loadCurves() {
    var file = File.openDialog('Select a curve file', '*.acv');
    if (!file) {
      return false;
    }
    file.encoding = "BINARY";
    file.open('r');
    var content = [];
    var b = 0;
    while (!file.eof) {
        b = parseInt(file.read(2).charCodeAt(1))
        content.push(b);
        log(b);
    }

    var version = content[0];
    if (version !== 4) {
      return false;
    }
    var numberOfCurves = content[1];

    var pos = 1;
    var curves = [];

    for (var i = 0; i < numberOfCurves; i ++) {
        pos ++;
        if (pos > content.length) return false;
        var numPoints = content[pos];
        curves[i] = [];
        for (var j = 0; j < numPoints * 2; j+=2) {
            pos += 2;
            curves[i].push([content[pos], content[pos - 1]]);
        }
    }
    return curves;
}

/**
 * Applies a curve to a layer
 * @param  {Array} curves a curves array loaded by loadCurves
 * @param  {ArtLayer} layer  the layer which we want to apply the curves to
 */
function applyCurves(curves, layer) {
    app.activeDocument.activeLayer = app.activeDocument.artLayers[0];

    var allChannels = [];
    for (var i = 0; i < app.activeDocument.channels.length; i ++) {
        allChannels.push(app.activeDocument.channels[i]);
    }

    // rgb
    var channels =  app.activeDocument.channels;
    var activeChannels = app.activeDocument.activeChannels;
    for (var i = 0; i < channels.length; i ++) {
        log(channels[i].name);
        app.activeDocument.activeChannels = [channels[i]];
        layer.adjustCurves(curves[i + 1]);
    }

    //Apply the first curve to all
    app.activeDocument.activeChannels = allChannels;
    layer.adjustCurves(curves[0]);
}

//json2.js
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?i+"":"null";case"boolean":case"null":return i+"";case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;u>r;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;u>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b"," ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text+="",rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

/**
 * Main Script
 */
function main() {
  var myFolder = Folder.selectDialog ("Select a folder");

  if (!myFolder) {
    return;
  }

  var inputFiles = myFolder.getFiles();

  var sceneFolders = [];

  for (var i = 0; i < inputFiles.length; i ++) {
      var f = inputFiles[i];
      if (f instanceof Folder) {
          sceneFolders.push(f);
      }
  }

  var scenes = [];

  //find doc size and origin
  var docTopLeft = {x: null, y : null};
  var docBottomRight = {x: null, y: null};
  var hasAnalytic = false;

  //walk subfolders
  for (var i = 0; i < sceneFolders.length; i ++) {
    var folder = sceneFolders[i];

    metadataFile = new File(folder.getFiles('*metadata.json'));
    metadataFile.open("r");
    var metadata = JSON.parse(metadataFile.read());
    metadataFile.close();

    geoinfoFile = new File(folder.getFiles('*geoinfo.json'));
    geoinfoFile.open("r");
    metadata.geoInfo = JSON.parse(geoinfoFile.read());;
    geoinfoFile.close();

    var files = folder.getFiles('*.tif');
    var file = null;
    if (files.length > 1) {
      for (var n = 0; n < files.length; n ++) {
        var fileType = files[n].displayName.split('.')[0].split('_').pop();
        if (fileType === 'analytic') {
          file  = files[n];
          log('Found analytic file, using it');
          break;
        } else if (fileType === 'visual') {
          log('Found visual file, still looking for analytic');
          file = files[n];
        }
      }
      if (!file) {
        alert('There is no suitable file for scene ' + metadata.id + '. There needs to be either a visual or an analytic file for this script to work. ');
        return;
      }
    } else {
      file = files[0];
    }

    metadata.sceneFile = file;

    metadata.type = file.displayName.split('.')[0].split('_').pop();
    if (metadata.type === 'analytic') {
      hasAnalytic = true;
    }

    var topLeft = {
      x: metadata.geoInfo.bbox[0] / metadata.geoInfo.pixel_size,
      y: -metadata.geoInfo.bbox[3] / metadata.geoInfo.pixel_size
    };

    var bottomRight = {
      x: metadata.geoInfo.bbox[2] / metadata.geoInfo.pixel_size,
      y: -metadata.geoInfo.bbox[1] / metadata.geoInfo.pixel_size
    };

    log('Top left: ' + topLeft.x + ' ' + topLeft.y);
    log('BTM right: ' + bottomRight.x + ' ' + bottomRight.y);

    if (!docTopLeft.x || topLeft.x < docTopLeft.x) docTopLeft.x = topLeft.x;
    if (!docBottomRight.x || bottomRight.x > docBottomRight.x) docBottomRight.x = bottomRight.x;
    if (!docTopLeft.y || topLeft.y < docTopLeft.y) docTopLeft.y = topLeft.y;
    if (!docBottomRight.y || bottomRight.y > docBottomRight.y) docBottomRight.y = bottomRight.y;

    metadata.boundingBox = {
      topLeft: topLeft,
      bottomRight: bottomRight
    }

    scenes.push(metadata);
  }

  var curves = false;
  if (hasAnalytic) {
    if (confirm('Your order includes analytic scenes. Would you like to apply a curve profile?', false, 'Apply curves?')) {
      curves = loadCurves();
    }
  }

  var docOrigin = docTopLeft;
  var docWidth = docBottomRight.x - docOrigin.x;
  var docHeight = Math.abs(docBottomRight.y - docOrigin.y);

  log('Doc origin: ' + docOrigin.x + ',' + docOrigin.y);
  log('Doc bottomRight: ' + docBottomRight.x  + ',' + docBottomRight.y);
  log('Doc Size: ' + docWidth + ' x ' + docHeight);

  var doc = app.documents.add(docWidth, docHeight, 72, myFolder.displayName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1, BitsPerChannelType.SIXTEEN);

  for (var i = 0; i < scenes.length; i ++) {

    var scene = scenes[i];
    log();
    log('Placing: ' +  scene.id );
    var sceneDoc = open(scene.sceneFile);

    //Adjust levels if analytic
    if (scene.type === 'analytic') {
      sceneDoc.artLayers[0].adjustLevels(0, 16, 1, 0, 255);
      if (curves) {
        applyCurves(curves, sceneDoc.artLayers[0] );
      }
    }

    //place layer
    var pos = scene.boundingBox.topLeft;
    log("Scene P0S: " + pos.x + ' x ' + pos.y);

    var bottomRight = scene.boundingBox.bottomRight;
    var expectedWidth = Math.abs(pos.x - bottomRight.x);
    var expectedHeight = Math.abs(pos.y - bottomRight.y);

    sceneDoc.resizeImage(expectedWidth, expectedHeight);
    var layer = sceneDoc.artLayers[0].duplicate(doc);
    app.activeDocument = doc;
    layer.name = scene.id;

    log('Expected size: ' + expectedWidth + ' X ' + expectedHeight );

    var topX = pos.x - docOrigin.x ;
    var topY = pos.y - docOrigin.y;

    log("Pos in doc: " + topX + ' x ' + topY);

    layer.translate(topX, topY);

    log('Layer Bounds: ' + layer.bounds[0] + ',' + layer.bounds[1] + ' - ' + layer.bounds[2] + ',' + layer.bounds[3]);
    sceneDoc.close(SaveOptions.DONOTSAVECHANGES);
  }

  //Remove the first empty layer
  doc.artLayers[doc.artLayers.length - 1].remove();
}

main();
