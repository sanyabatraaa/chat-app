export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSenderMargin=(messages,m,i,userId)=>{
  //curr messages sender is equal to next messages sender
  //messsage sender is not the curr user
  if(i<messages.length-1 && 
    messages[i+1].sender._id===m.sender._id &&
    messages[i].sender._id !== userId
  ) return 33;
  //curr messages sender is not equal to next message sender and message sender is not the logged in user
  // or curr message sender is not the logged in user
  else if((i<messages.length-1 && 
    messages[i+1].sender._id !== m.sender._id &&
    messages[i].sender._id !==userId) ||
    (i===messages.length-1 && messages[i].sender._id !==userId)
  ) return 0;
  else return "auto";
}

export const isSameSender=(messages,m,i,userId)=>{
  return(
    //next message sender is not equal to curr message sender 
    // or next message sneder is undefined and curr message sender is not the logged in user
    i<messages.length-1 && (messages[i+1].sender._id !== m.sender._id || 
      messages[i+1].sender._id === undefined) && messages[i].sender._id !==userId
    );
  
};

export const isLastMessage=(messages,i,userId)=>{
  return(
    i===messages.length-1 &&
    messages[messages.length-1].sender._id !==userId &&
    messages[messages.length-1].sender._id
  )
}

export const isSameUser=(messages,m,i)=>{
  return i>0 && messages[i-1].sender._id === m.sender._id;
}



