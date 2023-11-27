import React, { forwardRef } from "react";

const InputField = forwardRef(({ parentClass, ...props }, ref) => {
  return (
    <div className={`${parentClass}`}>
      <label htmlFor={props.name} className={`${props.styles}`}>
        {props.label}
      </label>
      <div>
        <input
          ref={ref}
          type={props.type}
          className={`${props.className}`}
          value={props.value}
          onChange={props.onChange}
          {...props}
        />
        {props.error && (
          <p className=" text-red-400" id={`${props.name}`}>
            {props.error?.message.split(",")[0]}
          </p>
        )}
      </div>
    </div>
  );
});

export default InputField;
