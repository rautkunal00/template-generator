var line=false; 
var english_code = `
<def>

  <text ref=Qn></text>

`
function getENGLISHCode() {
    for(let j=0; j<englishFileTexts.length; j++) {
            var str=englishFileTexts[j].split("\n");
            line=false;
            for(let k=0; k<str.length; k++) {
                if(str[k]!="" && str[k].includes("</p>"))
                {
                    line=true;
                    var mySubString = str[k].substring(
                        str[k].lastIndexOf("%") + 1, 
                        str[k].lastIndexOf(";")
                    );
                    english_code+=`  <text ref=${mySubString}></text>           
`
                }
    }
    english_code+= (line) ? `
` : ``;
}
    english_code+= `</def>
`
return english_code;
}