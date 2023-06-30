const permittedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/pjpeg',
    'image/gif',
    'image/png',
    'image/webp',
    'video/3gp',
    'video/mp4',
    'video/avi',
    'video/mpg',
    'video/mpeg',
    'video/webm',
    'audio/ogg',
    'audio/mp3',
    'audio/mpeg',
    'audio/wav',
    'application/pdf',
    'application/xlxs',
    'application/doc',
    'application/docx',
    'application/xls',
    'application/pub',
    'application/csv'
];
const notTrusted = ['bin', 'cgi', 'exe', 'js', 'py', 'pl', 'php', 'sh', "ts"];
const multerFilter = (req, file, callback) => {
    const regex = new RegExp('[^.]+$');
    if (permittedTypes.includes(file.mimetype) && !notTrusted.includes(file.originalname.match(regex))) {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
export default multerFilter;
