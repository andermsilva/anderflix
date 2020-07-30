import React from 'react'

function ButtonLink(props){
    //pops => {className}
    return(
      <a href={props.href} className={props.className}>
          {props.children}
      </a>
        
   
    );
   
   }
   export default ButtonLink

   