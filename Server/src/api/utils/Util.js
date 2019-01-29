const fs = require('fs');
const multer = require('multer');

const PUBLIC_DIR = './public';
const ROOT_UPLOAD_DIR = PUBLIC_DIR + '/uploads';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Class is a blue print for creating a new object of this specified data type.
 */
class Util {

  /**
   * 
   * @param {Object} fs This is a NodeJS dependency which provides file system functionalities
   * @param {Object} multer This is a NodeJS dependency which supports multipart request
   */
  constructor(fs, multer) {
    // This is one of data members of a class which is used to allocate memmories for all object attributes

    this.fs = fs;
    this.multer = multer;
  }

  /**
   * This is one of data members of a class which define how an objec of this data type will act
   * This method is used to recursively create folders by a given paths.
   * 
   * @param {String} targetDir given path to create folders recursively. Separated by a slash
   * 
   * @returns {String} A pull path from ROOT_UPLOAD_DIR added to given path
   */
  mkDirByPathSync(targetDir) {
    let dir = this._removeBeginningSlash(targetDir);

    return dir.split('/').reduce((parentDir, childDir) => {
      let currentDir = parentDir + '/' + childDir;
      let fs = this.fs;
      console.log('mkDirByPathSync: ', currentDir);
  
      try {
        fs.mkdirSync(currentDir);
      } catch (err) {
        if (err.code === 'EEXIST') { // curDir already exists!
          return currentDir;
        }
  
        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
        if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
          throw new Error(`ENOENT: mkdir '${parentDir}'`);
        }
  
        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
        if (!caughtErr || caughtErr && targetDir === curDir) {
          throw err; // Throw if it's just the last created dir.
        }
      }
  
      return currentDir;
    }, ROOT_UPLOAD_DIR);
  }

  /**
   * Return full path of an uploaded file using NodeJS Multer dependency
   * @param {Object} file This is the file object of NodeJS Multer dependency. Default passed in param to an empty object
   * 
   * @returns {String} NodeJS Multer Uploaded file path
   */
  getMulterUploadedFileUrl(file = {destination: '', originalname: ''}) {
    let url = [
      this.getMultiFilePath(file),
      this.getMultiFileName(file)
    ].join('/');

    if (url.indexOf('/') !== 0) {
      url = '/' + url;
    }
    console.log('getMulterUploadedFileUrl', url, file.filename)
    return url;
  }

  getMulterUploadedFileUrls(files = []) {
    return files.map(file => {
      let url = this.getMulterUploadedFileUrl(file);
      return url.replace('/multi', '');
    });
  }

  /**
   * Return a destination path of a given NodeJS Multer file object which can be used in UI
   * @param {Object} file This is the file object of NodeJS Multer dependency. Default passed in param to an object containing empty destination
   * 
   * @returns {String}
   */
  getMultiFilePath(file = {destination: ''}) {
    return (file.destination || '').replace(PUBLIC_DIR, '');
  }

  /**
   * Return the file name of a given NodeJS Multer file object. Default passed in param to an object containing an empty filename
   * @param {String} file
   * 
   * @returns {String}
   */
  getMultiFileName(file = {filename: ''}) {
    return file.filename || '';
  }

  /**
   * Remove the first slash of a given path. Default passed in param to an empty string
   * @param {String} path 
   * 
   * @returns {String}
   */
  _removeBeginningSlash(path = '') {
    if (path.indexOf('/') === 0) {
      return path.replace('/', '');
    } else {
      return path;
    }
  }

  getDirNameByDate(d = new Date()) {
    let date = d.getDate();
    let month = MONTHS[d.getMonth()];
    let year = d.getFullYear();

    return [date, month, year].join('_');
  }

  resolveUploadedPath(cb, req = {path: '/tmp'}, d = new Date()) {
    if (cb) {
      let path = (req.path === '/' ? '' : req.path) + '/' + this.getDirNameByDate();
      path = path.replace('/multi', '')
      cb(null, this.mkDirByPathSync(path));
    }
  }

  resolveUploadedFileName(cb, file = {originalname: 'tmp_file_' + (new Date()).getTime()}) {
    if (cb) {
      cb(null,  (new Date()).getMilliseconds() + '_' + file.originalname);
    }
  }
}

/**
 * Because of a class cannot be hoisted then class definition must be declared before use
 */
module.exports = new Util(fs, multer);
