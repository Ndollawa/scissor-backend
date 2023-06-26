const WORDS_PER_MIN = 275;//wmp
const IMAGE_READ_TIME = 12;// in seconds
const CHINESE_KOREAN_READ_TIME =  500; //cpm
const IMAGE_TAGS = ['img','Image'];

const stripWhitespaces = (string)=>{
    return  string.replace(/^\s+/, '').replace(/\s+$/, '');

}
const imageCount = (imageTypes, string)=>{
    const combinedImageTags = imageTags.join('|');
    const pattern =`<(${combinedImageTags})([\\w\\w]+?)[\\/]?>`;
    const reg = new RegExp(pattern,'g');
    return (string.match(reg) || []).length;
}

const imageReadTime = (customImageTime = IMAGE_READ_TIME,tags = IMAGE_TAGS, string)=>{
    let seconds = 0;
    const count = imageCount(tags,string);
   seconds = count >10 ? ((count/2)*(customImageTime+3)) + (count -10)*3 : (count/2)*(2* customImageTime+  (1 - count))
    return {
        time:seconds/ 60,
        count,
    }
}

const stripTags = (string)=>{
    const pattern =`<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>`;
    const reg = new RegExp(pattern,'gi');
    return string.replace(reg, '');
}

const wordsCount = (string)=>{
    const pattern =`\\w+`;
    const reg = new RegExp(pattern,'g');
    return (string.match(reg) || []).length;
}

const otherLanguageReadTime = (string){
    const pattern ='[\u3040-\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]';
    const reg = new RegExp(pattern,'g');
    const count = (string.match(reg) || []).length;
    const time = count/CHINESE_KOREAN_READ_TIME;
    const formattedString = string.replace(reg, '');
    return{
        count,
        time,
        formattedString
    }
}


const wordsReadTime = (string,wordsPerMin = WORDS_PER_MIN)=>{
    const {
        count:characterCount,
        time: otherLanguageReadTime,
        formattedString
    } = otherLanguageReadTime(string);
    const wordCount = wordsCount(formattedString);
    const wordTime = wordCount/wordsPerMin;
    return{
        characterCount,
        otherLanguageReadTime,
        wordTime,
        wordCount
    }
}

const humanizeTime = (time)=>{
    if(time<0.5){
return "less than a minu"
    }
}