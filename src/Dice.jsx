import React from "react";


const SingleDice = ({isHeld, holdDice, value}) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  }
  return (
    <div>
      <h2 style={styles}
          onClick={holdDice}
      >{value}</h2>
    </div>
  )
}
export default SingleDice;
