import React from "react";

const IfElse: React.FC<IfElseProps> = ({ c, children }) => {
  const childrenArray = React.Children.toArray(children);

  // Handle invalid child counts
  if (childrenArray.length < 1 || childrenArray.length > 2) {
    console.error('<IfElse> requires 1 or 2 children');
    return null;
  }

  // Single child: render only if condition is true
  if (childrenArray.length === 1) {
    return c ? <>{childrenArray[0]}</> : null;
  }

  // Standard if/else with exactly 2 children
  return <>{c ? childrenArray[0] : childrenArray[1]}</>;
};

interface IfElseProps {
  c: boolean;
  children: React.ReactNode;
}

export default IfElse;