 
import {GoogleGenAI,Type} from "@google/genai";
const ai=new GoogleGenAI({ apiKey: "YOUR_API_KEY"});
const sum={
    name:"sum_numbers",
    description:" calculate the sum of the two numbers  " ,
     
    parameters:{
        type:Type.OBJECT,
        properties:{
        a:{type:Type.NUMBER,
            description:"the first number"},
            b: {
                type:Type.NUMBER,
                description: "the second number"
            },
        },
        required:['a','b']
    },
} ;
function sumNumbers({a,b})
{
    return a+b;
}
const response=await ai.models.generateContent({
     model: "gemini-3-flash-preview",
    contents:"2 and 3 ki sum entha?",
    config:{
        tools:[
        {functionDeclarations:[sum],}]
    },
})
if(response.functionCalls&&response.functionCalls.length>0)
{
    const call=response.functionCalls[0];
    if(call.name=="sum_numbers")
        {
            const result=sumNumbers(call.args );
            console.log(`The sum is ${result}`); 
        } 
}
else
{
    console.log(response.text);
}