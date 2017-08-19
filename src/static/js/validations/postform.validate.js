
const required = value => value ? undefined : "Required";
const hasText = value => typeof value === "string" && value.trim() ? undefined : "This field is required";

const hasTextInBlock = (value, allValues, props) => {

  for(let i=0; i<value.length; i++){
    if(!(typeof value[i].text === "string") || !value[i].text.trim()){
      return "Empty paragraph(s) not allowed";
    }
  }

  if(value.length > 1){
    return "Currently only support one paragraph. Extra paragraphs need to be deleted before submission.";
  }

  console.log("OK");
  return undefined;
};

const dateTillNow = value => new Date(value) < new Date() ? undefined : "Must be a valid date till today";

export { required, hasText, hasTextInBlock, dateTillNow };

